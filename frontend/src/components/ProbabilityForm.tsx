import { ProbabilityOperation, ProbabilityResponse } from "../models/probabilityModel";
import { Box, Button, CircularProgress, Alert } from "@mui/material";
import Grid from '@mui/material/Grid2';
import OperationSelector from "./OperationSelector";
import NumericInput from "./NumericInput";
import { useProbabilityForm } from "../hooks/useProbabilityForm";
import { useProbabilityAPI } from "../hooks/useProbabilityAPI";

interface ProbabilityFormProps {
    selectedOperation: ProbabilityOperation;
    onOperationChange: (operation: ProbabilityOperation) => void;
    onResultCalculated: (result: ProbabilityResponse | undefined) => void;
}

const ProbabilityForm: React.FC<ProbabilityFormProps> = ({ selectedOperation,
    onOperationChange,
    onResultCalculated }) => {

    const { numbers, inputErrors, handleInputChange, hasErrors } = useProbabilityForm(() =>
        onResultCalculated(undefined)
    );
    const { calculateProbability, loading, apiError } = useProbabilityAPI();

    const handleSelectChange = (key: string) => {
        const value = ProbabilityOperation[key as keyof typeof ProbabilityOperation];
        onOperationChange(value);
        onResultCalculated(undefined);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!hasErrors) {
            const response = await calculateProbability(
                parseFloat(numbers[0]),
                parseFloat(numbers[1]),
                selectedOperation
            );
            onResultCalculated(response);
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
                                step={0.01}
                                helperText="Value must be between 0 and 1"
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
