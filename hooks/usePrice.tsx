import _ from "lodash";
import { useState, useEffect } from "react";
import { coingecko_ids } from "@/utils/const";
import { getTokenPrice } from "@/utils/utils";

interface ITokenPrice {
  token: string;
  price: number;
}

const nameMap: { [key in string]: string } = {
  usdc: "USDCf",
  tether: "USDf",
  bitcoin: "BTCf",
  ethereum: "ETHf",
  "ankr-network": "ankr.FLOW",
  flow: "wFLOW",
};

function usePrice() {
  const [tokenPrices, setTokenPrices] = useState<ITokenPrice[]>([]);

  useEffect(() => {
    const initPrices = () => {
      let prices: ITokenPrice[] = [];
      _.forOwn(coingecko_ids, async (value, token) => {
        // const tokenPrice = await getTokenPrice(value);
        const tokenPrice = Math.random();
        prices.push({
          token: token,
          price: tokenPrice,
        });
      });

      setTokenPrices(prices);
    };

    initPrices();
  }, []);

  const fetchTokenPrice = (token: string | undefined): number => {
    if (token) {
      const tokenPrice = tokenPrices.find(
        (item) => nameMap[item.token].toLowerCase() == token.toLowerCase()
      );

      return tokenPrice ? tokenPrice.price : 0;
    }

    return 0;
  };

  return {
    fetchTokenPrice,
  };
}

export default usePrice;
