import { useState } from "react";
import { ProbabilityOperation, ProbabilityResponse } from "../models/probabilityModel";
import { getProbability } from "../api/probabilityAPI";
import { Box, Button, CircularProgress, Alert } from "@mui/material";
import Grid from '@mui/material/Grid2';
import OperationSelector from "./OperationSelector";
import { isValidProbability } from "../utilities/probabilityValidation";
import NumericInput from "./NumericInput";

interface ProbabilityFormProps {
    selectedOperation: ProbabilityOperation;
    onOperationChange: (operation: ProbabilityOperation) => void;
    onResultCalculated: (result: ProbabilityResponse | undefined) => void;
}

const ProbabilityForm: React.FC<ProbabilityFormProps> = ({ selectedOperation,
    onOperationChange,
    onResultCalculated }) => {
    const [numbers, setNumbers] = useState<string[]>(["0", "0"]);
    const [errors, setErrors] = useState<boolean[]>([false, false]);
    const [loading, setLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const handleInputChange = (index: number, value: string) => {
        onResultCalculated(undefined);

        const newNumbers = [...numbers];
        const newErrors = [...errors];

        newNumbers[index] = value;
        newErrors[index] = !isValidProbability(value);

        setNumbers(newNumbers);
        setErrors(newErrors);
    };

    const handleSelectChange = (key: string) => {
        const value = ProbabilityOperation[key as keyof typeof ProbabilityOperation];
        onOperationChange(value);
        onResultCalculated(undefined);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(null);
        if (!errors.some(error => error)) {
            setLoading(true);
            try {
                const response = await getProbability({
                    num1: parseFloat(numbers[0]),
                    num2: parseFloat(numbers[1]),
                    operation: selectedOperation
                });
                onResultCalculated(response);
            } catch (error) {
                console.error(error);
                setApiError("An error occurred while calculating the probability.");
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
                                error={errors[index]}
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
