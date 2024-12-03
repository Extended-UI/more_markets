import { isFlow } from "@/utils/utils";

interface MoreRadioProps {
  useFlow: boolean;
  asset: string;
  setUseFlow: (useFlow: boolean) => void;
}

const MoreRadio: React.FC<MoreRadioProps> = ({
  useFlow,
  asset,
  setUseFlow,
}) => {
  return (
    <>
      {isFlow(asset) ? (
        <div className="flex mb-4">
          <div className="flex items-center">
            <input
              checked={useFlow}
              id="default-radio-1"
              type="radio"
              onClick={() => setUseFlow(true)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-2xl text-white-900"
            >
              Use FLOW
            </label>
          </div>
          <div className="flex items-center ml-5">
            <input
              checked={!useFlow}
              id="default-radio-2"
              type="radio"
              onClick={() => setUseFlow(false)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-2"
              className="ms-2 text-2xl text-white-900"
            >
              Use WFLOW
            </label>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MoreRadio;
