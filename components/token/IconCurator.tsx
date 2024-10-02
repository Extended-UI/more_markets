import React from "react";
import Image from "next/image";
import { ZeroAddress } from "ethers";
import { formatCurator } from "@/utils/utils";

interface ICuratorProp {
  curator: string;
  classStr?: string;
}

const IconCurator: React.FC<ICuratorProp> = ({ curator, classStr }) => {
  if (curator.length == 0 || curator == ZeroAddress) return null;

  return (
    <>
      <div className={classStr ? classStr : "w-8 mr-3"}>
        <Image
          src={`/assets/curators/${curator.toLowerCase()}.png`}
          alt="curator-icon"
          width={8}
          height={8}
          className="w-full"
        />
      </div>
      <div>{formatCurator(curator)}</div>
    </>
  );
};

export default IconCurator;
