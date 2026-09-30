import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import HeaderCards from "./components/HeaderCards";
import PagesSection from "./components/PagesSection";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <TopBar />
      <div className="flex flex-1 min-h-0 bg-ui-bg">
        <Sidebar />
        <main
          className="flex-1 rounded-tl-[16px] overflow-auto"
          style={{
            background:
              "linear-gradient(to bottom, #ffffff 0%, rgba(230,234,246,0.6) 30%, rgba(248,249,253,0.5) 100%)",
          }}
        >
          <div className="px-8 pt-8 pb-6">
            <div className="flex items-center gap-4">
              <h1 className="font-[family-name:var(--font-poppins)] text-[24px] font-semibold leading-[38px] text-primary-text">
                Assets
              </h1>
              <div className="flex items-center gap-1">
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icons/status-dot-green.svg`} alt="" className="w-[10px] h-[10px]" />
                <span className="text-[12px] leading-4 text-secondary-text">
                  Testing live · crawled 14 min ago
                </span>
              </div>
            </div>
          </div>
          <HeaderCards />
          <PagesSection />
        </main>
      </div>
    </div>
  );
}
