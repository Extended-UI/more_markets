import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { ERC20Abi } from "@/app/abi/ERC20Abi";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import TokenName from "../token/TokenName";
import FormatTwoPourcentage from "../tools/formatTwoPourcentage";
import FormatPourcentage from "../tools/formatPourcentage";
import FormatTokenMillion from "../tools/formatTokenMillion";
import { BorrowData } from "@/types/borrowData";
import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultBorrow from "../modal/borrow/VaultBorrow";
import { MarketParams } from "@/types/marketParams";

interface BorrowMoreTableRowProps {
    market: `0x${string}`;
    index: number;
}

const BorrowMoreTableRow: React.FC<BorrowMoreTableRowProps> = ({
    market,
    index,
}) => {
    const {
        data: marketParams,
        isPending,
        refetch: refetchProject,
        isSuccess,
    } = useReadContract({
        address: process.env.NEXT_PUBLIC_MARKETS as `0x${string}`,
        abi: MarketsAbi,
        functionName: "idToMarketParams",
        args: [market],
    });

    const marketParameters: MarketParams = {
        loanToken: marketParams !== undefined ? marketParams[0] : `0x0`,
        collateralToken: marketParams !== undefined ? marketParams[1] : `0x0`,
        oracle: marketParams !== undefined ? marketParams[2] : `0x0`,
        irm: marketParams !== undefined ? marketParams[3] : `0x0`,
        lltv: marketParams !== undefined ? marketParams[4] : BigInt(0),
    };

    const item: BorrowData = {
        collateralToken: marketParams !== undefined ? marketParams[1] : "",
        loanToken: marketParams !== undefined ? marketParams[0] : "",
        liquidationLTV: 80,
        liquidationLTV2: 120,
        borrowAPY: 42,
        utilization: 42,
        totalDeposits: 1245,
        totalValueUSD: 1245,
    };

    // TODO MOCK data
    const title = "USDMax";
    const balanceToken: number = 473.18;
    const balanceFlow: number = 785.45;
    const totalDeposit: number = 3289.62;
    const totalTokenAmount: number = 1.96;
    const curator = "Flowverse";
    const credora = "AAA";

    const ltvStr = `${item.liquidationLTV}% / ${item.liquidationLTV2}%`;

    const [isStickyDisabled, setIsStickyDisabled] = useState(false);
    const toggleSticky = () => {
        console.log(isStickyDisabled);

        setIsStickyDisabled(!isStickyDisabled);
        console.log(isStickyDisabled);
    };
    useEffect(() => {
        console.log(isStickyDisabled); // This will log the updated state
    }, [isStickyDisabled]);
    useEffect(() => {
        refetchProject?.();
    }, [isSuccess]);

    if (isPending) return <div>...</div>;
    else
        return (
            <>
                <td className="py-4 px-6 items-center h-full">
                    <TokenName token={item.collateralToken}></TokenName>
                </td>
                <td className="py-4 px-6 items-center h-full  ">
                    <TokenName token={item.loanToken}></TokenName>
                </td>
                <td className="py-4  items-center h-full ">
                    <div className="flex gap-1 justify-start">
                        <FormatTwoPourcentage
                            value={item.liquidationLTV}
                            value2={item.liquidationLTV2}
                        ></FormatTwoPourcentage>
                    </div>
                </td>
                <td className="py-4 px-6 items-center h-full">
                    <div className="flex justify-start">
                        <FormatPourcentage
                            value={item.borrowAPY}
                        ></FormatPourcentage>
                    </div>
                </td>
                <td className="py-4 px-6 items-center h-full">
                    <div className="flex">
                        <FormatPourcentage
                            value={item.utilization}
                        ></FormatPourcentage>
                    </div>
                </td>
                <td className="py-4 px-6 items-center   h-full ">
                    <div className="flex justify-start">
                        <FormatTokenMillion
                            value={item.totalDeposits}
                            token={item.loanToken}
                            totalValue={item.totalDeposits}
                        ></FormatTokenMillion>
                    </div>
                </td>
                <td
                    className={`py-4 px-6 items-center justify-end h-full ${
                        isStickyDisabled ? "" : "sticky"
                    }`}
                    style={{
                        paddingRight: 10,
                        right: 0,
                        backgroundColor: `${
                            index % 2 === 0 ? "#141414" : "#191919"
                        }`,
                    }}
                >
                    <div onClick={(event) => event.stopPropagation()}>
                        <ButtonDialog
                            color="secondary"
                            buttonText="Borrow"
                            onButtonClick={toggleSticky}
                        >
                            {(closeModal) => (
                                <>
                                    <div className=" w-full h-full">
                                        <VaultBorrow
                                            title={title}
                                            token={item.collateralToken}
                                            apy={item.borrowAPY}
                                            balanceToken={balanceToken}
                                            balanceFlow={balanceFlow}
                                            ltv={ltvStr}
                                            totalDeposit={totalDeposit}
                                            totalTokenAmount={totalTokenAmount}
                                            curator={curator}
                                            credora={credora}
                                            marketParams={marketParameters}
                                            closeModal={closeModal}
                                        ></VaultBorrow>
                                    </div>
                                </>
                            )}
                        </ButtonDialog>
                    </div>
                </td>
            </>
        );
};

export default BorrowMoreTableRow;
