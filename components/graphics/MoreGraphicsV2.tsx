import React from "react";
import MoreGraphicLinear from "./MoreGraphicsLinear";
import Icon from "../FontAwesomeIcon";

interface Props {
  labelsX: string[]; // Obligatoire
  datasets: Dataset[]; // Obligatoire
  signY?: string; // Optionnel
  isFill?: boolean; // Optionnel
  transparency?: number; // Optionnel
  borderWidth?: number; // Optionnel
  pointRadius?: number; // Optionnel
  minY?: number; // Optionnel
  maxY?: number; // Optionnel
  guideLines?: any[]; // Optionnel
  comment?: string; // Optionnel
}

const MoreGraphicsV2 = ({
  datasets,
  labelsX,
  comment,
  isFill,
  signY,
  borderWidth,
  pointRadius,
  transparency,
  minY,
  maxY,
  guideLines,
}: Props) => {
  return (
    <>
      <div className="">
        <MoreGraphicLinear
          datasets={datasets}
          labelsX={labelsX}
          afterSignY="%"
          isFill={isFill}
          transparency={transparency}
          borderWidth={borderWidth}
          pointRadius={pointRadius}
          minY={minY}
          maxY={maxY}
          guideLines={guideLines}
        ></MoreGraphicLinear>
      </div>
      <div className="grid grid-cols-2 gap-4 p-10 mt-10 border-t border-t-solid border-t-[#343434]">
        {datasets.map((dataset) => (
          <div
            key={dataset.label}
            className="py-2 flex justify-start items-center"
          >
            <div>
              <Icon
                icon="circle"
                className="text-[{borderColor}] text-l cursor-pointer mr-0 w-[20px] !h-[20px]"
                style={{ color: dataset.borderColor }}
              />
            </div>
            <div className="text-[16px] mb-0 pl-6 font-normal">{dataset.label}</div>
          </div>
        ))}
      </div>
      <div className="text-[16px] pl-7 text-[#888888]">{comment}</div>
    </>
  );
};

export default MoreGraphicsV2;
