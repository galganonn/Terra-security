"use client";

import Image from "next/image";
import { useState } from "react";

type SeverityLevel = "critical" | "high" | "medium" | "none" | "pending" | "scoped";

const severityColors: Record<SeverityLevel, { dot: string; dotOuter: string; accent: string }> = {
  critical: { dot: "#FF7575", dotOuter: "#FFBABA", accent: "#df2f4a" },
  high: { dot: "#FDAB3D", dotOuter: "#FDD9A5", accent: "#fea03f" },
  medium: { dot: "#FFD633", dotOuter: "#FFEEAA", accent: "#ffd633" },
  none: { dot: "#00C875", dotOuter: "#99E8C5", accent: "#00c875" },
  pending: { dot: "#579BFC", dotOuter: "#B5D2FE", accent: "#579bfc" },
  scoped: { dot: "#676879", dotOuter: "#B8B9C4", accent: "#676879" },
};

const chipColors: Record<string, { bg: string; border: string; text: string }> = {
  Critical: { bg: "#ffffff", border: "#df2f4a", text: "#df2f4a" },
  High: { bg: "#ffffff", border: "#fea03f", text: "#fea340" },
  Medium: { bg: "#ffffff", border: "#ffd633", text: "#db962f" },
};

const methodColors: Record<string, { bg: string; text: string }> = {
  POST: { bg: "#f4f3ff", text: "#6221e6" },
  GET: { bg: "#eef5ff", text: "#004aaf" },
  PUT: { bg: "#fff8e6", text: "#946800" },
  DELETE: { bg: "#fde6e9", text: "#df2f4a" },
  PATCH: { bg: "#e6f9f0", text: "#007a3d" },
};

type Endpoint = {
  method: string;
  path: string;
  description: string;
  chip: { label: string; level: string };
  assignment: { name: string; avatar?: string } | null;
};

type SubItem = {
  name: string;
  accentColor: string;
  chips: { label: string; level: string }[];
  pendingEndpoints?: number;
  endpoints?: Endpoint[];
};

type PageCard = {
  name: string;
  features: number;
  endpoints: number;
  chips: { label: string; level: string }[];
  score: string;
  total: string;
  progressPercent: number;
  time: string;
  badge?: string;
  showInfoIcon?: boolean;
  tooltip?: string;
  subItems?: SubItem[];
};

function getProgressColor(percent: number): string {
  if (percent === 0) return "#c3c6d4";
  if (percent < 75) return "#fdab3d";
  return "#00c875";
}

const criticalPages: PageCard[] = [
  {
    name: "Checkout",
    features: 4,
    endpoints: 24,
    chips: [
      { label: "1 Critical", level: "Critical" },
      { label: "1 High", level: "High" },
      { label: "1 Medium", level: "Medium" },
    ],
    score: "18",
    total: "/24",
    progressPercent: 75,
    time: "6 hr ago",
    subItems: [
      {
        name: "Payment process",
        accentColor: "#df2f4a",
        chips: [
          { label: "1 Critical", level: "Critical" },
          { label: "1 High", level: "High" },
        ],
        endpoints: [
          {
            method: "POST",
            path: "/api/v2/users/invite",
            description: "Authentication bypass",
            chip: { label: "1 Critical", level: "Critical" },
            assignment: null,
          },
          {
            method: "GET",
            path: "/api/v2/promo/:code",
            description: "Valid codes can be enumerated",
            chip: { label: "1 High", level: "High" },
            assignment: { name: "Assigned to Maya K", avatar: "/icons/avatar-maya.png" },
          },
        ],
      },
      {
        name: "Promo code apply",
        accentColor: "#fea03f",
        chips: [{ label: "1 High", level: "High" }],
        pendingEndpoints: 2,
      },
      {
        name: "Order summary display",
        accentColor: "#ffd633",
        chips: [{ label: "1 Medium", level: "Medium" }],
        pendingEndpoints: 4,
      },
    ],
  },
  {
    name: "User management",
    features: 2,
    endpoints: 13,
    chips: [
      { label: "1 Critical", level: "Critical" },
      { label: "2 High", level: "High" },
    ],
    score: "6",
    total: "/13",
    progressPercent: 46,
    time: "1 day ago",
  },
];

const highPages: PageCard[] = [
  {
    name: "Account settings",
    features: 5,
    endpoints: 20,
    chips: [
      { label: "2 High", level: "High" },
      { label: "2 Medium", level: "Medium" },
    ],
    score: "9",
    total: "/20",
    progressPercent: 45,
    time: "3 hr ago",
  },
  {
    name: "Search results",
    features: 2,
    endpoints: 15,
    chips: [
      { label: "1 High", level: "High" },
      { label: "1 Medium", level: "Medium" },
    ],
    score: "12",
    total: "/15",
    progressPercent: 80,
    time: "12 hr ago",
  },
  {
    name: "Order history",
    features: 3,
    endpoints: 11,
    chips: [{ label: "1 High", level: "High" }],
    score: "4",
    total: "/11",
    progressPercent: 36,
    time: "Yesterday",
  },
];

const mediumPages: PageCard[] = [
  {
    name: "Product page",
    features: 6,
    endpoints: 18,
    chips: [{ label: "2 Medium", level: "Medium" }],
    score: "11",
    total: "/18",
    progressPercent: 61,
    time: "4 hr ago",
  },
  {
    name: "Sign in",
    features: 2,
    endpoints: 9,
    chips: [{ label: "2 Medium", level: "Medium" }],
    score: "6",
    total: "/9",
    progressPercent: 67,
    time: "2 days ago",
  },
];

const nonePages: PageCard[] = [
  {
    name: "Cart",
    features: 3,
    endpoints: 8,
    chips: [],
    score: "8",
    total: "/8",
    progressPercent: 100,
    time: "1 hr ago",
  },
];

const pendingPages: PageCard[] = [
  {
    name: "Help center",
    features: 1,
    endpoints: 4,
    chips: [],
    score: "0",
    total: "/4",
    progressPercent: 0,
    time: "Not yet",
    badge: "New page",
    showInfoIcon: true,
    tooltip: "skipped- could disrupt live payment flow",
  },
];

const scopedPages: PageCard[] = [
  {
    name: "Partner portal",
    features: 1,
    endpoints: 2,
    chips: [],
    score: "0",
    total: "/18",
    progressPercent: 0,
    time: "Out of scope",
    showInfoIcon: true,
    tooltip: "excluded — internal-only portal, not customer-facing",
  },
];

export default function PagesSection() {
  return (
    <div className="px-10 pt-14 pb-8">
      <h2 className="font-[family-name:var(--font-poppins)] text-[16px] font-semibold leading-[24px] text-primary-text">
        Pages
      </h2>

      <div className="mt-6 bg-white rounded-2xl overflow-hidden">
        <div className="px-6 pt-6">
          <FilterBar />
        </div>

        <div className="px-6 pt-4 pb-6 flex flex-col gap-8">
          <SeverityGroup label="Critical" count={2} severity="critical" cards={criticalPages} />
          <SeverityGroup label="High" count={3} severity="high" cards={highPages} />
          <SeverityGroup label="Medium" count={2} severity="medium" cards={mediumPages} />
          <SeverityGroup label="None found" count={1} severity="none" cards={nonePages} />
          <SeverityGroup label="Pending" count={1} severity="pending" cards={pendingPages} />
          <SeverityGroup label="Scoped out" count={1} severity="scoped" cards={scopedPages} />
        </div>
      </div>
    </div>
  );
}

function FilterBar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <button className="relative z-10 flex items-center justify-center h-8 px-2 bg-[#cce4ff] border border-[#0073ea] rounded-l text-[14px] leading-5 font-normal text-primary-text cursor-pointer whitespace-nowrap">
          All / 28
        </button>
        <button className="flex items-center justify-center h-8 px-2 border border-[#c3c6d4] -ml-px text-[14px] leading-5 font-normal cursor-pointer whitespace-nowrap">
          <span className="text-primary-text">With findings</span>
          <span className="text-secondary-text">&nbsp;/ 7</span>
        </button>
        <button className="flex items-center justify-center h-8 px-2 border border-[#c3c6d4] -ml-px text-[14px] leading-5 font-normal cursor-pointer whitespace-nowrap">
          <span className="text-primary-text">Not fully tested</span>
          <span className="text-secondary-text">&nbsp;/ 11</span>
        </button>
        <button className="flex items-center justify-center h-8 px-2 border border-[#c3c6d4] -ml-px rounded-r text-[14px] leading-5 font-normal cursor-pointer whitespace-nowrap">
          <span className="text-primary-text">Changed this week</span>
          <span className="text-secondary-text">&nbsp;/ 5</span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 w-[320px] h-8 pl-2 pr-1 py-1 bg-white border border-[#c3c6d4] rounded cursor-pointer">
          <Image src="/icons/search.svg" alt="" width={16} height={16} />
          <span className="flex-1 text-[14px] leading-5 font-normal text-secondary-text text-left truncate">
            Search
          </span>
        </button>
        <button className="flex items-center justify-center w-8 h-8 border border-[#c3c6d4] rounded cursor-pointer">
          <Image src="/icons/filter.svg" alt="" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}

function SeverityGroup({
  label,
  count,
  severity,
  cards,
}: {
  label: string;
  count: number;
  severity: SeverityLevel;
  cards: PageCard[];
}) {
  const colors = severityColors[severity];

  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex items-center gap-2">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
          <circle opacity="0.7" cx="6" cy="6" r="6" fill={colors.dotOuter} fillOpacity="0.4" />
          <circle cx="6" cy="6" r="3.6" fill={colors.dot} />
        </svg>
        <span className="text-[16px] font-semibold leading-[22px] text-primary-text">
          {label}
        </span>
        <div className="flex items-center justify-center h-6 px-2 bg-[#e7e9ef] rounded-full">
          <span className="text-[14px] leading-5 font-normal text-primary-text">
            {count}
          </span>
        </div>
        <button className="flex items-center justify-center pl-[9px] pr-[2px] cursor-pointer">
          <Image src="/icons/chevron-down.svg" alt="" width={18} height={30} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {cards.map((card) => (
          <PageCardItem
            key={card.name}
            card={card}
            accentColor={colors.accent}
          />
        ))}
      </div>
    </div>
  );
}

function PageCardItem({
  card,
  accentColor,
}: {
  card: PageCard;
  accentColor: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubItems = card.subItems && card.subItems.length > 0;

  return (
    <div
      className={`flex items-start rounded-xl cursor-pointer transition-all duration-200 ease-in-out ${
        isExpanded
          ? "border border-[#d0d4e4] shadow-[0px_20px_50px_10px_rgba(1,116,235,0.1)] backdrop-blur-[12px]"
          : "border-[0.5px] border-layout-border bg-white hover:border-[#c5c9d8] hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.07)]"
      }`}
      style={
        isExpanded
          ? {
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.5) 4.19%, rgba(236,239,248,0.5) 50.12%)",
            }
          : {}
      }
      onClick={() => hasSubItems && setIsExpanded((prev) => !prev)}
    >
      <div
        className="w-1 self-stretch rounded-l-xl shrink-0"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex flex-col flex-1 min-w-0">
        {/* Header row — identical in both states */}
        <div className="flex items-center gap-4 pl-5 pr-4 py-[14px]">
          <div className="w-[92px] h-[49px] bg-[#dfe6ff] rounded shrink-0 flex items-center justify-center overflow-hidden">
            <FormThumbnail />
          </div>

          <div className="flex flex-1 items-center gap-3 min-w-0">
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-semibold leading-[22px] text-primary-text truncate">
                  {card.name}
                </span>
                {card.showInfoIcon && <InfoTooltip text={card.tooltip} />}
                {card.badge && (
                  <span className="text-[12px] leading-4 font-normal text-[#579bfc] bg-[#cce4ff] rounded px-1 py-1 whitespace-nowrap">
                    {card.badge}
                  </span>
                )}
              </div>
              <div className="h-[3px]" />
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Image src="/icons/apps.svg" alt="" width={16} height={16} />
                  <span className="text-[12px] leading-4 font-normal text-secondary-text whitespace-nowrap">
                    {card.features} features
                  </span>
                </div>
                <div className="w-[0.5px] h-[14px] bg-[#cbd5e1]" />
                <div className="flex items-center gap-1">
                  <Image src="/icons/branch.svg" alt="" width={16} height={16} />
                  <span className="text-[12px] leading-4 font-normal text-secondary-text whitespace-nowrap">
                    {card.endpoints} endpoints
                  </span>
                </div>
                {card.chips.length > 0 && !isExpanded && (
                  <>
                    <div className="w-[0.5px] h-[14px] bg-[#cbd5e1]" />
                    <div className="flex items-center gap-3">
                      {card.chips.map((chip) => (
                        <PriorityChip
                          key={chip.label}
                          label={chip.label}
                          level={chip.level}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center shrink-0 w-[220px] justify-end gap-8">
              <div className="flex items-center gap-2 w-[80px]">
                <ProgressRing percent={card.progressPercent} />
                <span className="text-[12px] leading-4 font-normal text-secondary-text whitespace-nowrap">
                  <span>{card.score}</span>
                  <span className="text-secondary-text/70">{card.total}</span>
                </span>
              </div>
              <div className="flex items-center gap-1 w-[100px]">
                <Image src="/icons/time.svg" alt="" width={16} height={16} />
                <span className="text-[12px] leading-4 font-normal text-secondary-text whitespace-nowrap">
                  {card.time}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-8 h-8 rounded shrink-0 self-center -mt-[4px]">
            <Image
              src="/icons/chevron-down.svg"
              alt=""
              width={20}
              height={20}
              className={`transition-transform duration-300 ease-in-out ${
                isExpanded ? "rotate-0" : "-rotate-90"
              }`}
            />
          </div>
        </div>

        {/* Animated expanded content */}
        {hasSubItems && (
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
              isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden">
              <div className="px-5 pb-4">
                <div className="h-px w-full bg-layout-border mb-2" />
                <div className="flex flex-col gap-2">
                  {card.subItems?.map((item) => (
                    <SubItemCard key={item.name} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SubItemCard({ item }: { item: SubItem }) {
  const [expanded, setExpanded] = useState(false);
  const hasEndpoints = item.endpoints && item.endpoints.length > 0;

  if (expanded && hasEndpoints) {
    return (
      <div className="flex items-start overflow-hidden rounded-[12px] bg-white">
        <div
          className="w-[3px] self-stretch rounded-l-[12px] shrink-0"
          style={{ backgroundColor: item.accentColor }}
        />
        <div className="flex flex-col flex-1 gap-4 pb-4 min-w-0">
          {/* Header — clicking collapses */}
          <div
            className="flex items-center justify-between pl-5 pr-4 py-[14px] cursor-pointer"
            onClick={() => setExpanded(false)}
          >
            <span className="text-[16px] font-semibold leading-[22px] text-primary-text whitespace-nowrap">
              {item.name}
            </span>
            <div className="flex items-center justify-center w-8 h-8 rounded shrink-0">
              <Image src="/icons/chevron-down.svg" alt="" width={20} height={20} />
            </div>
          </div>

          {/* Divider */}
          <div className="px-5 -mt-2" onClick={(e) => e.stopPropagation()}>
            <div className="h-px w-full bg-layout-border" />
          </div>

          {/* Endpoint rows */}
          <div className="flex flex-col gap-4 px-5" onClick={(e) => e.stopPropagation()}>
            {item.endpoints!.map((ep) => (
              <EndpointRow key={ep.path} endpoint={ep} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start overflow-hidden rounded-[12px] bg-white transition-shadow duration-150 ${hasEndpoints ? "cursor-pointer hover:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]" : ""}`}
      onClick={hasEndpoints ? () => setExpanded(true) : undefined}
    >
      <div
        className="w-[3px] self-stretch rounded-l-[12px] shrink-0"
        style={{ backgroundColor: item.accentColor }}
      />
      <div className="flex flex-1 items-center justify-between pl-5 pr-4 py-[14px] min-w-0">
        <span className="text-[16px] font-semibold leading-[22px] text-primary-text whitespace-nowrap">
          {item.name}
        </span>

        <div className="flex items-center gap-2 shrink-0">
          {item.chips.map((chip) => (
            <PriorityChip key={chip.label} label={chip.label} level={chip.level} />
          ))}
          {item.pendingEndpoints != null && item.pendingEndpoints > 0 && (
            <>
              <div className="w-[0.5px] h-[14px] bg-[#cbd5e1]" />
              <div className="flex items-center gap-1 py-[6px]">
                <Image src="/icons/minus-round.svg" alt="" width={16} height={16} />
                <span className="text-[12px] leading-4 font-normal text-secondary-text whitespace-nowrap">
                  {item.pendingEndpoints} Pending endpoints{" "}
                </span>
              </div>
            </>
          )}

          <div className="flex items-center justify-center w-8 h-8 rounded shrink-0 ml-2">
            <Image src="/icons/chevron-right-gray.svg" alt="" width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

function EndpointRow({ endpoint }: { endpoint: Endpoint }) {
  const mColors = methodColors[endpoint.method] || methodColors.GET;

  return (
    <div className="flex items-center justify-between">
      {/* Left: method + path + description */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center h-6 px-2 rounded-lg shrink-0"
            style={{ backgroundColor: mColors.bg }}
          >
            <span
              className="text-[14px] leading-5 font-semibold whitespace-nowrap"
              style={{ color: mColors.text }}
            >
              {endpoint.method}
            </span>
          </div>
          <span className="text-[14px] leading-5 font-normal text-primary-text whitespace-nowrap">
            {endpoint.path}
          </span>
        </div>
        <div className="flex items-center gap-1 h-6 px-2 py-px bg-[#e7e9ef] rounded">
          <Image src="/icons/idea.svg" alt="" width={16} height={16} />
          <span className="text-[14px] leading-5 font-normal text-primary-text whitespace-nowrap">
            {endpoint.description}
          </span>
        </div>
      </div>

      {/* Right: chip + assignment + chevron */}
      <div className="flex items-center gap-[30px] shrink-0">
        <div className="flex items-center gap-2">
          <PriorityChip label={endpoint.chip.label} level={endpoint.chip.level} />
          <div className="w-[0.5px] h-[14px] bg-[#cbd5e1]" />
          {endpoint.assignment === null ? (
            <div className="flex items-center gap-1">
              <Image src="/icons/dot-gray.svg" alt="" width={6} height={6} />
              <span className="font-[family-name:var(--font-poppins)] text-[11px] font-normal text-secondary-text whitespace-nowrap">
                Not assigned
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 h-[30px] px-2 bg-[#f6f7fb] border border-[#d0d4e4] rounded-full">
              {endpoint.assignment.avatar && (
                <Image
                  src={endpoint.assignment.avatar}
                  alt=""
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px] rounded-full object-cover shrink-0"
                />
              )}
              <span className="text-[12px] leading-4 font-normal text-primary-text whitespace-nowrap">
                {endpoint.assignment.name}
              </span>
            </div>
          )}
        </div>
        <button className="flex items-center justify-center w-4 h-4 rounded shrink-0 cursor-pointer">
          <Image src="/icons/chevron-right-gray.svg" alt="" width={14} height={14} />
        </button>
      </div>
    </div>
  );
}

function InfoTooltip({ text }: { text?: string }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative shrink-0"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Image src="/icons/info.svg" alt="" width={16} height={16} className="cursor-pointer" />
      {show && text && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+6px)] z-50 flex flex-col items-center">
          <div
            className="bg-[#323338] rounded max-w-[240px] px-4 py-2"
            style={{ boxShadow: "0px 4px 8px rgba(0,0,0,0.2)" }}
          >
            <p className="text-[14px] leading-5 font-normal text-white">
              {text}
            </p>
          </div>
          <svg width="240" height="8" viewBox="0 0 240 8" fill="none" className="shrink-0">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M112 0H128L121.33 7.39188C120.595 8.20593 119.399 8.19947 118.67 7.39188L112 0Z"
              fill="#323338"
            />
          </svg>
        </div>
      )}
    </div>
  );
}


function PriorityChip({ label, level }: { label: string; level: string }) {
  const colors = chipColors[level] || chipColors.Medium;
  return (
    <div className="flex items-start">
      <div
        className="w-1 h-6 rounded-l shrink-0"
        style={{ backgroundColor: colors.border }}
      />
      <div
        className="flex items-center h-6 pl-1.5 pr-2 py-px rounded-r border-t border-r border-b"
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
        }}
      >
        <span
          className="text-[12px] leading-4 font-normal whitespace-nowrap"
          style={{ color: colors.text }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function ProgressRing({ percent }: { percent: number }) {
  const color = getProgressColor(percent);
  const radius = 11;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  const fontSize = percent === 100 ? "6.5px" : "8px";

  return (
    <div className="relative w-8 h-8 shrink-0">
      <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
        <circle
          cx="16"
          cy="16"
          r={radius}
          fill="none"
          stroke="#e6e8ef"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="16"
          cy="16"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-poppins)] font-medium"
        style={{ color, fontSize }}
      >
        {percent}%
      </span>
    </div>
  );
}

function FormThumbnail() {
  return (
    <svg
      width="92"
      height="49"
      viewBox="0 0 91.7 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="thumb-clip"><rect width="91.7" height="49" rx="4" /></clipPath>
      <g clipPath="url(#thumb-clip)">
        <rect width="91.7" height="49" rx="4" fill="#DFE6FF" />
        <path d="M19.95 11.647c0-.924.749-1.672 1.672-1.672H55.825l4.2 11.025 11.9 4.725v24.228c0 .924-.749 1.672-1.672 1.672H21.622a1.672 1.672 0 0 1-1.672-1.672V11.647z" fill="white" />
        <path d="M57.497 25.725h14.428L55.825 9.975v14.078c0 .923.749 1.672 1.672 1.672z" fill="#ECEFF8" />
        <path fillRule="evenodd" clipRule="evenodd" d="M42.35 14.982H24.15v-.914h18.2v.914z" fill="#CBDDFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M34.3 20.309H24.15v-.368H34.3v.368z" fill="#181B34" />
        <path d="M25.305 23.232c.127-.265.504-.265.631 0l.23.48a.7.7 0 0 0 .499.195l.527.071c.291.04.407.398.195.6l-.385.368a.7.7 0 0 0-.103.316l.095.523c.053.289-.252.51-.51.371l-.468-.253a.7.7 0 0 0-.332 0l-.468.253c-.258.14-.563-.082-.51-.371l.095-.523a.7.7 0 0 0-.103-.316l-.385-.367c-.212-.203-.096-.561.195-.6l.527-.071a.7.7 0 0 0 .5-.196l.23-.48z" fill="#FFCC00" />
        <path d="M29.645 23.232c.127-.265.504-.265.63 0l.231.48a.7.7 0 0 0 .499.195l.527.071c.291.04.407.398.195.6l-.385.368a.7.7 0 0 0-.103.316l.095.523c.053.289-.251.51-.51.371l-.468-.253a.7.7 0 0 0-.332 0l-.468.253c-.258.14-.563-.082-.51-.371l.095-.523a.7.7 0 0 0-.103-.316l-.385-.367c-.212-.203-.096-.561.195-.6l.527-.071a.7.7 0 0 0 .5-.196l.23-.48z" fill="#FFCC00" />
        <path d="M33.985 23.232c.126-.265.503-.265.63 0l.23.48a.7.7 0 0 0 .5.195l.527.071c.29.04.407.398.195.6l-.385.368a.7.7 0 0 0-.103.316l.095.523c.053.289-.251.51-.51.371l-.468-.253a.7.7 0 0 0-.332 0l-.468.253c-.259.14-.563-.082-.51-.371l.095-.523a.7.7 0 0 0-.103-.316l-.385-.367c-.212-.203-.095-.561.195-.6l.527-.071a.7.7 0 0 0 .5-.196l.23-.48z" fill="#FFCC00" />
        <path d="M38.325 23.232c.126-.265.503-.265.63 0l.23.48a.7.7 0 0 0 .5.195l.527.071c.29.04.407.398.194.6l-.384.368a.7.7 0 0 0-.103.316l.095.523c.053.289-.252.51-.51.371l-.468-.253a.7.7 0 0 0-.332 0l-.468.253c-.258.14-.563-.082-.51-.371l.095-.523a.7.7 0 0 0-.103-.316l-.385-.367c-.212-.203-.095-.561.195-.6l.527-.071a.7.7 0 0 0 .5-.196l.23-.48z" fill="#FFCC00" />
        <path d="M42.664 23.232c.127-.265.504-.265.631 0l.23.48a.7.7 0 0 0 .5.195l.527.071c.29.04.407.398.194.6l-.384.368a.7.7 0 0 0-.103.316l.095.523c.053.289-.252.51-.51.371l-.468-.253a.7.7 0 0 0-.332 0l-.468.253c-.259.14-.563-.082-.51-.371l.095-.523a.7.7 0 0 0-.103-.316l-.385-.367c-.212-.203-.095-.561.195-.6l.527-.071a.7.7 0 0 0 .5-.196l.23-.48z" fill="#CBDDFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M31.85 30.459H24.15v-.368h7.7v.368z" fill="#181B34" />
        <rect x="24.15" y="32.725" width="43.4" height="4.55" rx=".35" fill="#ECEFF8" />
        <path fillRule="evenodd" clipRule="evenodd" d="M64.093 35.99l-1.225-1.4.264-.23 1.093 1.25 1.093-1.25.264.23-1.225 1.4a.19.19 0 0 1-.132.06.19.19 0 0 1-.132-.06z" fill="#579BFC" />
        <path fillRule="evenodd" clipRule="evenodd" d="M38.5 40.959H24.15v-.368H38.5v.368z" fill="#181B34" />
        <rect x="24.15" y="42.875" width="9.1" height="4.55" rx=".35" fill="#ECEFF8" />
        <circle cx="26.775" cy="45.15" r="1.225" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M31.85 45.509H29.05v-.368h2.8v.368z" fill="#CBDDFF" />
        <rect x="34.3" y="42.875" width="10.15" height="4.55" rx=".35" fill="#ECEFF8" />
        <circle cx="36.925" cy="45.15" r="1.225" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M42.35 45.509H39.2v-.368h3.15v.368z" fill="#CBDDFF" />
        <rect x="45.5" y="42.875" width="13.65" height="4.55" rx=".35" fill="#ECEFF8" />
        <circle cx="48.125" cy="45.15" r="1.225" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M56.7 45.509H50.4v-.368h6.3v.368z" fill="#CBDDFF" />
        <rect x="60.2" y="42.875" width="7.35" height="4.55" rx=".35" fill="#ECEFF8" />
        <circle cx="62.125" cy="45.15" r="1.225" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M66.15 45.509H64.4v-.368h1.75v.368z" fill="#CBDDFF" />
        <rect x="24.15" y="48.475" width="7.35" height="4.55" rx=".35" fill="#ECEFF8" />
        <rect x="32.55" y="48.475" width="9.1" height="4.55" rx=".35" fill="#ECEFF8" />
        <rect x="42.7" y="48.475" width="10.15" height="4.55" rx=".35" fill="#ECEFF8" />
      </g>
    </svg>
  );
}
