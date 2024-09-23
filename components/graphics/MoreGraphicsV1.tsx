import React, { useEffect, useState } from "react";
import MoreGraphicLinear from "./MoreGraphicsLinear";
import Icon from "../FontAwesomeIcon";

interface Props {
  labelsX: string[]; // Obligatoire
  datasets: Dataset[]; // Obligatoire
  afterSignY?: string; // Optionnel
  beforeSignY?: string; // Optionnel
  isFill?: boolean; // Optionnel
  transparency?: number; // Optionnel
  borderWidth?: number; // Optionnel
  pointRadius?: number; // Optionnel
  minY?: number; // Optionnel
  maxY?: number; // Optionnel
  guideLines?: any[]; // Optionnel
  comment?: string; // Optionnel
  total?: string; // Optionnel
}

const MoreGraphicsV1: React.FC<Props> = ({
  datasets,
  labelsX,
  comment,
  isFill,
  afterSignY,
  beforeSignY,
  borderWidth,
  pointRadius,
  transparency,
  minY,
  maxY,
  guideLines,
  total,
}: Props) => {
  const [visibility, setVisibility] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const initialVisibility = datasets.reduce<{ [key: string]: boolean }>(
      (acc, dataset) => {
        acc[dataset.label] = true; // Par défaut, tous les graphiques sont visibles
        return acc;
      },
      {}
    );
    setVisibility(initialVisibility);
  }, [datasets]);

  // Écouter les changements de visibilité
  useEffect(() => {
    // console.log("Visibility updated: ", visibility);
    // console.log("Visibility updated: ", datasets);
  }, [visibility, datasets]);

  const toggleVisibility = (label: string): void => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [label]: !prevVisibility[label],
    }));
  };

  const filteredDatasets = datasets.filter(
    (dataset) => visibility[dataset.label]
  );

  return (
    <>
      <div
        className="p-2 flex justify-between items-center overflow-x-auto overflow-y-hidden"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none", // Works in Firefox
          msOverflowStyle: "none", // Works in IE and Edge
        }}
      >
        <div className="p-2 flex justify-center items-center">
          {datasets.map((dataset) => (
            <div key={dataset.label} className="mr-16">
              <div className="p-2 flex justify-center items-center">
                <Icon
                  icon="circle"
                  className="text-xl cursor-pointer mr-2"
                  style={{ color: dataset.borderColor }}
                />
                <div className="text-xl mb-0 mr-2">{dataset.label}</div>
                {visibility[dataset.label] ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <g
                      id="vuesax_linear_eye"
                      data-name="vuesax/linear/eye"
                      transform="translate(-108 -188)"
                    >
                      <g id="eye" transform="translate(108 188)">
                        <path
                          id="Vector"
                          d="M5.967,2.983A2.983,2.983,0,1,1,2.983,0,2.98,2.98,0,0,1,5.967,2.983Z"
                          transform="translate(7.017 7.017)"
                          fill="none"
                          stroke="#e0dfe3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          id="Vector-2"
                          data-name="Vector"
                          d="M8.154,13.792c2.942,0,5.683-1.733,7.592-4.733a4.438,4.438,0,0,0,0-4.325C13.837,1.733,11.1,0,8.154,0S2.471,1.733.562,4.733a4.438,4.438,0,0,0,0,4.325C2.471,12.058,5.213,13.792,8.154,13.792Z"
                          transform="translate(1.846 3.1)"
                          fill="none"
                          stroke="#e0dfe3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          id="Vector-3"
                          data-name="Vector"
                          d="M0,0H20V20H0Z"
                          transform="translate(20 20) rotate(180)"
                          fill="none"
                          opacity="0"
                        />
                      </g>
                    </g>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <g
                      id="vuesax_linear_eye-slash"
                      data-name="vuesax/linear/eye-slash"
                      transform="translate(-172 -188)"
                      opacity="0.5"
                    >
                      <g id="eye-slash" transform="translate(172 188)">
                        <path
                          id="Vector"
                          d="M5.092.875.875,5.092A2.982,2.982,0,1,1,5.092.875Z"
                          transform="translate(7.017 7.017)"
                          fill="none"
                          stroke="#888"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          id="Vector-2"
                          data-name="Vector"
                          d="M13,1.7A8.026,8.026,0,0,0,8.154,0C5.213,0,2.471,1.733.562,4.733a4.438,4.438,0,0,0,0,4.325A11.939,11.939,0,0,0,2.821,11.7"
                          transform="translate(1.846 3.108)"
                          fill="none"
                          stroke="#888"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          id="Vector-3"
                          data-name="Vector"
                          d="M0,9.667a7.679,7.679,0,0,0,2.983.617c2.942,0,5.683-1.733,7.592-4.733a4.438,4.438,0,0,0,0-4.325A13.518,13.518,0,0,0,9.692,0"
                          transform="translate(7.017 6.608)"
                          fill="none"
                          stroke="#888"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          id="Vector-4"
                          data-name="Vector"
                          d="M2.35,0A2.971,2.971,0,0,1,0,2.35"
                          transform="translate(10.575 10.583)"
                          fill="none"
                          stroke="#888"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          id="Vector-5"
                          data-name="Vector"
                          d="M6.225,0,0,6.225"
                          transform="translate(1.667 12.108)"
                          fill="none"
                          stroke="#888"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          id="Vector-6"
                          data-name="Vector"
                          d="M6.225,0,0,6.225"
                          transform="translate(12.108 1.667)"
                          fill="none"
                          stroke="#888"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          id="Vector-7"
                          data-name="Vector"
                          d="M0,0H20V20H0Z"
                          transform="translate(20 20) rotate(180)"
                          fill="none"
                          opacity="0"
                        />
                      </g>
                    </g>
                  </svg>
                )}
              </div>
              <div className="text-3xl text-center">
                {dataset.percentage}
                <span className="text-gray-500 ml-2">%</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="dropdown absolute top-[40px] right-[20px] z-1">
            <label tabIndex={0} className="btn m-1 btn-neutral">
              1 Week{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 ml-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52"
            >
              <li className="bg-neutral">
                <a>Item 1</a>
              </li>
              <li className="bg-neutral">
                <a>Item 2</a>
              </li>
              <li className="bg-neutral">
                <a>Item 3</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <MoreGraphicLinear
          key={JSON.stringify(filteredDatasets)}
          datasets={filteredDatasets}
          labelsX={labelsX}
          isFill={isFill}
          transparency={transparency}
          afterSignY={afterSignY}
          borderWidth={borderWidth}
          pointRadius={pointRadius}
          minY={minY}
          maxY={maxY}
          guideLines={guideLines}
        />
      </div>
    </>
  );
};

export default MoreGraphicsV1;
