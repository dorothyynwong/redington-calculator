import { useState } from "react";
import { ProbabilityOperation, ProbabilityResponse } from "../models/probabilityModel";
import { getProbability } from "../api/probabilityAPI";
import { Box, Button, CircularProgress, Alert } from "@mui/material";
import Grid from '@mui/material/Grid2';
import OperationSelector from "./OperationSelector";
import { isValidProbability } from "../utilities/probabilityValidation";
import NumericInput from "./NumericInput";
import { AxiosError } from "axios";

interface ProbabilityFormProps {
    selectedOperation: ProbabilityOperation;
    onOperationChange: (operation: ProbabilityOperation) => void;
    onResultCalculated: (result: ProbabilityResponse | undefined) => void;
}

const ProbabilityForm: React.FC<ProbabilityFormProps> = ({ selectedOperation,
    onOperationChange,
    onResultCalculated }) => {
    const [numbers, setNumbers] = useState<string[]>(["0", "0"]);
    const [inputErrors, setInputErrors] = useState<boolean[]>([false, false]);
    const [loading, setLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const handleInputChange = (index: number, value: string) => {
        onResultCalculated(undefined);

        const newNumbers = [...numbers];
        const newInputErrors = [...inputErrors];

        newNumbers[index] = value;
        newInputErrors[index] = !isValidProbability(value);

        setNumbers(newNumbers);
        setInputErrors(newInputErrors);
    };

    const handleSelectChange = (key: string) => {
        const value = ProbabilityOperation[key as keyof typeof ProbabilityOperation];
        onOperationChange(value);
        onResultCalculated(undefined);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(null);
        if (!inputErrors.some(inputError => inputError)) {
            setLoading(true);
            try {
                const response = await getProbability({
                    num1: parseFloat(numbers[0]),
                    num2: parseFloat(numbers[1]),
                    operation: selectedOperation
                });
                onResultCalculated(response);
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
                onResultCalculated(undefined);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} aria-label="Probability Form">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {numbers.map((_, index) => (
                        <Grid size={6} key={index}>
                            <NumericInput
                                label={`Probability ${index + 1}`}
                                value={numbers[index]}
                                onChange={handleInputChange}
                                index={index}
                                error={inputErrors[index]}
                            />
                        </Grid>
                    ))}
                    <Grid size={12}>
                        <OperationSelector
                            operations={Object.keys(ProbabilityOperation)}
                            onSelectChange={handleSelectChange}
                            label="Select Probability Calculation Function"
                        />
                    </Grid>
                    
                    <Grid size={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : "Calculate"}
                        </Button>
                    </Grid>
                    {apiError && (
                        <Grid size={12}>
                            <Alert severity="error">{apiError}</Alert>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </form>
    );
};

export default ProbabilityForm;
