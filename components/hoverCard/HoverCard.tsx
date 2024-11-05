import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCardBase";
import { IVaultApy } from "@/types";

interface Props {
  apy: IVaultApy;
  mainText?: string | number;
}

const HoverCardComp: React.FC<Props> = ({ mainText, apy }) => {
  return (
    <div className="text-[16px]">
      <HoverCard>
        <HoverCardTrigger className="cursor-pointer">
          {mainText ? (
            mainText
          ) : (
            <img
              src={"/assets/icons/info-orange.svg"}
              alt="info"
              width={16}
              height={16}
            />
          )}
        </HoverCardTrigger>
        <HoverCardContent className="bg-[#141414] rounded-[1.25em] border-[0.5em] p-0 border-[#343434] border-solid">
          <div className="bg-[#212121] px-[1.75em] py-[1.25em] rounded-t-[0.5em]">
            <div className="text-[1.5em] text-[#E0DFE3] font-semibold">
              Rate and Rewards
            </div>
          </div>
          <div className="px-[1.75em] py-[1.25em]">
            <div className="text-white flex justify-between items-center mb-[1.25em] text-[1.175em]">
              <div>Rate</div>
              <div>
                +{apy.base_apy.toFixed(2)}
                <span className="text-[#888888]">%</span>
              </div>
            </div>
            <div className="text-white flex justify-between items-center mb-[1.25em] text-[1.175em]">
              <div>Boxes</div>
              <div>
                +{apy.box_apy.toFixed(2)}
                <span className="text-[#888888]">%</span>
              </div>
            </div>
            {apy.boost_apys.map((boostApy) => (
              <div
                key={boostApy.priceInfo}
                className="text-white flex justify-between items-center mb-[1.25em] text-[1.175em]"
              >
                <div>{boostApy.priceInfo} Rewards Boost</div>
                <div>
                  +{boostApy.apy.toFixed(2)}
                  <span className="text-[#888888]">%</span>
                </div>
              </div>
            ))}

            <div className="text-[#F58420] flex justify-between items-center text-[1.175em]">
              <div>Net APY</div>
              <div>
                +{apy.total_apy.toFixed(2)}
                <span className="text-[#F58420]">%</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default HoverCardComp;
