import Image from "next/image";

export default function HeaderCards() {
  return (
    <div className="px-8 pb-6">
      <div
        className="flex flex-col gap-4 p-3 rounded-2xl border border-white backdrop-blur-[12px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(230,234,246,0.6) 4.19%, rgba(248,249,253,0.5) 71.15%)",
          boxShadow: "0px 20px 50px 0px rgba(1,116,235,0.1)",
        }}
      >
        {/* Alert Banner */}
        <div className="bg-white rounded-[6px] p-4 overflow-hidden">
          <div className="flex flex-col gap-4 max-w-[1216px]">
            <div className="flex items-center">
              <span className="inline-flex items-center gap-1 bg-[#fde6e9] rounded-lg px-2 pr-3 py-1.5 h-6">
                <Image src="/icons/radio.svg" alt="" width={16} height={16} />
                <span className="text-[12px] leading-4 font-normal text-[#df2f4a]">
                  Action required
                </span>
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-[family-name:var(--font-poppins)] text-[18px] leading-6 tracking-[-0.1px] text-primary-text">
                  <span className="font-bold text-[#df2f4a]">/Payments</span>
                  <span className="font-semibold">
                    {" "}
                    — your payment flow is at critical risk
                  </span>
                </p>
                <p className="text-[16px] leading-[22px] text-primary-text max-w-[955px]">
                  Confirmed vulnerability: if exploited, every transaction
                  processed through /Payments is exposed - customer data,
                  financial records, and payment integrity.
                </p>
              </div>

              <button className="flex items-center justify-center gap-2 h-8 px-2 bg-[#0073ea] rounded text-white text-[14px] leading-5 cursor-pointer w-fit">
                <span>Open a ticket</span>
                <Image
                  src="/icons/chevron-right.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="brightness-0 invert"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Stat Cards Row */}
        <div className="flex gap-4 h-[200px]">
          {/* Exposure Card */}
          <div className="bg-white rounded-2xl p-4 w-[545px] shrink-0 flex flex-col">
            <div className="flex flex-col flex-1 gap-8">
              <Badge icon="/icons/incident-manager.svg" label="Exposure" />

              <div className="flex flex-col flex-1 justify-between">
                <div className="flex gap-1 h-[54px]">
                  <div
                    className="rounded-l-lg w-[9%]"
                    style={{
                      backgroundImage:
                        "linear-gradient(85deg, rgb(209,2,55) 7%, rgb(255,117,57) 112%)",
                    }}
                  />
                  <div
                    className="w-[21%] opacity-80"
                    style={{
                      backgroundImage:
                        "linear-gradient(77deg, rgb(252,106,0) 5%, rgb(255,162,27) 121%)",
                    }}
                  />
                  <div
                    className="rounded-r-lg w-[40%] opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(-85deg, rgb(255,214,51) 18%, rgb(255,144,0) 101%)",
                    }}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <LegendItem color="#d10237" label="1 Critical" />
                  <LegendItem color="#fc6a00" label="7 High" />
                  <LegendItem color="#ffb900" label="12 Medium" />
                </div>
              </div>
            </div>
          </div>

          {/* Endpoints Tested Card */}
          <div className="bg-white rounded-2xl p-4 w-[285px] shrink-0 flex flex-col gap-[22px]">
            <Badge icon="/icons/security.svg" label="Endpoints tested" />

            <div className="flex flex-col flex-1 justify-between">
              <div className="flex items-center justify-between">
                {/* Donut Chart */}
                <div className="relative w-[76.567px] h-[62.956px]">
                  {/* Background arc */}
                  <div className="absolute flex items-center justify-center left-0 top-0 w-[76.567px] h-[76.567px]">
                    <div className="-scale-y-100 flex-none rotate-180">
                      <div className="relative w-[76.567px] h-[76.567px]">
                        <div className="absolute" style={{ inset: "-3.46% -3.46% 19.61% -3.46%" }}>
                          <img alt="" className="block max-w-none w-full h-full" src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icons/ellipse-bg.svg`} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Progress arc */}
                  <div className="absolute flex items-center justify-center left-0 top-0 w-[76.567px] h-[76.567px]">
                    <div className="-scale-y-100 flex-none rotate-180">
                      <div className="relative w-[76.567px] h-[76.567px]">
                        <div className="absolute" style={{ inset: "-6.1% -6.1% 16.7% -6.1%" }}>
                          <img alt="" className="block max-w-none w-full h-full" src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icons/ellipse-progress.svg`} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Label */}
                  <div className="absolute flex flex-col items-center" style={{ left: "23.34px", top: "27.08px", width: "33.563px" }}>
                    <span className="font-[family-name:var(--font-poppins)] text-[16.692px] font-semibold leading-[22.256px] tracking-[-0.093px] text-primary-text text-center whitespace-nowrap">
                      69%
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="bg-[#f6f7fb] rounded-full h-6 px-2 flex items-center">
                    <span className="text-[14px] leading-5 text-secondary-text">
                      <span className="font-semibold">356</span>{" "}
                      <span className="text-[10px] leading-4 text-secondary-text/70">
                        / 512
                      </span>{" "}
                      tested
                    </span>
                  </div>
                  <div className="bg-[#f6f7fb] rounded-full h-6 px-2 flex items-center">
                    <span className="text-[14px] leading-5 text-secondary-text">
                      <span className="font-semibold">156</span> pending
                    </span>
                  </div>
                </div>
              </div>

              <LinkButton label="See pending pages" />
            </div>
          </div>

          {/* Since Last Monday Card */}
          <div className="bg-white rounded-2xl p-4 flex-1 flex flex-col">
            <div className="flex flex-col flex-1 justify-between">
              <Badge icon="/icons/last-updated.svg" label="Since last Monday" />

              <div className="flex flex-col gap-2">
                <TriggerCard
                  icon="/icons/close-round.svg"
                  text="1 new critical vulnerabilities"
                />
                <TriggerCard
                  icon="/icons/search-ai.svg"
                  text="47 new endpoints discovered · ↑ 3% coverage"
                />
                <TriggerCard
                  icon="/icons/check.svg"
                  text="1 marked resolved · awaiting Terra verification"
                />
              </div>

              <LinkButton label="View full changelog" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-1 bg-[#e9f3ff] rounded-lg px-2 pr-3 py-1.5 h-6 shrink-0 w-fit">
      <Image src={icon} alt="" width={16} height={16} />
      <span className="text-[12px] leading-4 text-primary-text">{label}</span>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[16px] leading-[22px] text-secondary-text">
        {label}
      </span>
    </div>
  );
}

function TriggerCard({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-[#fdfdfd] border border-[#e6e8ef] rounded-[6px]">
      <Image src={icon} alt="" width={20} height={20} />
      <span className="text-[14px] leading-5 text-primary-text">{text}</span>
    </div>
  );
}

function LinkButton({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-2 h-6 px-2 cursor-pointer bg-transparent border-none">
      <span className="text-[14px] leading-5 text-[#0073ea]">{label}</span>
      <Image
        src="/icons/chevron-right-blue.svg"
        alt=""
        width={16}
        height={16}
      />
    </button>
  );
}
