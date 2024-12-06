import { useState } from "react";
import { isValidProbability } from "../utilities/probabilityValidation";

export const useProbabilityForm = (onResultCleared: () => void) => {
    const [numbers, setNumbers] = useState<string[]>(["0", "0"]);
    const [inputErrors, setInputErrors] = useState<boolean[]>([false, false]);

    const handleInputChange = (index: number, value: string) => {
        onResultCleared();

        const newNumbers = [...numbers];
        const newInputErrors = [...inputErrors];

        newNumbers[index] = value;
        newInputErrors[index] = !isValidProbability(value);

        setNumbers(newNumbers);
        setInputErrors(newInputErrors);
    };

    const hasErrors = inputErrors.some((error) => error);

    return { numbers, inputErrors, handleInputChange, hasErrors };
};
