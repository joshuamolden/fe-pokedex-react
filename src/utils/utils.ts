export const addComma = (array: string[]): string[] => {
  const returnArray = [];
  for (let i = 0; i < array.length; i++) {
    // makes sure comma isn't added to the last one
    if (array.length - i === 1) {
      returnArray.push(array[i]);
    } else {
      returnArray.push(array[i] + ",");
    }
  }
  return returnArray;
};

export const adjustStat = (value: number, divisor: number): number => {
  return (value / divisor) * 100;
};
