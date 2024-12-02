export const isValidProbability = (value: string): boolean => {
    const numericValue = parseFloat(value);
    return value !== "" && 
           !isNaN(numericValue) && 
           numericValue >= 0 && 
           numericValue <= 1;
};