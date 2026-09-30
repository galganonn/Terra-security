import Image from "next/image";

const navItems = [
  { icon: "/icons/overview.svg", label: "Overview", active: false },
  { icon: "/icons/assets.svg", label: "Assets", active: true },
  { icon: "/icons/findings.svg", label: "Findings", active: false },
];

const secondaryItems = [
  { icon: "/icons/reports.svg", label: "Reports", active: false },
];

export default function Sidebar() {
  return (
    <nav className="flex flex-col items-center gap-3 pt-2 pb-0.5 px-2 w-[72px] shrink-0 bg-ui-bg">
      <div className="flex flex-col flex-1 items-center justify-between w-14">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col gap-1 w-full">
            {navItems.map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
          </div>

          <div className="w-full px-2 pt-3 pb-2">
            <div className="h-px w-full bg-layout-border" />
          </div>

          <div className="flex flex-col w-full">
            {secondaryItems.map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
          </div>
        </div>

        <NavItem
          icon="/icons/settings.svg"
          label="Settings"
          active={false}
        />
      </div>
    </nav>
  );
}

function NavItem({
  icon,
  label,
  active,
}: {
  icon: string;
  label: string;
  active: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 items-center pt-1 pb-2 rounded-lg w-full cursor-pointer">
      <div
        className={`flex items-center justify-center p-1.5 rounded-lg w-8 h-8 ${
          active ? "bg-primary-selected" : ""
        }`}
      >
        <Image src={icon} alt={label} width={18} height={18} className="w-[18px] h-[18px]" />
      </div>
      <span
        className={`text-[10.5px] leading-3 tracking-[-0.315px] text-center whitespace-nowrap overflow-hidden text-ellipsis w-full ${
          active
            ? "font-medium text-primary-text"
            : "font-normal text-secondary-text"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
