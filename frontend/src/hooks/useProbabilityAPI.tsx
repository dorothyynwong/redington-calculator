import { useState } from "react";
import { ProbabilityOperation } from "../models/probabilityModel";
import { getProbability } from "../api/probabilityAPI";
import { AxiosError } from "axios";

export const useProbabilityAPI = () => {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const calculateProbability = async (num1: number, num2: number, operation: ProbabilityOperation) => {
        setLoading(true);
        setApiError(null);
        try {
            const response = await getProbability({ num1, num2, operation });
            return response;
        } catch (error) {
            const axiosError = error as AxiosError;
            const status = axiosError?.response?.status;
            if (status && status >= 500) {
                setApiError("Service is temporarily unavailable. Please try again later.");
            } else if (status && status >= 400) {
                setApiError("Invalid request. Please check your input.");
            } else {
                setApiError("An unexpected error occurred. Please try again.");
            }
            return undefined;
        } finally {
            setLoading(false);
        }
    };

    return { calculateProbability, loading, apiError };
};
