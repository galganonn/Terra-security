import Image from "next/image";

export default function TopBar() {
  return (
    <header className="flex items-center pr-3 py-2 bg-ui-bg">
      <div className="flex items-center justify-center w-[72px] shrink-0">
        <Image
          src="/icons/terra-logo.svg"
          alt="Terra Security"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 pr-0">
        <div className="flex items-center gap-1">
          <button className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 cursor-pointer">
            <Image
              src="/icons/notifications.svg"
              alt="Notifications"
              width={20}
              height={20}
            />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 cursor-pointer">
            <Image
              src="/icons/support.svg"
              alt="Support"
              width={20}
              height={20}
            />
          </button>
        </div>

        <div className="w-px h-7 bg-layout-border" />

        <div className="w-8 h-8 rounded-full overflow-hidden">
          <Image
            src="/icons/avatar.png"
            alt="Profile"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
