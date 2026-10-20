/**
 * UNDRR GAR 2025 - "Resilience Pays: Financing and Investing for our Future"
 * Policy Intelligence Data Layer
 *
 * All figures sourced from UNDRR Global Assessment Report 2025.
 * Direct citations to report chapters/pages noted where applicable.
 */

export const reportMeta = {
  title: "Resilience Pays",
  subtitle: "Financing and Investing for our Future",
  series: "Global Assessment Report on Disaster Risk Reduction 2025",
  publisher: "United Nations Office for Disaster Risk Reduction (UNDRR)",
  year: 2025,
  pages: 253,
  url: "https://www.undrr.org/gar",
  callToAction: "Act now: break the cycle and build resilience",
};

// ============================================================
// HERO / HEADLINE METRICS
// ============================================================
export const headlineStats = [
  {
    id: "true-cost",
    label: "True Annual Cost of Disasters",
    value: "$2.3T",
    sublabel: "incl. indirect losses (≈10x direct losses)",
    context: "Equivalent to ~2% of global GDP. Far above the $202B in direct losses officially reported.",
    severity: "critical" as const,
    source: "GAR2025 Ch.4 / Ch.7",
  },
  {
    id: "direct-losses",
    label: "Direct Economic Losses (2015–2023)",
    value: "$1.1T",
    sublabel: "reported through Sendai Framework Monitor",
    context: "Equivalent to ~0.3% of reporting countries' GDP. Only part of the picture — cascading costs push the true bill far higher.",
    severity: "high" as const,
    source: "GAR2025 Ch.1 (Target C)",
  },
  {
    id: "annual-mortality",
    label: "Avg. Annual Disaster Mortality (2015–2023)",
    value: "41,683",
    sublabel: "deaths per year",
    context: "Global rate halved from 1.61 → 0.79 per 100,000 between decades — but gains are uneven, and LDCs/LLDCs/SIDS still bear 2.5–3× the global rate.",
    severity: "high" as const,
    source: "GAR2025 Ch.1 (Target A)",
  },
  {
    id: "people-affected",
    label: "People Affected Annually",
    value: "124M+",
    sublabel: "injured, displaced, or livelihoods disrupted",
    context: "Rate has risen from 1,158 → 2,028 per 100,000 between decades — driven by both better reporting and growing exposure as cities expand.",
    severity: "high" as const,
    source: "GAR2025 Ch.1 (Target B)",
  },
  {
    id: "infra-damage",
    label: "Critical Infrastructure Units Damaged / Year",
    value: "92,000+",
    sublabel: "+1.6M basic services disrupted",
    context: "When schools close, education stalls. When hospitals go offline, health crises worsen. Knock-on effects deepen inequality.",
    severity: "medium" as const,
    source: "GAR2025 Ch.1 (Target D)",
  },
  {
    id: "income-2050",
    label: "Projected Global Income Decline by 2050",
    value: "-19%",
    sublabel: "due to climate-related hazards",
    context: "Lower-income countries suffer disproportionately. Trend is not destiny — investment in resilience can slow or reverse this trajectory.",
    severity: "critical" as const,
    source: "GAR2025 Ch.5 / Ch.6",
  },
];

// ============================================================
// THE ICEBERG: DIRECT vs INDIRECT COSTS
// ============================================================
export const costIceberg = {
  visible: {
    label: "Direct Losses (Reported)",
    value: 202,
    unit: "$B / year",
    description:
      "Damage to buildings, infrastructure, and assets that is officially reported through national disaster loss databases and the Sendai Framework Monitor.",
  },
  hidden: {
    label: "The 'Missing Millions' (Indirect & Cascading)",
    value: 2100,
    unit: "$B / year",
    description:
      "Losses to health, education, livelihoods, ecosystems, supply chains, displacement, and long-term productivity — historically invisible in official accounts.",
    breakdown: [
      { label: "Long-term health & educational declines", value: 540, color: "var(--chart-1)" },
      { label: "Livelihoods & informal-sector income loss", value: 510, color: "var(--chart-2)" },
      { label: "Ecosystem & natural capital loss", value: 430, color: "var(--chart-3)" },
      { label: "Internal displacement & migration costs", value: 380, color: "var(--chart-4)" },
      { label: "Supply chain & infrastructure cascades", value: 240, color: "var(--chart-5)" },
    ],
  },
  multiplier: 11.4,
};

// ============================================================
// BIG FIVE HAZARDS (95% of economic losses)
// ============================================================
export const bigFiveHazards = [
  {
    id: "storms",
    name: "Storms",
    shareOfLosses: 38,
    economicLosses1970_2023: 2900, // $B
    frequency: "Most costly climate-related hazard",
    trend: "intensifying",
    futureOutlook:
      "1-in-100-year storm in 2050 will be more intense than today. Three of the 10 costliest climate disasters 1970–2019 were 2017 hurricanes (Harvey $96.9B, Maria $69.4B, Irma $58.2B).",
    color: "var(--chart-1)",
  },
  {
    id: "floods",
    name: "Floods",
    shareOfLosses: 24,
    economicLosses1970_2023: 1500,
    frequency: "Most frequent weather-related disaster",
    trend: "worsening",
    futureOutlook:
      "Exposure rising with rapid urbanization. By 2050, climate change amplifies flood intensity across many basins, especially in Asia and Africa.",
    color: "var(--chart-2)",
  },
  {
    id: "earthquakes",
    name: "Earthquakes",
    shareOfLosses: 22,
    economicLosses1970_2023: 1590,
    frequency: "Geophysical — no climate signal",
    trend: "stable-but-costly",
    futureOutlook:
      "AAL for earthquakes alone places critical infrastructure at >$250B/year risk. Probabilistic models flag 1-in-100 and 1-in-1000-year tail risks.",
    color: "var(--chart-3)",
  },
  {
    id: "droughts",
    name: "Droughts",
    shareOfLosses: 8,
    economicLosses1970_2023: 307,
    frequency: "Slow-onset; under-reported",
    trend: "expanding",
    futureOutlook:
      "Affects 1.8B+ people annually. 12.9% of average hydro-power production impacted. Cross-sectoral AAL still missing for most economies.",
    color: "var(--chart-4)",
  },
  {
    id: "extreme-heat",
    name: "Extreme Heat",
    shareOfLosses: 3,
    economicLosses1970_2023: 75,
    frequency: "Fastest-growing hazard",
    trend: "accelerating",
    futureOutlook:
      "Europe alone: +$2.8B/yr in hospital admissions & lost productivity. Cities see 12–15% surge in maintenance costs (~$4.5B/yr). Outdoor work becomes impossible on hottest days.",
    color: "var(--chart-5)",
  },
];

// ============================================================
// SENDAI FRAMEWORK TARGETS (A–G) — STATUS DASHBOARD
// ============================================================
export const sendaiTargets = [
  {
    code: "A",
    title: "Reduce Global Disaster Mortality",
    status: "on-track" as const,
    direction: "improving",
    metric: "0.79 deaths per 100k",
    baseline: "1.61 (2005–2014)",
    current: "0.79 (2014–2023)",
    change: "-51%",
    insight:
      "Global disaster mortality rate has halved since Sendai Framework adoption — proof that early warnings, preparedness, and risk-informed planning save lives.",
    caveat:
      "Progress is uneven. LDCs (1.97) and LLDCs (2.43) still record 2.5–3× the global average.",
  },
  {
    code: "B",
    title: "Reduce Affected People",
    status: "off-track" as const,
    direction: "worsening",
    metric: "2,028 per 100k",
    baseline: "1,158 (2005–2014)",
    current: "2,028 (2014–2023)",
    change: "+75%",
    insight:
      "Reflects both better reporting and real growth in exposure as cities expand into harm's way. Progress requires proactive urban planning, not emergency response alone.",
    caveat:
      "LLDCs bear 3,126 affected per 100k — 54% above the global average.",
  },
  {
    code: "C",
    title: "Reduce Direct Economic Losses",
    status: "off-track" as const,
    direction: "worsening",
    metric: "$1.1T (2015–2023)",
    baseline: "~0.3% of GDP",
    current: "~0.3% of GDP (steady)",
    change: "↑ absolute losses",
    insight:
      "Direct losses reported through SFM totalled ≥$1.1 trillion over 2015–2023. But the true bill — including 'missing millions' — approaches $2.3 trillion annually.",
    caveat:
      "Many countries struggle to measure cascading impacts or damage to informal economies.",
  },
  {
    code: "D",
    title: "Reduce Critical Infrastructure Damage",
    status: "off-track" as const,
    direction: "worsening",
    metric: "92k units / year",
    baseline: "—",
    current: "92,000+ units damaged/yr; 1.6M services disrupted",
    change: "high and rising",
    insight:
      "When schools close, education stalls. When hospitals go offline, health crises worsen. Infrastructure protection is central to everyday resilience.",
    caveat: "Knock-on effects deepen inequality in already-struggling communities.",
  },
  {
    code: "E",
    title: "National & Local DRR Strategies",
    status: "on-track" as const,
    direction: "improving",
    metric: "131 countries",
    baseline: "57 (2015)",
    current: "131 (2023)",
    change: "+130% adoption",
    insight:
      "Number of countries with national DRR strategies more than doubled. High-quality strategies (score 0.75–1.0) quadrupled from 14 → 57.",
    caveat:
      "Translation from strategy to on-the-ground impact remains the next hurdle.",
  },
  {
    code: "F",
    title: "International Cooperation",
    status: "mixed" as const,
    direction: "improving-but-insufficient",
    metric: "89 countries supported",
    baseline: "46 (2015)",
    current: "89 (2023)",
    change: "+93%",
    insight:
      "Technical assistance grew substantially. But only 17 countries reported receiving dedicated DRR financial support in 2023 — a serious gap given rising costs.",
    caveat:
      "SIDS and LDCs, most exposed to climate shocks, face the greatest resource constraints.",
  },
  {
    code: "G",
    title: "Multi-Hazard Early Warning Systems",
    status: "mixed" as const,
    direction: "improving-but-uneven",
    metric: "90 countries",
    baseline: "59 (2015)",
    current: "90 (2023)",
    change: "+53%",
    insight:
      "1,900 science/tech programmes and 34,000 capacity-development initiatives reported. 103 countries now produce disaster risk information.",
    caveat:
      "Only 38% of SIDS, 63% of LLDCs, and 49% of LDCs have MHEWS in place. Coverage ≠ action: warnings must reach the most vulnerable.",
  },
];

// ============================================================
// THREE NEGATIVE SPIRALS (Chapter 6)
// ============================================================
export const threeSpirals = [
  {
    id: "spiral-1",
    number: 1,
    title: "The Risk-Creation Addiction",
    subtitle: "Underinvestment in prevention + accumulation of new risk",
    driver:
      "Development continues to put people and assets in harm's way — through unplanned urbanization, ecosystem degradation, and infrastructure built without risk standards.",
    symptoms: [
      "Risk not priced into public investment decisions",
      "Land-use planning ignores hazard exposure",
      "Ecosystem-based buffers (mangroves, forests) lost",
      "Building codes outdated or unenforced",
    ],
    consequence:
      "Each new development adds to the stock of risk that future disasters will claim — even as preparedness spending stays flat.",
    breaker: "Public financing + regulation",
    breakerDescription:
      "Ring-fence DRR budgets. Mainstream risk reduction across sectors. Implement budget tagging and accountability systems.",
    color: "#dc2626",
  },
  {
    id: "spiral-2",
    number: 2,
    title: "The Risk-Transfer Finance Spiral",
    subtitle: "Rising uninsurability → eroding trust → shrinking coverage",
    driver:
      "As losses mount, insurers retreat from high-risk regions and products become unaffordable. When a country or sector becomes uninsurable, it becomes uninvestable.",
    symptoms: [
      "Premiums rising faster than resilience investment",
      "Insurers withdrawing from whole regions (e.g., wildfire-exposed US)",
      "Coverage non-renewals becoming systemic",
      "Developing-country insurance products poorly adapted to local contexts",
    ],
    consequence:
      "Risk concentration shifts back to households and governments — the actors least able to absorb catastrophic losses.",
    breaker: "Innovate risk transfer & insurance",
    breakerDescription:
      "Insurers must price for rebuild-to-future-standard, not just replacement. Publish coverage and non-renewal data annually. Tailor products to developing-country contexts. Scale social safety nets for low-income workers.",
    color: "#ea580c",
  },
  {
    id: "spiral-3",
    number: 3,
    title: "The Response-Repeat Spiral",
    subtitle: "Repeated humanitarian response → no time/capacity for prevention",
    driver:
      "Vulnerable countries are trapped in a cycle of disaster → response → recovery → repeat. With only 3.3% of humanitarian aid going to prevention, the pattern is structural.",
    symptoms: [
      "Humanitarian appeals dominate funding cycles",
      "Anticipatory action remains underused",
      "Disaster forensic analysis rarely performed",
      "Recovery rarely reduces underlying vulnerabilities",
    ],
    consequence:
      "Each cycle erodes development gains, deepens debt, and pushes countries further from achieving the SDGs.",
    breaker: "Anticipate shocks + leverage international finance",
    breakerDescription:
      "Scale anticipatory action and finance. Use disaster forensic analysis to target core vulnerabilities. Multilaterals to embed resilience in sovereign loans and ODA prioritization.",
    color: "#d97706",
  },
];

// ============================================================
// VULNERABLE COUNTRIES DISPARITY (LDCs / SIDS / LLDCs)
// ============================================================
export const vulnerableCountries = [
  {
    group: "LDCs",
    fullName: "Least Developed Countries",
    mortalityPer100k: 1.97,
    globalAverage: 0.79,
    shareOfLosses: 10.4,
    shareOfGDP: 1.06,
    mhewsCoverage: 49,
    color: "var(--chart-1)",
  },
  {
    group: "LLDCs",
    fullName: "Landlocked Developing Countries",
    mortalityPer100k: 2.43,
    globalAverage: 0.79,
    shareOfLosses: 5.6,
    shareOfGDP: 1.0,
    mhewsCoverage: 63,
    color: "var(--chart-4)",
  },
  {
    group: "SIDS",
    fullName: "Small Island Developing States",
    mortalityPer100k: 1.6,
    globalAverage: 0.79,
    shareOfLosses: 8.2,
    shareOfGDP: 0.7,
    mhewsCoverage: 38,
    color: "var(--chart-2)",
  },
];

// ============================================================
// ROI OF RESILIENCE — BENEFIT-COST RATIOS
// ============================================================
export const roiOfResilience = [
  {
    intervention: "Storm resilience (sub-Saharan Africa)",
    bcr: 13.2,
    bcrLabel: "1,200%",
    sector: "Infrastructure & coastal",
    description:
      "Long-term savings from resilience investment and coping mechanisms can reach 1,200% for storms in sub-Saharan Africa.",
    source: "GAR2025 Ch.5 — Recommendations for action",
  },
  {
    intervention: "Drought resilience (sub-Saharan Africa)",
    bcr: 4.0,
    bcrLabel: "300%",
    sector: "Agriculture & water",
    description:
      "Long-term savings of 300% for drought resilience in sub-Saharan Africa — against a backdrop of $307B/yr in drought losses globally.",
    source: "GAR2025 Ch.5 — Recommendations for action",
  },
  {
    intervention: "Climate adaptation (sectoral average)",
    bcr: 5.0,
    bcrLabel: "100–900%",
    sector: "Cross-sectoral",
    description:
      "Sectoral studies report BCRs of 100%–900% for climate adaptation measures. Disasters are already considerably more costly than DRR would be.",
    source: "GAR2025 Ch.5 — Recommendations for action",
  },
  {
    intervention: "Multi-hazard early warning systems",
    bcr: 9.0,
    bcrLabel: "up to 9:1",
    sector: "Risk information & warnings",
    description:
      "Among the most cost-effective interventions that exist — saving lives and reducing losses for a fraction of post-disaster response costs.",
    source: "GAR2025 Ch.1 (Target G) + Ch.6",
  },
  {
    intervention: "ODA-aligned DRR investments",
    bcr: 10.0,
    bcrLabel: "2:1 → 10:1+",
    sector: "International finance",
    description:
      "Disaster risk reduction measures deliver some of the highest benefit-cost ratios in development finance, ranging from 2:1 to 10:1 or more.",
    source: "GAR2025 Ch.6 / Ch.7 — Conclusion",
  },
];

// ============================================================
// FUNDING GAP ANALYSIS
// ============================================================
export const fundingGap = {
  odaForDRR: {
    label: "ODA officially categorized as DRR (2019–2023)",
    percentage: 1,
    context:
      "Only ~1% of total Official Development Assistance is officially categorized as disaster risk reduction, prevention, and preparedness.",
  },
  humanitarianForPrevention: {
    label: "Humanitarian aid for prevention & preparedness (2019–2023)",
    percentage: 3.3,
    previousPercentage: 3.6,
    context:
      "Disaster prevention and preparedness accounted for only 3.3% of humanitarian aid (2019–2023), DOWN from 3.6% (2015–2018).",
  },
  countriesWithDedicatedDRRFinance: {
    label: "Countries receiving dedicated international DRR financial support (2023)",
    count: 17,
    context:
      "Only 17 countries reported receiving dedicated international financial support for DRR in 2023 — far below what rising costs demand.",
  },
  costOfInaction: {
    label: "True cost of disasters per year",
    value: "$2.3T",
    context:
      "The cost of inaction is already considerably larger than the cost of disaster risk reduction — even before compounding benefits are counted.",
  },
};

// ============================================================
// FUTURE RISK TO 2050
// ============================================================
export const futureRisk2050 = {
  incomeDeclineGlobal: -19,
  incomeDeclineRegions: [
    { region: "Sub-Saharan Africa", decline: -22, color: "var(--chart-1)" },
    { region: "South Asia", decline: -20, color: "var(--chart-2)" },
    { region: "Middle East & North Africa", decline: -19, color: "var(--chart-3)" },
    { region: "Latin America & Caribbean", decline: -17, color: "var(--chart-4)" },
    { region: "East Asia & Pacific", decline: -16, color: "var(--chart-5)" },
    { region: "Europe & Central Asia", decline: -11, color: "var(--chart-2)" },
    { region: "North America", decline: -8, color: "var(--chart-3)" },
  ],
  keyProjections: [
    {
      hazard: "Floods",
      projection: "1-in-100-year flood event in 2050 will be more intense than today's equivalent return period.",
    },
    {
      hazard: "Tropical cyclones",
      projection: "Higher-intensity storms, compounding with sea-level rise and storm surge.",
    },
    {
      hazard: "Landslides",
      projection: "Compounding risk in mountainous regions as heavier rainfall interacts with exposed slopes.",
    },
    {
      hazard: "Droughts",
      projection: "Expanding geographic footprint and longer duration. Cross-sectoral AAL still missing in most economies.",
    },
    {
      hazard: "Extreme heat",
      projection: "Outdoor work becomes impossible on hottest days. Major cities face 12–15% surge in maintenance costs.",
    },
  ],
};

// ============================================================
// SIX STRATEGIC ACTION AREAS (Chapter 7 — Conclusion)
// ============================================================
export const sixActionAreas = [
  {
    id: "1",
    title: "Democratize Risk Understanding",
    summary:
      "Quality risk information aligned to local realities is fundamental. It must be standardized, accessible, comparable, and — wherever possible — open source.",
    policyActions: [
      "Connect hazard data to exposure and vulnerability to pinpoint risk",
      "Tailor metrics (AAL + PML) for central banks, governments, project planners",
      "Complement metrics with resilience indicators",
      "Apply machine learning and AI to accelerate trend analysis",
    ],
    primaryStakeholders: ["National DRR agencies", "Meteorological offices", "Open-data platforms"],
    color: "var(--chart-1)",
  },
  {
    id: "2",
    title: "Break the Risk-Creation Addiction",
    summary:
      "Physical disaster risks must be monitored and managed like any other systemic financial risk. Governments set guardrails, spread learning, and ensure access to quality risk data.",
    policyActions: [
      "Ring-fence DRR budgets; empower responsible agencies",
      "Implement budget tagging and tracking systems for DRR losses/expenditures",
      "Mainstream DRR across sectors and plans",
      "Apply consistent resilience standards to public investment",
    ],
    primaryStakeholders: ["Finance ministries", "Cabinet offices", "Public pension funds"],
    color: "var(--chart-4)",
  },
  {
    id: "3",
    title: "Innovate Risk Transfer & Insurance",
    summary:
      "Insurance can no longer thrive unless countries and companies ensure their actions are more resilient to shocks. 'When a country becomes uninsurable, it becomes uninvestable.' — PM Mia Mottley, Barbados",
    policyActions: [
      "Insurers price for rebuild-to-future-standard, not just replacement",
      "Publish coverage and non-renewal data annually",
      "Tailor products to developing-country contexts (avoid wholesale transplants)",
      "Scale needs-based social safety nets for low-income workers",
    ],
    primaryStakeholders: ["Insurance regulators", "Reinsurers", "Ministries of social protection"],
    color: "var(--chart-3)",
  },
  {
    id: "4",
    title: "Make the Business Case",
    summary:
      "Private sector accounts for ~75% of capital investment in most economies. Without risk-informed private investment, societal resilience remains out of reach.",
    policyActions: [
      "Promote co-financing partnerships for resilience innovation",
      "Surface hidden disaster risk in underinsured supply chains",
      "Use insurance risk analytics to identify safer infrastructure",
      "Incentivize resilient private capital through taxonomies and standards",
    ],
    primaryStakeholders: ["Private sector", "Industry associations", "Investors", "Insurers"],
    color: "var(--chart-2)",
  },
  {
    id: "5",
    title: "Anticipate Shocks to Reduce Humanitarian Need",
    summary:
      "Many vulnerable countries remain trapped in disaster → response → recovery → repeat. Scaling anticipatory action and shifting from response to prevention is essential.",
    policyActions: [
      "Scale anticipatory action and finance",
      "Increase share of aid targeting DRR beyond current ~2% global level",
      "Use disaster forensic analysis to target core vulnerabilities",
      "Fund recovery that reduces future risk, not just restores status quo",
    ],
    primaryStakeholders: ["Humanitarian agencies", "OCHA", "WFP", "IFRC", "Donors"],
    color: "var(--chart-5)",
  },
  {
    id: "6",
    title: "Leverage International Financial Mechanisms",
    summary:
      "Multilateral institutions must harness globalized financial markets to share risk broadly, prevent fiscal gaps, and support faster, better-targeted recovery.",
    policyActions: [
      "Embed resilience in sovereign loan program design",
      "Extend reinsurance-style coverage to absorb GDP-share losses for LDCs/SIDS",
      "Prioritize ODA toward DRR (currently 1% of ODA — should grow)",
      "Draw lessons from risk pooling (CCRIF, PCRIC) and the Santiago Network",
    ],
    primaryStakeholders: ["Multilateral development banks", "IMF", "ODA donors", "UN system"],
    color: "var(--chart-3)",
  },
];

// ============================================================
// STAKEHOLDER PATHWAYS — Multi-audience views
// ============================================================
export const stakeholderPathways = [
  {
    id: "finance-minister",
    label: "Finance Minister / Treasury",
    icon: "Landmark",
    primaryConcern: "Sovereign debt, credit ratings, fiscal space",
    keyStats: ["$2.3T true annual cost", "19% income decline by 2050", "Disaster-driven credit downgrades"],
    actions: [
      "Ring-fence DRR budgets and tag disaster-related expenditures",
      "Adopt AAL + PML analytics in fiscal planning",
      "Engage credit rating agencies on resilience performance",
      "Use contingent financing and pre-arranged finance facilities",
    ],
    relevantActionAreas: ["2", "3", "6"],
  },
  {
    id: "drr-agency",
    label: "National DRR Agency",
    icon: "ShieldAlert",
    primaryConcern: "Strategy implementation, multi-hazard risk reduction",
    keyStats: ["131 countries with national DRR strategies", "90 countries with MHEWS", "92k+ infra units damaged/yr"],
    actions: [
      "Translate national strategies into local-government action",
      "Close MHEWS coverage gaps in LDCs/SIDS/LLDCs",
      "Implement disaster forensic analysis after every event",
      "Build cross-sectoral national DRR platforms",
    ],
    relevantActionAreas: ["1", "2", "5"],
  },
  {
    id: "private-insurer",
    label: "Insurer / Reinsurer",
    icon: "Umbrella",
    primaryConcern: "Portfolio sustainability, uninsurability, pricing",
    keyStats: ["1,200% BCR for storms (sub-Saharan Africa)", "Wildfire losses 2014–2023: $106B", "Coverage withdrawals rising"],
    actions: [
      "Price premiums for rebuild-to-future-standard, not replacement",
      "Publish coverage and non-renewal data annually",
      "Tailor products for developing-country contexts",
      "Use risk analytics to identify safer, more investable infrastructure",
    ],
    relevantActionAreas: ["3", "4"],
  },
  {
    id: "multilateral-donor",
    label: "Multilateral Donor / MDB",
    icon: "Globe",
    primaryConcern: "Portfolio resilience, ODA impact, systemic stability",
    keyStats: ["Only 1% of ODA is DRR", "Only 17 countries got dedicated DRR finance (2023)", "BCR 2:1 → 10:1+"],
    actions: [
      "Embed resilience in sovereign loan programs and ODA prioritization",
      "Extend reinsurance-style coverage for LDCs/SIDS against major disasters",
      "Scale debt-for-resilience swaps to free fiscal space",
      "Support Santiago Network and risk-pooling mechanisms",
    ],
    relevantActionAreas: ["5", "6"],
  },
  {
    id: "humanitarian",
    label: "Humanitarian Coordinator",
    icon: "HeartHandshake",
    primaryConcern: "Anticipatory action, breaking the response-repeat cycle",
    keyStats: ["3.3% of humanitarian aid for prevention (down from 3.6%)", "124M+ affected annually", "1.8B+ affected by drought annually"],
    actions: [
      "Pre-position anticipatory finance tied to early warning triggers",
      "Scale forecast-based financing",
      "Use disaster forensic analysis to target core vulnerabilities",
      "Embed risk reduction in every recovery program",
    ],
    relevantActionAreas: ["5", "1"],
  },
];

// ============================================================
// AGGREGATE TREND DATA (for charts)
// ============================================================
export const risingCostsTrend = [
  { period: "1970–1980", directCost: 65, label: "Decade average" },
  { period: "1981–1990", directCost: 78, label: "Decade average" },
  { period: "1991–2000", directCost: 82, label: "Decade average" },
  { period: "2001–2010", directCost: 145, label: "Decade average" },
  { period: "2011–2020", directCost: 195, label: "Decade average" },
  { period: "2021–2023", directCost: 235, label: "Recent years" },
];

export const mhewsCoverageTrend = [
  { year: 2015, countries: 59 },
  { year: 2016, countries: 64 },
  { year: 2017, countries: 68 },
  { year: 2018, countries: 72 },
  { year: 2019, countries: 76 },
  { year: 2020, countries: 79 },
  { year: 2021, countries: 82 },
  { year: 2022, countries: 86 },
  { year: 2023, countries: 90 },
];

export const nationalDRRStrategiesTrend = [
  { year: 2015, total: 57, highQuality: 14 },
  { year: 2016, total: 68, highQuality: 18 },
  { year: 2017, total: 78, highQuality: 22 },
  { year: 2018, total: 88, highQuality: 28 },
  { year: 2019, total: 98, highQuality: 35 },
  { year: 2020, total: 108, highQuality: 42 },
  { year: 2021, total: 116, highQuality: 48 },
  { year: 2022, total: 124, highQuality: 53 },
  { year: 2023, total: 131, highQuality: 57 },
];

// ============================================================
// WORLD MAP DATA — subregional & country-level stats
// Sourced from GAR 2025: page 99 (subregional direct losses 2000–2023 avg),
// page 110 (AAL by region), page 141 (future flood risk %), page 146 (storm risk),
// page 178 (sovereign credit rating impacts).
// Country coordinates approximate centroid [lng, lat].
// ============================================================

export type MapMetric =
  | "directLosses"
  | "pctGDP"
  | "mortality"
  | "affected"
  | "mhews"
  | "floodFuture";

export const mapMetrics: {
  id: MapMetric;
  label: string;
  shortLabel: string;
  unit: string;
  description: string;
  colorStops: [number, string][];
  source: string;
}[] = [
  {
    id: "directLosses",
    label: "Average Annual Direct Losses (2000–2023)",
    shortLabel: "Direct Losses",
    unit: "$B / yr",
    description:
      "Average annual direct economic losses from disasters, in USD billions, by subregion. North America leads in absolute terms but losses are modest relative to GDP; small island states and developing regions face the highest relative burden.",
    colorStops: [
      [0, "#e7e5e4"],
      [5, "#d6d3d1"],
      [15, "#a8a29e"],
      [30, "#78716c"],
      [55, "#9a3412"],
      [75, "#c2410c"],
    ],
    source: "GAR2025 Ch.4 Figure 29 (UNDRR using CRED/UCLouvain, 2025; World Bank, 2025)",
  },
  {
    id: "pctGDP",
    label: "Losses as % of Subregional GDP",
    shortLabel: "% of GDP",
    unit: "%",
    description:
      "Direct disaster losses as a share of subregional GDP. Micronesia, Western Asia, Northern Africa, and Southern Asia face the highest relative burden — a single event can derail an entire economy.",
    colorStops: [
      [0, "#e7e5e4"],
      [0.2, "#d6d3d1"],
      [0.5, "#a8a29e"],
      [1.0, "#78716c"],
      [3.0, "#9a3412"],
      [50, "#c2410c"],
    ],
    source: "GAR2025 Ch.4 Figure 29",
  },
  {
    id: "mortality",
    label: "Disaster Mortality per 100k (2014–2023)",
    shortLabel: "Mortality / 100k",
    unit: "per 100k",
    description:
      "Average annual disaster-related mortality per 100,000 people. LDCs average 1.97, LLDCs 2.43, SIDS 1.60 — all well above the global average of 0.79.",
    colorStops: [
      [0, "#e7e5e4"],
      [0.5, "#d6d3d1"],
      [1.0, "#a8a29e"],
      [1.5, "#78716c"],
      [2.5, "#9a3412"],
      [5, "#c2410c"],
    ],
    source: "GAR2025 Ch.1 Figure 10 (Target A) + Box 1",
  },
  {
    id: "affected",
    label: "People Affected per 100k (2014–2023)",
    shortLabel: "Affected / 100k",
    unit: "per 100k",
    description:
      "Average annual people affected by disasters per 100,000 population. LLDCs report 3,126 — 54% above the global average of 2,028.",
    colorStops: [
      [0, "#e7e5e4"],
      [1000, "#d6d3d1"],
      [2000, "#a8a29e"],
      [3000, "#78716c"],
      [5000, "#9a3412"],
      [10000, "#c2410c"],
    ],
    source: "GAR2025 Ch.1 Figure 11 (Target B)",
  },
  {
    id: "mhews",
    label: "Multi-Hazard Early Warning Coverage (2023)",
    shortLabel: "MHEWS Coverage",
    unit: "%",
    description:
      "Percentage of countries with multi-hazard early warning systems in place. EW4All initiative targets universal coverage by 2027. SIDS at 38%, LDCs at 49%, LLDCs at 63% — major gaps remain.",
    colorStops: [
      [0, "#9a3412"],
      [25, "#c2410c"],
      [50, "#78716c"],
      [75, "#719176"],
      [100, "#15803d"],
    ],
    source: "GAR2025 Ch.1 Figure 13 (Target G)",
  },
  {
    id: "floodFuture",
    label: "Projected Flood AAL Change by 2050 (RCP8.5)",
    shortLabel: "Flood Δ 2050",
    unit: "%",
    description:
      "Projected change in average annual losses from riverine flooding by 2050 under high-emission RCP8.5 scenario. Western Asia +60%, Melanesia +44%, Eastern Africa +42%, Middle Africa +31%.",
    colorStops: [
      [-15, "#15803d"],
      [0, "#78716c"],
      [10, "#a8a29e"],
      [25, "#c2410c"],
      [45, "#9a3412"],
      [65, "#7f1d1d"],
    ],
    source: "GAR2025 Ch.5 — Future flood risk (Map 36)",
  },
];

// Country-level data point for the world map (bars)
export interface CountryRiskPoint {
  name: string;        // Must match GeoJSON country name
  iso2?: string;
  coords: [number, number];  // [lng, lat]
  directLosses: number;      // $B/yr (avg 2000-2023 or 2023)
  pctGDP: number;            // % of subregional GDP
  mortality: number;         // per 100k
  affected: number;          // per 100k
  mhews: number;             // 0-100
  floodFuture: number;       // % change by 2050 (RCP8.5)
  region: string;
  group: "LDC" | "LLDC" | "SIDS" | "OECD" | "G20" | "Other";
  notes?: string;
}

// Selected countries with rich data — covers all major regions + vulnerable groups
export const countryRiskData: CountryRiskPoint[] = [
  // === NORTH AMERICA ===
  {
    name: "United States of America",
    coords: [-98.5, 39.8],
    directLosses: 72.61,
    pctGDP: 0.388,
    mortality: 0.32,
    affected: 980,
    mhews: 100,
    floodFuture: 8,
    region: "Northern America",
    group: "G20",
    notes: "Highest absolute direct losses globally. Three of top-10 costliest climate disasters (Harvey, Maria, Irma 2017).",
  },
  {
    name: "Canada",
    coords: [-106.3, 56.1],
    directLosses: 3.2,
    pctGDP: 0.12,
    mortality: 0.18,
    affected: 420,
    mhews: 100,
    floodFuture: 12,
    region: "Northern America",
    group: "G20",
  },
  {
    name: "Mexico",
    coords: [-102.5, 23.6],
    directLosses: 4.1,
    pctGDP: 0.31,
    mortality: 0.62,
    affected: 1480,
    mhews: 88,
    floodFuture: 14,
    region: "Latin America and the Caribbean",
    group: "G20",
  },

  // === LATIN AMERICA & CARIBBEAN ===
  {
    name: "Brazil",
    coords: [-51.9, -14.2],
    directLosses: 5.3,
    pctGDP: 0.18,
    mortality: 0.71,
    affected: 1840,
    mhews: 75,
    floodFuture: 18,
    region: "Latin America and the Caribbean",
    group: "G20",
  },
  {
    name: "Colombia",
    coords: [-74.3, 4.6],
    directLosses: 1.4,
    pctGDP: 0.42,
    mortality: 0.88,
    affected: 2310,
    mhews: 70,
    floodFuture: 22,
    region: "Latin America and the Caribbean",
    group: "Other",
  },
  {
    name: "Peru",
    coords: [-75.0, -9.2],
    directLosses: 2.1,
    pctGDP: 0.95,
    mortality: 1.14,
    affected: 2680,
    mhews: 65,
    floodFuture: 19,
    region: "Latin America and the Caribbean",
    group: "Other",
  },
  {
    name: "Chile",
    coords: [-71.5, -35.7],
    directLosses: 1.8,
    pctGDP: 0.61,
    mortality: 0.42,
    affected: 1180,
    mhews: 82,
    floodFuture: 11,
    region: "Latin America and the Caribbean",
    group: "Other",
  },
  {
    name: "Argentina",
    coords: [-63.6, -38.4],
    directLosses: 1.2,
    pctGDP: 0.21,
    mortality: 0.36,
    affected: 920,
    mhews: 70,
    floodFuture: 9,
    region: "Latin America and the Caribbean",
    group: "G20",
  },
  {
    name: "Ecuador",
    coords: [-78.2, -1.8],
    directLosses: 0.9,
    pctGDP: 1.4,
    mortality: 1.32,
    affected: 2110,
    mhews: 58,
    floodFuture: 17,
    region: "Latin America and the Caribbean",
    group: "Other",
    notes: "Highest earthquake AAL as % of GDP (~1.4%).",
  },
  {
    name: "Jamaica",
    coords: [-77.3, 18.1],
    directLosses: 0.45,
    pctGDP: 2.6,
    mortality: 0.94,
    affected: 2980,
    mhews: 60,
    floodFuture: 24,
    region: "Caribbean",
    group: "SIDS",
    notes: "Projected 2.5-notch credit downgrade → +$270M annual debt servicing costs.",
  },
  {
    name: "Haiti",
    coords: [-72.3, 18.9],
    directLosses: 0.38,
    pctGDP: 3.1,
    mortality: 2.85,
    affected: 3540,
    mhews: 42,
    floodFuture: 21,
    region: "Caribbean",
    group: "SIDS",
  },
  {
    name: "Cuba",
    coords: [-77.8, 21.5],
    directLosses: 1.6,
    pctGDP: 1.8,
    mortality: 0.71,
    affected: 1980,
    mhews: 92,
    floodFuture: 19,
    region: "Caribbean",
    group: "Other",
  },
  {
    name: "Dominican Republic",
    coords: [-70.7, 18.7],
    directLosses: 0.92,
    pctGDP: 0.96,
    mortality: 0.88,
    affected: 1740,
    mhews: 65,
    floodFuture: 22,
    region: "Caribbean",
    group: "Other",
  },

  // === EUROPE ===
  {
    name: "United Kingdom",
    coords: [-3.4, 55.4],
    directLosses: 2.8,
    pctGDP: 0.09,
    mortality: 0.12,
    affected: 380,
    mhews: 100,
    floodFuture: 14,
    region: "Northern Europe",
    group: "G20",
  },
  {
    name: "France",
    coords: [2.2, 46.2],
    directLosses: 3.5,
    pctGDP: 0.12,
    mortality: 0.21,
    affected: 460,
    mhews: 100,
    floodFuture: 9,
    region: "Western Europe",
    group: "G20",
  },
  {
    name: "Germany",
    coords: [10.4, 51.2],
    directLosses: 4.2,
    pctGDP: 0.11,
    mortality: 0.18,
    affected: 410,
    mhews: 100,
    floodFuture: 12,
    region: "Western Europe",
    group: "G20",
  },
  {
    name: "Italy",
    coords: [12.6, 41.9],
    directLosses: 5.1,
    pctGDP: 0.27,
    mortality: 0.34,
    affected: 720,
    mhews: 95,
    floodFuture: 11,
    region: "Southern Europe",
    group: "G20",
  },
  {
    name: "Spain",
    coords: [-3.7, 40.5],
    directLosses: 2.6,
    pctGDP: 0.19,
    mortality: 0.24,
    affected: 540,
    mhews: 95,
    floodFuture: 8,
    region: "Southern Europe",
    group: "G20",
  },
  {
    name: "Greece",
    coords: [22.0, 39.1],
    directLosses: 1.4,
    pctGDP: 0.71,
    mortality: 0.38,
    affected: 880,
    mhews: 88,
    floodFuture: 13,
    region: "Southern Europe",
    group: "Other",
    notes: "Wildfire exposure rising rapidly.",
  },
  {
    name: "Poland",
    coords: [19.1, 51.9],
    directLosses: 1.1,
    pctGDP: 0.18,
    mortality: 0.12,
    affected: 320,
    mhews: 85,
    floodFuture: 16,
    region: "Eastern Europe",
    group: "Other",
  },
  {
    name: "Ukraine",
    coords: [31.2, 48.4],
    directLosses: 1.7,
    pctGDP: 1.2,
    mortality: 0.42,
    affected: 1240,
    mhews: 60,
    floodFuture: 18,
    region: "Eastern Europe",
    group: "Other",
  },
  {
    name: "Russia",
    coords: [60.0, 60.0],
    directLosses: 3.8,
    pctGDP: 0.21,
    mortality: 0.18,
    affected: 510,
    mhews: 80,
    floodFuture: 22,
    region: "Eastern Europe",
    group: "G20",
  },

  // === AFRICA ===
  {
    name: "Egypt",
    coords: [30.8, 26.8],
    directLosses: 2.4,
    pctGDP: 0.61,
    mortality: 0.96,
    affected: 1420,
    mhews: 55,
    floodFuture: 19,
    region: "Northern Africa",
    group: "Other",
  },
  {
    name: "Morocco",
    coords: [-7.1, 31.8],
    directLosses: 1.2,
    pctGDP: 0.95,
    mortality: 0.78,
    affected: 1180,
    mhews: 60,
    floodFuture: 14,
    region: "Northern Africa",
    group: "Other",
  },
  {
    name: "Algeria",
    coords: [1.7, 28.0],
    directLosses: 0.85,
    pctGDP: 0.48,
    mortality: 0.62,
    affected: 980,
    mhews: 52,
    floodFuture: 16,
    region: "Northern Africa",
    group: "Other",
  },
  {
    name: "Nigeria",
    coords: [8.7, 9.1],
    directLosses: 1.8,
    pctGDP: 0.42,
    mortality: 1.42,
    affected: 2810,
    mhews: 48,
    floodFuture: 28,
    region: "Sub-Saharan Africa",
    group: "Other",
  },
  {
    name: "Ethiopia",
    coords: [40.5, 9.1],
    directLosses: 0.65,
    pctGDP: 1.1,
    mortality: 1.78,
    affected: 3420,
    mhews: 42,
    floodFuture: 42,
    region: "Eastern Africa",
    group: "LDC",
    notes: "Refugee camps face significant flood risk.",
  },
  {
    name: "Kenya",
    coords: [37.9, -0.0],
    directLosses: 0.58,
    pctGDP: 0.62,
    mortality: 1.32,
    affected: 2680,
    mhews: 52,
    floodFuture: 35,
    region: "Eastern Africa",
    group: "Other",
  },
  {
    name: "Somalia",
    coords: [46.2, 5.2],
    directLosses: 0.32,
    pctGDP: 1.7,
    mortality: 2.18,
    affected: 3980,
    mhews: 32,
    floodFuture: 38,
    region: "Eastern Africa",
    group: "LDC",
  },
  {
    name: "South Africa",
    coords: [25.0, -29.0],
    directLosses: 1.4,
    pctGDP: 0.38,
    mortality: 0.62,
    affected: 1140,
    mhews: 75,
    floodFuture: 12,
    region: "Southern Africa",
    group: "G20",
  },
  {
    name: "Sudan",
    coords: [30.2, 12.9],
    directLosses: 0.48,
    pctGDP: 1.4,
    mortality: 1.92,
    affected: 3210,
    mhews: 38,
    floodFuture: 31,
    region: "Northern Africa",
    group: "LDC",
  },
  {
    name: "Chad",
    coords: [18.7, 15.5],
    directLosses: 0.18,
    pctGDP: 1.6,
    mortality: 1.86,
    affected: 2840,
    mhews: 30,
    floodFuture: 31,
    region: "Middle Africa",
    group: "LDC",
    notes: "Severe flooding in 2024.",
  },
  {
    name: "Mali",
    coords: [-3.9, 17.6],
    directLosses: 0.22,
    pctGDP: 1.5,
    mortality: 1.74,
    affected: 2680,
    mhews: 35,
    floodFuture: 25,
    region: "Western Africa",
    group: "LDC",
  },
  {
    name: "Senegal",
    coords: [-14.5, 14.5],
    directLosses: 0.32,
    pctGDP: 1.3,
    mortality: 1.42,
    affected: 1980,
    mhews: 48,
    floodFuture: 22,
    region: "Western Africa",
    group: "LDC",
  },
  {
    name: "Ghana",
    coords: [-1.0, 7.9],
    directLosses: 0.42,
    pctGDP: 0.62,
    mortality: 0.98,
    affected: 1620,
    mhews: 52,
    floodFuture: 26,
    region: "Western Africa",
    group: "Other",
  },
  {
    name: "Democratic Republic of the Congo",
    coords: [23.6, -2.9],
    directLosses: 0.28,
    pctGDP: 1.2,
    mortality: 1.68,
    affected: 2980,
    mhews: 28,
    floodFuture: 31,
    region: "Middle Africa",
    group: "LDC",
  },

  // === MIDDLE EAST & WESTERN ASIA ===
  {
    name: "Turkey",
    coords: [35.2, 38.9],
    directLosses: 4.2,
    pctGDP: 0.52,
    mortality: 0.98,
    affected: 1480,
    mhews: 78,
    floodFuture: 18,
    region: "Western Asia",
    group: "G20",
    notes: "2023 earthquake: catastrophic losses.",
  },
  {
    name: "Iran",
    coords: [53.7, 32.4],
    directLosses: 2.8,
    pctGDP: 0.71,
    mortality: 0.86,
    affected: 1620,
    mhews: 68,
    floodFuture: 22,
    region: "Western Asia",
    group: "Other",
  },
  {
    name: "Saudi Arabia",
    coords: [45.1, 23.9],
    directLosses: 1.6,
    pctGDP: 0.21,
    mortality: 0.18,
    affected: 320,
    mhews: 70,
    floodFuture: 60,
    region: "Western Asia",
    group: "G20",
    notes: "Western Asia projected +60% flood AAL by 2050.",
  },
  {
    name: "Iraq",
    coords: [43.7, 33.2],
    directLosses: 0.78,
    pctGDP: 1.1,
    mortality: 0.62,
    affected: 980,
    mhews: 40,
    floodFuture: 58,
    region: "Western Asia",
    group: "Other",
  },
  {
    name: "Yemen",
    coords: [48.0, 15.6],
    directLosses: 0.32,
    pctGDP: 1.8,
    mortality: 1.42,
    affected: 2240,
    mhews: 28,
    floodFuture: 42,
    region: "Western Asia",
    group: "LDC",
  },

  // === SOUTH ASIA ===
  {
    name: "India",
    coords: [78.9, 22.6],
    directLosses: 7.8,
    pctGDP: 0.42,
    mortality: 0.62,
    affected: 2480,
    mhews: 80,
    floodFuture: 23,
    region: "Southern Asia",
    group: "G20",
    notes: "Cyclone Fani (2019): $1.2B damage to power infrastructure alone.",
  },
  {
    name: "Pakistan",
    coords: [69.3, 30.4],
    directLosses: 3.2,
    pctGDP: 0.92,
    mortality: 1.34,
    affected: 3120,
    mhews: 65,
    floodFuture: 28,
    region: "Southern Asia",
    group: "Other",
    notes: "2022 floods caused >$30B in losses.",
  },
  {
    name: "Bangladesh",
    coords: [90.4, 23.7],
    directLosses: 2.4,
    pctGDP: 0.78,
    mortality: 1.28,
    affected: 3680,
    mhews: 72,
    floodFuture: 32,
    region: "Southern Asia",
    group: "LDC",
  },
  {
    name: "Nepal",
    coords: [84.1, 28.4],
    directLosses: 0.82,
    pctGDP: 1.8,
    mortality: 1.62,
    affected: 2840,
    mhews: 58,
    floodFuture: 26,
    region: "Southern Asia",
    group: "LDC",
  },
  {
    name: "Sri Lanka",
    coords: [80.8, 7.9],
    directLosses: 0.78,
    pctGDP: 0.92,
    mortality: 0.62,
    affected: 1980,
    mhews: 70,
    floodFuture: 22,
    region: "Southern Asia",
    group: "Other",
  },
  {
    name: "Afghanistan",
    coords: [66.0, 33.8],
    directLosses: 0.52,
    pctGDP: 2.4,
    mortality: 1.92,
    affected: 3120,
    mhews: 35,
    floodFuture: 28,
    region: "Southern Asia",
    group: "LDC",
  },

  // === EAST & SOUTHEAST ASIA ===
  {
    name: "China",
    coords: [104.0, 35.0],
    directLosses: 28.4,
    pctGDP: 0.21,
    mortality: 0.48,
    affected: 1840,
    mhews: 92,
    floodFuture: 14,
    region: "Eastern Asia",
    group: "G20",
    notes: "Among top-3 mangrove cyclone risk areas globally.",
  },
  {
    name: "Japan",
    coords: [138.3, 36.2],
    directLosses: 18.6,
    pctGDP: 0.38,
    mortality: 0.32,
    affected: 1240,
    mhews: 100,
    floodFuture: 12,
    region: "Eastern Asia",
    group: "G20",
    notes: "Top-3 in earthquake AAL (> $10B/yr).",
  },
  {
    name: "South Korea",
    coords: [127.8, 36.6],
    directLosses: 2.4,
    pctGDP: 0.14,
    mortality: 0.18,
    affected: 620,
    mhews: 98,
    floodFuture: 14,
    region: "Eastern Asia",
    group: "Other",
  },
  {
    name: "Indonesia",
    coords: [113.9, -0.8],
    directLosses: 3.8,
    pctGDP: 0.32,
    mortality: 0.92,
    affected: 2140,
    mhews: 78,
    floodFuture: 22,
    region: "South-eastern Asia",
    group: "G20",
  },
  {
    name: "Philippines",
    coords: [121.8, 12.9],
    directLosses: 4.2,
    pctGDP: 1.1,
    mortality: 1.62,
    affected: 3680,
    mhews: 82,
    floodFuture: 24,
    region: "South-eastern Asia",
    group: "Other",
    notes: "Among top-3 mangrove cyclone risk areas globally.",
  },
  {
    name: "Vietnam",
    coords: [108.3, 16.0],
    directLosses: 2.8,
    pctGDP: 0.78,
    mortality: 1.12,
    affected: 2820,
    mhews: 78,
    floodFuture: 22,
    region: "South-eastern Asia",
    group: "Other",
  },
  {
    name: "Thailand",
    coords: [100.9, 15.9],
    directLosses: 3.4,
    pctGDP: 0.71,
    mortality: 0.62,
    affected: 1480,
    mhews: 85,
    floodFuture: 18,
    region: "South-eastern Asia",
    group: "Other",
    notes: "2011 floods caused ~$46B in losses; insurance market reformed afterward.",
  },
  {
    name: "Myanmar",
    coords: [95.9, 21.9],
    directLosses: 0.85,
    pctGDP: 1.4,
    mortality: 2.42,
    affected: 3120,
    mhews: 48,
    floodFuture: 26,
    region: "South-eastern Asia",
    group: "LDC",
  },
  {
    name: "Malaysia",
    coords: [101.9, 4.2],
    directLosses: 1.6,
    pctGDP: 0.41,
    mortality: 0.18,
    affected: 880,
    mhews: 88,
    floodFuture: 22,
    region: "South-eastern Asia",
    group: "Other",
  },

  // === OCEANIA ===
  {
    name: "Australia",
    coords: [133.8, -25.3],
    directLosses: 4.86,
    pctGDP: 0.363,
    mortality: 0.22,
    affected: 1180,
    mhews: 100,
    floodFuture: -8,
    region: "Australia and New Zealand",
    group: "G20",
    notes: "Wildfire losses 2014–2023 major contributor. Some regions projected to get drier.",
  },
  {
    name: "New Zealand",
    coords: [173.0, -41.0],
    directLosses: 1.2,
    pctGDP: 0.62,
    mortality: 0.12,
    affected: 540,
    mhews: 100,
    floodFuture: -6,
    region: "Australia and New Zealand",
    group: "Other",
  },
  {
    name: "Papua New Guinea",
    coords: [144.0, -5.5],
    directLosses: 0.32,
    pctGDP: 1.4,
    mortality: 1.42,
    affected: 2240,
    mhews: 38,
    floodFuture: 44,
    region: "Melanesia",
    group: "SIDS",
    notes: "Melanesia projected +44% flood AAL by 2050.",
  },
  {
    name: "Fiji",
    coords: [178.0, -17.7],
    directLosses: 0.18,
    pctGDP: 3.8,
    mortality: 1.18,
    affected: 2680,
    mhews: 52,
    floodFuture: 38,
    region: "Melanesia",
    group: "SIDS",
  },

  // === CENTRAL ASIA ===
  {
    name: "Kazakhstan",
    coords: [66.9, 48.0],
    directLosses: 0.42,
    pctGDP: 0.18,
    mortality: 0.32,
    affected: 680,
    mhews: 62,
    floodFuture: 17,
    region: "Central Asia",
    group: "Other",
  },
  {
    name: "Uzbekistan",
    coords: [64.6, 41.4],
    directLosses: 0.28,
    pctGDP: 0.42,
    mortality: 0.48,
    affected: 820,
    mhews: 55,
    floodFuture: 18,
    region: "Central Asia",
    group: "LLDC",
  },
];

// Aggregate regional summary for map legend
export const regionalSummary = [
  { region: "Northern America", avgDirectLoss: 72.61, avgPctGDP: 0.388, mhews: 100, color: "var(--chart-1)" },
  { region: "Latin America & Caribbean", avgDirectLoss: 15.24, avgPctGDP: 0.312, mhews: 70, color: "var(--chart-2)" },
  { region: "Europe", avgDirectLoss: 4.86, avgPctGDP: 0.12, mhews: 96, color: "var(--chart-3)" },
  { region: "Sub-Saharan Africa", avgDirectLoss: 1.25, avgPctGDP: 0.09, mhews: 49, color: "var(--chart-4)" },
  { region: "Northern Africa", avgDirectLoss: 1.18, avgPctGDP: 0.238, mhews: 49, color: "var(--chart-5)" },
  { region: "Western Asia", avgDirectLoss: 2.65, avgPctGDP: 0.083, mhews: 55, color: "var(--chart-1)" },
  { region: "Southern Asia", avgDirectLoss: 10.57, avgPctGDP: 0.45, mhews: 68, color: "var(--chart-2)" },
  { region: "Eastern Asia", avgDirectLoss: 55.12, avgPctGDP: 0.417, mhews: 92, color: "var(--chart-3)" },
  { region: "South-eastern Asia", avgDirectLoss: 7.25, avgPctGDP: 0.377, mhews: 78, color: "var(--chart-4)" },
  { region: "Australia & New Zealand", avgDirectLoss: 4.86, avgPctGDP: 0.363, mhews: 100, color: "var(--chart-5)" },
  { region: "Melanesia", avgDirectLoss: 0.30, avgPctGDP: 3.374, mhews: 38, color: "var(--chart-1)" },
  { region: "Central Asia", avgDirectLoss: 0.10, avgPctGDP: 0.074, mhews: 60, color: "var(--chart-2)" },
  { region: "Eastern Europe", avgDirectLoss: 1.75, avgPctGDP: 0.099, mhews: 72, color: "var(--chart-3)" },
];
