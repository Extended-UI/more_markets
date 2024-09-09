export const getVaule = (param: any): string => {
  return param.result ? param.result.toString() : "";
};

export const getVauleNum = (param: any): number => {
  return param.result ? Number(param.result.toString()) : 0;
};
