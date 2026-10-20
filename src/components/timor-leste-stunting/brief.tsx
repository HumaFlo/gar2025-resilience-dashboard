import Link from "next/link";
import { StuntingFeedbackForm } from "@/components/timor-leste-stunting/feedback-form";

const surveyHistory = [
  { year: "MICS 2002", value: 55.7 },
  { year: "TL-DHS 2003", value: 54.8 },
  { year: "National survey 2007", value: 57.2 },
  { year: "TL-DHS 2009–10", value: 58.1 },
  { year: "TL-FNS 2013", value: 50.2 },
  { year: "TL-DHS 2016", value: 45.6 },
  { year: "TL-FNS 2020", value: 47.1 },
  { year: "JME 2025, modelled 2024", value: 45.4 },
  { year: "TLDHS 2025–26", value: 44.9 },
];

const regionalRates = [
  ["Papua New Guinea", 47.6],
  ["Timor-Leste", 45.4],
  ["Laos", 29.9],
  ["Philippines", 27.7],
  ["Myanmar", 24.5],
  ["Indonesia", 22.6],
  ["Cambodia", 22.0],
  ["Vietnam", 19.2],
] as const;

const municipalityRates = [
  ["Ermera", 57.4],
  ["Oecusse (RAEOA)", 56.9],
  ["Viqueque", 54.7],
  ["Ainaro", 52.3],
  ["Bobonaro", 49.5],
  ["Liquiça", 46.6],
  ["Aileu", 46.1],
  ["Baucau", 42.8],
  ["Covalima", 39.4],
  ["Manufahi", 37.1],
  ["Lautém", 36.9],
  ["Dili", 34.9],
  ["Manatuto", 34.9],
] as const;

const sections = [
  { id: "scale", label: "At a glance" },
  { id: "trend", label: "Progress" },
  { id: "geography", label: "Geography" },
  { id: "causes", label: "Causes" },
  { id: "interventions", label: "What works" },
  { id: "feedback", label: "Feedback" },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--rust-ink)]">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-[62ch] text-sm leading-6 text-muted-foreground sm:text-base">
        {description}
      </p>
    </div>
  );
}

function RateBars({
  title,
  rates,
  max,
  nationalAverage,
  source,
  description,
}: {
  title: string;
  rates: readonly (readonly [string, number])[];
  max: number;
  nationalAverage?: number;
  source: string;
  description: string;
}) {
  return (
    <figure aria-label={title} className="min-w-0 border-t-2 border-foreground pt-4">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
      <ol className="mt-6 space-y-3">
        {rates.map(([label, value]) => (
          <li key={label} className="grid grid-cols-[minmax(6.5rem,8rem)_1fr_3.5rem] items-center gap-2 sm:grid-cols-[minmax(7rem,9rem)_1fr_3.5rem]">
            <span
              className={`truncate text-xs sm:text-sm ${
                label === "Timor-Leste" ? "font-semibold text-[var(--rust-ink)]" : ""
              }`}
            >
              {label}
            </span>
            <span className="relative block h-3 overflow-visible bg-muted">
              {nationalAverage !== undefined && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 -top-1 z-10 border-l-2 border-dashed border-muted-foreground/80"
                  style={{ left: `${(nationalAverage / max) * 100}%` }}
                />
              )}
              <span
                role="img"
                aria-label={`${label}: ${value}%`}
                className={`block h-full rounded-sm ${
                  label === "Timor-Leste" ||
                  (nationalAverage !== undefined && value > nationalAverage)
                    ? "bg-[var(--rust)]"
                    : "bg-[var(--hair)]"
                }`}
                style={{ width: `${(value / max) * 100}%` }}
              />
            </span>
            <span className="text-right font-mono text-xs tabular-nums">{value.toFixed(1)}%</span>
          </li>
        ))}
      </ol>
      {nationalAverage !== undefined && (
        <p className="mt-4 text-xs text-muted-foreground">
          Dashed line: national average, {nationalAverage}%.
        </p>
      )}
      <figcaption className="mt-5 border-t border-border pt-4 font-mono text-[10.5px] leading-5 text-muted-foreground">
        {source}
      </figcaption>
    </figure>
  );
}

export function StuntingBrief() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-[1180px] px-5 pb-12 pt-5 sm:px-8 sm:pb-16">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            ← Back to the GAR 2025 dashboard
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--rust-ink)]">
                Timor-Leste · Child nutrition brief
              </p>
              <div className="mb-5 h-0.5 w-16 bg-foreground" />
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Childhood stunting in Timor-Leste
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                Nearly half of under-fives are stunted. Nine years of national effort brought a
                drop of 0.7 points.
              </p>
              <p className="mt-5 font-mono text-[10.5px] leading-5 text-muted-foreground">
                TLDHS 2025–26, TL-FNS 2020, JME 2025, World Bank costing 2024. Compiled October
                2026.
              </p>
            </div>
            <div className="border-t-2 border-[var(--rust)] pt-5 sm:pt-7">
              <p className="text-6xl font-semibold tracking-tight tabular-nums text-[var(--rust)] sm:text-7xl">
                44.9%
              </p>
              <p className="mt-2 text-lg font-semibold">of children under five are stunted</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                About 70,000 children; 16.5% of them severely. The rate is the second highest in
                Southeast Asia.
              </p>
              <p className="mt-4 font-mono text-[10.5px] leading-5 text-muted-foreground">
                TLDHS 2025–26 Key Indicators Report; JME 2024
              </p>
            </div>
          </div>
        </div>
      </header>

      <nav
        aria-label="Brief sections"
        className="sticky top-0 z-30 border-b border-border bg-background"
      >
        <div className="mx-auto flex max-w-[1180px] gap-2 overflow-x-auto px-5 py-1 sm:px-8">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="inline-flex min-h-11 shrink-0 items-center border-b-2 border-transparent px-3 text-xs font-medium text-muted-foreground hover:border-[var(--rust)] hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <main>
        <section id="scale" className="scroll-mt-28 border-t border-border py-12 sm:py-14">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
            <SectionHeading
              eyebrow="The scale"
              title="Child stunting and malnutrition in Timor-Leste: key statistics"
              description="Every figure carries its survey year. Highlighted tiles are moving the wrong way."
            />
            <div className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-6">
              {[
                ["Severe stunting", "16.5%", "of all under-fives; stunting overall is 44.9%", "TLDHS 2025–26"],
                ["Children affected", "≈70,000", "of roughly 157,000 under-fives nationwide", "JME 2024; UNICEF"],
                ["Wasting (acute)", "18.5%", "up from 8.6% in 2020, an emergency signal", "TLDHS 2025–26", true],
                ["Underweight", "41.4%", "now the most prevalent form of malnutrition", "TLDHS 2025–26"],
                ["Dietary diversity", "19.1%", "of children 6–23m, down from 35.3% in 2020", "TLDHS 2025–26", true],
                ["Maternal anaemia", "30.0%", "of women 15–49; 41.7% during pregnancy", "TLDHS 2025–26"],
              ].map(([label, value, context, source, highlighted]) => (
                <article
                  key={label as string}
                  className={`border-t-2 pt-3 ${
                    highlighted ? "border-[var(--rust)]" : "border-foreground"
                  }`}
                >
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                  </p>
                  <p className="my-2 text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
                    {value}
                  </p>
                  <p className="text-xs leading-5 text-muted-foreground">{context}</p>
                  <p className="mt-2 font-mono text-[10px] leading-4 text-muted-foreground">{source}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="trend" className="scroll-mt-28 border-t border-border py-12 sm:py-14">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
            <SectionHeading
              eyebrow="National trend"
              title="Stunting prevalence in Timor-Leste: progress and 2030 goal"
              description="Two decades of surveys show a plateau since 2016, while the national target sits far below the current path."
            />
            <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr]">
              <figure className="min-w-0 border-t-2 border-foreground pt-4">
                <div className="overflow-x-auto">
                  <svg
                    viewBox="0 0 720 292"
                    role="img"
                    aria-labelledby="trend-chart-title trend-chart-description"
                    className="min-w-[600px] w-full sm:min-w-0"
                  >
                  <title id="trend-chart-title">Stunting prevalence over time</title>
                  <desc id="trend-chart-description">
                    Stunting prevalence fell from 55.7 percent in 2002 to 44.9 percent in 2025–26.
                    At the recent pace it remains around 45 percent by 2030, far above the PANKOS
                    target of below 25 percent.
                  </desc>
                  <g stroke="currentColor" className="text-border">
                    <line x1="40" y1="20" x2="700" y2="20" />
                    <line x1="40" y1="78" x2="700" y2="78" />
                    <line x1="40" y1="135" x2="700" y2="135" />
                    <line x1="40" y1="193" x2="700" y2="193" />
                  </g>
                  <g fill="currentColor" className="font-mono text-[11px] text-muted-foreground">
                    <text x="32" y="24" textAnchor="end">60</text>
                    <text x="32" y="82" textAnchor="end">50</text>
                    <text x="32" y="139" textAnchor="end">40</text>
                    <text x="32" y="197" textAnchor="end">30</text>
                    <text x="32" y="254" textAnchor="end">20</text>
                    <text x="40" y="270">2002</text>
                    <text x="229" y="270" textAnchor="middle">2010</text>
                    <text x="365" y="270" textAnchor="middle">2016</text>
                    <text x="459" y="270" textAnchor="middle">2020</text>
                    <text x="600" y="270" textAnchor="middle">2026</text>
                    <text x="700" y="270" textAnchor="end">2030</text>
                  </g>
                  <line x1="40" y1="250" x2="700" y2="250" stroke="currentColor" className="text-border" />
                  <line x1="600" y1="107" x2="700" y2="106" stroke="currentColor" strokeDasharray="2 5" className="text-muted-foreground" />
                  <line x1="600" y1="107" x2="700" y2="221" stroke="var(--rust)" strokeDasharray="6 5" />
                  <polyline
                    points="40,45 64,50 158,36 217,31 294,76 365,103 459,94 553,104 600,107"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-foreground"
                  />
                  {surveyHistory.map((point, index) => {
                    const coordinates = [
                      [40, 45],
                      [64, 50],
                      [158, 36],
                      [217, 31],
                      [294, 76],
                      [365, 103],
                      [459, 94],
                      [553, 104],
                      [600, 107],
                    ][index];
                    return (
                      <circle
                        key={point.year}
                        cx={coordinates[0]}
                        cy={coordinates[1]}
                        r={index === surveyHistory.length - 1 ? 5 : 3}
                        fill={index === surveyHistory.length - 1 ? "var(--rust)" : "currentColor"}
                        className={index === surveyHistory.length - 1 ? "" : "text-foreground"}
                      >
                        <title>{`${point.year}: ${point.value}%`}</title>
                      </circle>
                    );
                  })}
                  <circle cx="700" cy="221" r="4" fill="var(--rust)">
                    <title>PANKOS target: below 25% by 2030</title>
                  </circle>
                  <text x="217" y="20" textAnchor="middle" fill="currentColor" className="font-mono text-[11px]">58.1%</text>
                  <text x="294" y="94" textAnchor="middle" fill="currentColor" className="font-mono text-[11px]">50.2%</text>
                  <text x="365" y="123" textAnchor="middle" fill="currentColor" className="font-mono text-[11px]">45.6%</text>
                  <text x="459" y="84" textAnchor="middle" fill="currentColor" className="font-mono text-[11px]">47.1%</text>
                  <text x="600" y="93" textAnchor="middle" fill="var(--rust-ink)" className="font-mono text-[11px] font-semibold">44.9%</text>
                  <text x="700" y="240" textAnchor="end" fill="var(--rust-ink)" className="font-mono text-[11px]">below 25% by 2030</text>
                  <text x="692" y="99" textAnchor="end" fill="currentColor" className="font-mono text-[11px] text-muted-foreground">at recent pace</text>
                  </svg>
                </div>
                <ol className="mt-4 grid gap-x-5 gap-y-2 border-t border-border/60 pt-4 sm:grid-cols-2">
                  {surveyHistory.map(({ year, value }) => (
                    <li key={year} className="flex justify-between gap-3 text-xs">
                      <span className="text-muted-foreground">{year}</span>
                      <span className="font-mono tabular-nums">{value}%</span>
                    </li>
                  ))}
                </ol>
                <figcaption className="mt-4 text-xs leading-5 text-muted-foreground">
                  Stunting prevalence, children under five (%), height-for-age below −2 SD of the WHO
                  median; axis truncated at 20%. Dotted grey: continuing at the 2016–2025 pace of
                  about 0.1 points a year. Dashed rust: path to the PANKOS target, which the World
                  Bank estimates needs 2–3 points a year.
                </figcaption>
              </figure>
              <aside aria-label="Why it matters" className="space-y-5 border-t-2 border-foreground pt-4">
                <h3 className="text-base font-semibold">Why it matters</h3>
                {[
                  ["4.6 IQ points", "lower measured IQ at age nine among children persistently stunted, birth-cohort evidence.", "PLOS ONE 2022 cohort"],
                  ["+25–46%", "adult hourly wages for those adequately nourished in the first two years, long-run trial follow-ups.", "Lancet; IJE review"],
                  ["25.5%", "of under-five deaths in 2013 attributed to undernutrition, the country's leading risk factor.", "IHME via World Bank"],
                ].map(([stat, description, source]) => (
                  <div key={stat} className="border-b border-border/60 pb-4 last:border-0">
                    <p className="text-xl font-semibold tabular-nums">{stat}</p>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p>
                    <p className="mt-2 text-[10px] text-muted-foreground">{source}</p>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </section>

        <section id="geography" className="scroll-mt-28 border-t border-border py-12 sm:py-14">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
            <SectionHeading
              eyebrow="Unequal burden"
              title="Child stunting by municipality in Timor-Leste"
              description="Second highest in Southeast Asia, and inside the country a child's risk depends heavily on where they are born."
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <RateBars
                title="Southeast Asia"
                rates={regionalRates}
                max={60}
                source="Stunting prevalence under five (%), JME 2025 edition, modelled 2024. Timor-Leste highlighted; roughly twice the regional average."
                description="Stunting prevalence under five (%); the Timor-Leste estimate is modelled."
              />
              <RateBars
                title="By municipality"
                rates={municipalityRates}
                max={60}
                nationalAverage={44.9}
                source="By municipality, TLDHS 2025–26 (%). Rust bars sit above the national average of 44.9%. Atauro (52.2%) omitted, sample of 21."
                description="Stunting prevalence under five (%); dashed line marks the national average."
              />
            </div>
            <p className="mt-6 max-w-4xl text-sm leading-6 text-muted-foreground">
              Gradients run the same way everywhere: rural <strong className="text-foreground">47.6%</strong> vs
              urban <strong className="text-foreground">36.7%</strong>; poorest wealth quintile{" "}
              <strong className="text-foreground">56.5%</strong> vs richest{" "}
              <strong className="text-foreground">32.3%</strong>, a gap that has doubled since 2016. A
              22.5-point spread separates Ermera from Dili.
            </p>
          </div>
        </section>

        <section id="causes" className="scroll-mt-28 border-t border-border py-12 sm:py-14">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
            <SectionHeading
              eyebrow="UNICEF framework"
              title="Causes of child malnutrition in Timor-Leste"
              description="A chain of deprivation runs from the mother's plate to the national purse. Three tiers, UNICEF framework."
            />
            <div className="grid gap-7 md:grid-cols-3">
              {[
                {
                  tier: "Immediate",
                  items: [
                    ["Diet.", "96.9% of toddlers ate starchy staples in the prior day; only 36.6% ate flesh foods and 3.1% dairy (2020)."],
                    ["Illness.", "Diarrhoea 14% and fever 22% in two weeks; sick children are often fed less, not more."],
                    ["Timing.", "Stunting peaks at 55.5% at ages 24–35m, the tail of the first 1,000 days."],
                  ],
                },
                {
                  tier: "Underlying",
                  items: [
                    ["Households.", "50.4% moderately or severely food insecure (2020); the lean season runs November to March."],
                    ["Hygiene.", "28.4% basic handwashing facility; 6.2% of caregivers wash hands before feeding a child."],
                    ["Care.", "21.7% of women never attended school; 57.8% of births come within 36 months of the last."],
                  ],
                },
                {
                  tier: "Structural",
                  items: [
                    ["Poverty.", "41.8% by the national line (2014); 48.3% multidimensionally poor."],
                    ["Food system.", "Rain-fed farming, about 60% of cereals imported, El Niño drought in 2023–24."],
                    ["Fiscal cliff.", "The Petroleum Fund is projected to deplete around 2034; nutrition gets about 2% of the budget."],
                  ],
                },
              ].map(({ tier, items }) => (
                <article key={tier} className="border-t-2 border-foreground pt-4">
                  <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--rust-ink)]">
                    {tier}
                  </h3>
                  <ul className="space-y-4">
                    {items.map(([label, detail]) => (
                      <li key={label} className="text-sm leading-6 text-muted-foreground">
                        <strong className="text-foreground">{label}</strong> {detail}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="interventions" className="scroll-mt-28 border-t border-border py-12 sm:py-14">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
            <SectionHeading
              eyebrow="Evidence and investment"
              title="Evidence-based nutrition actions and costs"
              description="The evidence base is strong, the national plan exists, and the financing gap is small by budget standards."
            />
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 text-base font-semibold">Proven interventions</h3>
                <ul className="space-y-4 border-t-2 border-foreground pt-5">
                  {[
                    ["Small-quantity lipid-based nutrients", "for ages 6–24m: severe stunting down 15–17% in trial meta-analyses."],
                    ["Treat wasting now.", "CMAM/RUTF reached 63% of cases in 2023; wasting has doubled since 2020."],
                    ["Feeding counselling.", "Exclusive breastfeeding has sat near 50–55% for fifteen years; dietary diversity collapsed to 19.1%."],
                    ["The Lancet core package", "at 90% coverage would avert about 20% of stunting and 15% of under-five deaths."],
                  ].map(([title, detail]) => (
                    <li key={title} className="text-sm leading-6 text-muted-foreground">
                      <strong className="text-foreground">{title}</strong> {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <aside className="border-t-2 border-[var(--rust)] pt-5 sm:pt-7">
                <p className="text-4xl font-semibold tracking-tight tabular-nums text-[var(--rust)] sm:text-5xl">
                  $1 → $23
                </p>
                <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                  return per dollar on full-scale nutrition action, World Bank Investment Framework
                  for Nutrition, 2024.
                </p>
                <ul className="mt-5 space-y-3 border-t border-border/70 pt-5">
                  {[
                    ["Timor-Leste ask:", "+US$55M to 2030, about US$7M a year or 0.3% of GDP."],
                    ["Documented return:", "more than US$10 per US$1 invested (World Bank national costing)."],
                    ["Cost of inaction:", "US$41M a year in lost economic activity, about 1% of GDP."],
                    ["Goal:", "stunting below 25% by 2030 under PANKOS, approved November 2025."],
                  ].map(([title, detail]) => (
                    <li key={title} className="text-sm leading-6 text-muted-foreground">
                      <strong className="text-foreground">{title}</strong> {detail}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section id="feedback" className="scroll-mt-28 border-t border-border py-12 sm:py-14">
          <div className="mx-auto grid max-w-[1180px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--rust-ink)]">
                Help improve this brief
              </p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Was this brief useful?
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Share a short, anonymous response. Feedback is sent only when a secure form
                endpoint has been configured; it is never saved in this browser.
              </p>
            </div>
            <div className="border-t-2 border-foreground pt-5 sm:pt-7">
              <StuntingFeedbackForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-7">
        <div className="mx-auto max-w-[1180px] space-y-3 px-5 font-mono text-[10.5px] leading-5 text-muted-foreground sm:px-8">
          <p>
            Compiled October 2026 from “Childhood Stunting in Timor-Leste: Comprehensive Problem
            Identification” (fully referenced). Primary sources: TLDHS 2025–26 Key Indicators
            Report; TL-FNS 2020; TL-DHS 2003, 2009–10, 2016; UNICEF/WHO/World Bank Joint Malnutrition
            Estimates 2025; World Bank CNAP-NFS costing 2024.
          </p>
          <p>
            Survey estimates carry sampling error; contested figures and full caveats are
            documented in the source analysis. This page has no tracking. Feedback is sent through
            the configured form service and is not stored locally.
          </p>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center font-medium text-foreground underline-offset-4 hover:underline"
          >
            Return to the GAR 2025 dashboard
          </Link>
        </div>
      </footer>
    </div>
  );
}
