import { useEffect, useState } from "react";
import { getTokenPrice } from "@/utils/contract";

const usePrice = (token: string | undefined) => {
  const [tokenPrice, setTokenPrice] = useState(0);

  const initPrice = async () => {
    if (token) {
      const priceVal = await getTokenPrice(token);
      setTokenPrice(priceVal);
    }
  };

  useEffect(() => {
    if (token) initPrice();
    else setTokenPrice(0);
  }, [token]);

  return {
    tokenPrice,
  };
};

export default usePrice;
