"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import * as echarts from "echarts";
import "echarts-gl";
import ReactECharts from "echarts-for-react";
import {
  countryRiskData,
  mapMetrics,
  type MapMetric,
  type CountryRiskPoint,
} from "@/lib/gar-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe2, BarChart3, Layers, Info, TrendingUp } from "lucide-react";

interface Props {
  height?: number;
}

export function WorldRiskMap({ height = 680 }: Props) {
  const chartRef = useRef<ReactECharts>(null);
  const [activeMetric, setActiveMetric] = useState<MapMetric>("directLosses");
  const [showBars, setShowBars] = useState(true);
  const [groupFilter, setGroupFilter] = useState<string | "all">("all");
  const [geoLoaded, setGeoLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [chartReady, setChartReady] = useState(false);

  // Register world map GeoJSON once on mount
  useEffect(() => {
    let cancelled = false;
    async function loadMap() {
      try {
        const res = await fetch("/geo/world.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const geo = await res.json();
        if (cancelled) return;
        echarts.registerMap("world", geo);
        setGeoLoaded(true);
        setLoadError(null);
      } catch (e) {
        console.error("Failed to load world map:", e);
        setLoadError(e instanceof Error ? e.message : "Unknown error");
      }
    }
    loadMap();
    return () => {
      cancelled = true;
    };
  }, []);

  // Mark chart instance as ready when ref becomes available
  useEffect(() => {
    if (chartRef.current && geoLoaded) {
      setChartReady(true);
    }
  }, [geoLoaded]);

  // Filter countries by group
  const filteredCountries = useMemo(() => {
    if (groupFilter === "all") return countryRiskData;
    return countryRiskData.filter((c) => c.group === groupFilter);
  }, [groupFilter]);

  // Build chart option
  const option = useMemo(() => {
    const metric = mapMetrics.find((m) => m.id === activeMetric)!;

    // Build bar3D data: [lng, lat, value, ...]
    const barData = filteredCountries
      .map((c) => {
        const value = (c as unknown as Record<MapMetric, number>)[activeMetric];
        return {
          name: c.name,
          value: [c.coords[0], c.coords[1], value],
          itemStyle: {
            color: getColorForValue(value, metric.colorStops),
          },
        };
      })
      .filter((d) => d.value[2] !== undefined && d.value[2] !== null);

    // Sort so tallest bars render last (drawn on top)
    barData.sort((a, b) => a.value[2] - b.value[2]);

    // Scale bars appropriately per metric
    const allValues = barData.map((d) => d.value[2]);
    const maxVal = Math.max(...allValues, 1);
    const minVal = Math.min(...allValues, 0);

    // Bar height multiplier — normalize so tallest bar ~30 units on the geo3D
    const barHeightScale = 30 / (maxVal - minVal || 1);

    const series: echarts.SeriesOption[] = [];

    // Bar3D series — 3D bars rising from map
    if (showBars) {
      series.push({
        type: "bar3D",
        coordinateSystem: "geo3D",
        shading: "realistic",
        realisticMaterial: {
          roughness: 0.4,
          metalness: 0.1,
        },
        data: barData.map((d) => ({
          name: d.name,
          value: [
            d.value[0],
            d.value[1],
            (d.value[2] - minVal) * barHeightScale + 2,
          ],
          itemStyle: d.itemStyle,
        })),
        // Sizes of bars (in geo3D units)
        barSize: 1.8,
        bevelSize: 0.2,
        bevelSmoothness: 4,
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            formatter: (p: { name: string; value: number[] }) => {
              const origValue = (p.value[2] - 2) / barHeightScale + minVal;
              return `${p.name}\n${metric.shortLabel}: ${formatValue(origValue, metric.unit)}`;
            },
            color: "#fff",
            backgroundColor: "#1f2937",
            padding: [4, 8],
            borderRadius: 4,
            fontSize: 11,
            fontWeight: "bold",
          },
          itemStyle: {
            color: "#fbbf24",
          },
        },
      } as echarts.SeriesOption);
    }

    // Scatter for country markers (always shown, even when bars off)
    series.push({
      type: "scatter3D",
      coordinateSystem: "geo3D",
      symbol: "circle",
      symbolSize: 6,
      data: barData.map((d) => ({
        name: d.name,
        value: [d.value[0], d.value[1], 0.5],
        itemStyle: {
          color: d.itemStyle.color,
          opacity: 0.9,
          borderColor: "#fff",
          borderWidth: 0.5,
        },
      })),
      label: {
        show: false,
      },
      emphasis: {
        label: {
          show: true,
          position: "top",
          formatter: (p: { name: string; value: number[] }) => {
            const origValue = (p.value[2]);
            return `${p.name}: ${formatValue(origValue, metric.unit)}`;
          },
          color: "#fff",
          backgroundColor: "#1f2937",
          padding: [3, 6],
          borderRadius: 3,
          fontSize: 10,
        },
      },
    } as echarts.SeriesOption);

    return {
      backgroundColor: "transparent",
      tooltip: {
        show: true,
        formatter: (p: { name: string; value: number[] }) => {
          const country = filteredCountries.find((c) => c.name === p.name);
          if (!country) return p.name;
          const val = (country as unknown as Record<MapMetric, number>)[activeMetric];
          return `
            <div style="font-weight:600;margin-bottom:4px">${country.name}</div>
            <div style="font-size:11px;color:#666">${country.region} · ${country.group}</div>
            <div style="margin-top:6px;font-size:12px">
              <strong style="color:${getColorForValue(val, metric.colorStops)}">${formatValue(val, metric.unit)}</strong> ${metric.shortLabel}
            </div>
            <div style="margin-top:4px;font-size:10px;color:#888">
              Direct losses: $${country.directLosses}B/yr<br/>
              % of GDP: ${country.pctGDP}%<br/>
              Mortality: ${country.mortality}/100k<br/>
              MHEWS: ${country.mhews}%<br/>
              Flood Δ 2050: ${country.floodFuture > 0 ? "+" : ""}${country.floodFuture}%
            </div>
            ${country.notes ? `<div style="margin-top:4px;font-size:10px;font-style:italic;color:#888">${country.notes}</div>` : ""}
          `;
        },
      },
      geo3D: {
        map: "world",
        roam: true,
        // Set viewing angle for a 3D perspective
        viewControl: {
          center: [0, 0, 0],
          alpha: 45,
          beta: 0,
          distance: 110,
          panMouseButton: "left",
          rotateMouseButton: "right",
          autoRotate: false,
          autoRotateAfterStill: 6,
          autoRotateSpeed: 4,
        },
        // Lighting
        light: {
          main: {
            intensity: 1.4,
            shadow: true,
            alpha: 40,
            beta: 30,
          },
          ambient: {
            intensity: 0.6,
          },
        },
        // Post processing for realistic rendering
        postEffect: {
          enable: false,
        },
        // 3D environment
        environment: "#f8fafc",
        // Map styling
        itemStyle: {
          color: "#cbd5e1",
          opacity: 0.85,
          borderWidth: 0.5,
          borderColor: "#94a3b8",
        },
        label: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            color: "#fde68a",
            opacity: 1,
          },
          label: {
            show: false,
          },
        },
        // Region heights — flat map with bars rising
        realisticMaterial: {
          roughness: 0.6,
          metalness: 0,
        },
        // Instanced data — performance optimization
        instancing: true,
        // Z-axis limits for the 3D scene
        boxWidth: 120,
        boxDepth: 120,
        boxHeight: 60,
      },
      series,
    };
  }, [activeMetric, showBars, groupFilter, geoLoaded, filteredCountries]);

  // Force chart re-render when option changes
  useEffect(() => {
    if (chartRef.current && geoLoaded) {
      const chart = chartRef.current.getEchartsInstance();
      chart.setOption(option, { notMerge: true });
    }
  }, [option, geoLoaded]);

  return (
    <div className="space-y-4">
      {/* Control bar */}
      <Card className="p-4">
        <div className="flex flex-col gap-4">
          {/* Metric selector */}
          <div>
            <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <Layers className="h-3.5 w-3.5" />
              Select Risk Metric (drives bar height & color)
            </div>
            <div className="flex flex-wrap gap-2">
              {mapMetrics.map((m) => {
                const isActive = activeMetric === m.id;
                return (
                  <Button
                    key={m.id}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className={`h-8 text-xs ${
                      isActive
                        ? "bg-amber-600 hover:bg-amber-700 text-white"
                        : "hover:border-amber-500/40"
                    }`}
                    onClick={() => setActiveMetric(m.id)}
                  >
                    {m.shortLabel}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t border-border/60 pt-3">
            {/* 3D bars toggle */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                View:
              </span>
              <Button
                variant={showBars ? "secondary" : "ghost"}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setShowBars(!showBars)}
              >
                <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
                3D Bars {showBars ? "On" : "Off"}
              </Button>
            </div>

            {/* Group filter */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Filter:
              </span>
              {(["all", "LDC", "LLDC", "SIDS", "G20", "OECD"] as const).map((g) => (
                <Button
                  key={g}
                  variant={groupFilter === g ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setGroupFilter(g)}
                >
                  {g === "all" ? "All Countries" : g}
                </Button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2 text-[11px] text-muted-foreground">
              <Info className="h-3.5 w-3.5" />
              <span>Drag to rotate · Scroll to zoom · Right-drag to pan</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Map + side panel */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {/* Chart */}
        <Card className="lg:col-span-3 overflow-hidden p-0">
          <div className="relative">
            {loadError && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                <div className="text-center">
                  <p className="text-sm font-semibold text-red-700">Failed to load map data</p>
                  <p className="text-xs text-muted-foreground mt-1">{loadError}</p>
                </div>
              </div>
            )}
            {!geoLoaded && !loadError && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                <div className="text-center">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
                  <p className="mt-2 text-sm text-muted-foreground">Loading world map…</p>
                </div>
              </div>
            )}
            <ReactECharts
              ref={chartRef}
              echarts={echarts}
              option={geoLoaded ? option : { backgroundColor: "transparent" }}
              style={{ height: `${height}px`, width: "100%" }}
              opts={{ renderer: "canvas" }}
              notMerge={true}
              lazyUpdate={true}
              onChartReady={(chart: echarts.EChartsType) => {
                // Trigger a re-render once chart instance is ready
                if (geoLoaded && option) {
                  chart.setOption(option, { notMerge: true });
                }
              }}
            />
          </div>
          {/* Caption */}
          <div className="border-t border-border/60 bg-muted/30 px-4 py-2">
            <p className="text-[10px] text-muted-foreground">
              <span className="font-semibold">Tip:</span> Hover over a bar/country for detailed stats. Right-click
              and drag to pan the map. Click and drag (left) to rotate. Scroll to zoom.
            </p>
          </div>
        </Card>

        {/* Side panel — legend, top countries, insights */}
        <div className="space-y-4">
          {/* Legend */}
          <Card className="p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {mapMetrics.find((m) => m.id === activeMetric)?.shortLabel}
            </h3>
            <p className="mt-1 text-[10px] text-muted-foreground">
              {mapMetrics.find((m) => m.id === activeMetric)?.unit}
            </p>
            <LegendGradient
              colorStops={mapMetrics.find((m) => m.id === activeMetric)!.colorStops}
              unit={mapMetrics.find((m) => m.id === activeMetric)!.unit}
            />
            <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">
              {mapMetrics.find((m) => m.id === activeMetric)?.description}
            </p>
            <p className="mt-2 text-[10px] text-muted-foreground/70">
              Source: {mapMetrics.find((m) => m.id === activeMetric)?.source}
            </p>
          </Card>

          {/* Top 5 countries by current metric */}
          <Card className="p-4">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-amber-600" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Top 5 by {mapMetrics.find((m) => m.id === activeMetric)?.shortLabel}
              </h3>
            </div>
            <TopCountries
              countries={filteredCountries}
              metric={activeMetric}
              unit={mapMetrics.find((m) => m.id === activeMetric)!.unit}
              colorStops={mapMetrics.find((m) => m.id === activeMetric)!.colorStops}
            />
          </Card>

          {/* Quick stats */}
          <Card className="p-4 bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/30">
            <div className="flex items-center gap-1.5">
              <Globe2 className="h-3.5 w-3.5 text-amber-600" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Global snapshot
              </h3>
            </div>
            <div className="mt-3 space-y-2 text-xs">
              <Row label="Countries mapped" value={`${filteredCountries.length}`} />
              <Row label="Vulnerable (LDC+LLDC+SIDS)" value={`${filteredCountries.filter((c) => ["LDC", "LLDC", "SIDS"].includes(c.group)).length}`} />
              <Row label="With MHEWS ≥ 75%" value={`${filteredCountries.filter((c) => c.mhews >= 75).length}`} />
              <Row label="With MHEWS < 50%" value={`${filteredCountries.filter((c) => c.mhews < 50).length}`} />
              <Row label="Flood Δ 2050 > +30%" value={`${filteredCountries.filter((c) => c.floodFuture > 30).length}`} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// === Helper components ===

function LegendGradient({ colorStops, unit }: { colorStops: [number, string][]; unit: string }) {
  const min = colorStops[0][0];
  const max = colorStops[colorStops.length - 1][0];
  const gradient = `linear-gradient(to right, ${colorStops.map(([v, c]) => `${c} ${((v - min) / (max - min)) * 100}%`).join(", ")})`;

  return (
    <div className="mt-3">
      <div
        className="h-3 w-full rounded-full border border-border/60"
        style={{ background: gradient }}
      />
      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground tabular-nums">
        <span>{formatValue(min, unit)}</span>
        <span>{formatValue(max, unit)}</span>
      </div>
    </div>
  );
}

function TopCountries({
  countries,
  metric,
  unit,
  colorStops,
}: {
  countries: CountryRiskPoint[];
  metric: MapMetric;
  unit: string;
  colorStops: [number, string][];
}) {
  const sorted = [...countries]
    .map((c) => ({
      name: c.name,
      value: (c as unknown as Record<MapMetric, number>)[metric],
      group: c.group,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const maxVal = sorted[0]?.value ?? 1;

  return (
    <div className="mt-3 space-y-2">
      {sorted.map((c, i) => {
        const pct = (c.value / maxVal) * 100;
        const color = getColorForValue(c.value, colorStops);
        return (
          <div key={c.name} className="space-y-1">
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-muted-foreground tabular-nums w-4">{i + 1}.</span>
                <span className="font-medium truncate">{c.name}</span>
                <Badge variant="outline" className="text-[9px] py-0 px-1 flex-shrink-0">
                  {c.group}
                </Badge>
              </div>
              <span className="font-semibold tabular-nums flex-shrink-0">
                {formatValue(c.value, unit)}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, background: color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold tabular-nums">{value}</span>
    </div>
  );
}

// === Utility functions ===

function getColorForValue(value: number, stops: [number, string][]): string {
  if (value <= stops[0][0]) return stops[0][1];
  if (value >= stops[stops.length - 1][0]) return stops[stops.length - 1][1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (value >= stops[i][0] && value <= stops[i + 1][0]) {
      // Linear interpolation between colors (simple hex approach)
      return interpolateColor(stops[i][1], stops[i + 1][1], (value - stops[i][0]) / (stops[i + 1][0] - stops[i][0]));
    }
  }
  return stops[stops.length - 1][1];
}

function interpolateColor(c1: string, c2: string, t: number): string {
  const rgb1 = hexToRgb(c1);
  const rgb2 = hexToRgb(c2);
  if (!rgb1 || !rgb2) return c1;
  const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * t);
  const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * t);
  const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return null;
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

function formatValue(v: number, unit: string): string {
  if (unit === "$B / yr") {
    if (v >= 10) return `$${v.toFixed(1)}B`;
    if (v >= 1) return `$${v.toFixed(2)}B`;
    return `$${v.toFixed(3)}B`;
  }
  if (unit === "%") {
    if (v >= 10) return `${v.toFixed(0)}%`;
    if (v >= 1) return `${v.toFixed(1)}%`;
    return `${v.toFixed(2)}%`;
  }
  if (unit === "per 100k") {
    return v.toFixed(2);
  }
  return v.toString();
}
