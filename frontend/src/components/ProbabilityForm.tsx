import { useState } from "react";
import { ProbabilityOperation, ProbabilityResponse } from "../models/probabilityModel";
import { getProbability } from "../api/probabilityAPI";
import { Box, Button, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import OperationSelector from "./OperationSelector";
import ResultDisplay from "./ResultDisplay";

const ProbabilityForm = () => {
    const [numbers, setNumbers] = useState<string[]>(["0", "0"]);
    const [errors, setErrors] = useState<boolean[]>([false, false]);
    const [result, setResult] = useState<ProbabilityResponse>();
    const [selectedOperation, setSelectedOperation] = useState<ProbabilityOperation>(ProbabilityOperation.CombinedWith);

    const handleInputChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setResult(undefined);
        const value = e.target.value;
        const numericValue = parseFloat(value);
        const newNumbers = [...numbers];
        const newErrors = [...errors];
        newNumbers[index] = value;
        newErrors[index] = value === "" || (numericValue >= 0 && numericValue <= 1) ? false : true;
        setNumbers(newNumbers);
        setErrors(newErrors);
    };

    const handleSelectChange = (key: string) => {
        const value = ProbabilityOperation[key as keyof typeof ProbabilityOperation];
        setSelectedOperation(value);
        setResult(undefined); 
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!errors.some(error => error)) {
            getProbability({ num1: parseFloat(numbers[0]), num2: parseFloat(numbers[1]), operation: selectedOperation })
                .then((response) => {
                    setResult(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {numbers.map((_, index) => (
                        <Grid size={6} key={index}>
                            <TextField
                                label={`Probability ${index + 1}`}
                                type="number"
                                value={numbers[index]}
                                onChange={handleInputChange(index)}
                                fullWidth
                                variant="outlined"
                                error={errors[index]}
                                helperText={errors[index] ? "Value must be between 0 and 1" : ""}
                                slotProps={{ htmlInput: { step: 0.01 } }}
                            />
                        </Grid>
                    ))}
                    <Grid size={12}>
                        <OperationSelector
                            operations={Object.keys(ProbabilityOperation)}
                            onSelectChange={handleSelectChange}
                            label="Select Probability Operation"
                        />
                    </Grid>
                    <Grid size={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Calculate
                        </Button>
                    </Grid>
                </Grid>
                <Grid size={12}>
                    { result &&
                        <ResultDisplay 
                            result={result ? result.result.toString() : ''} 
                            operation={selectedOperation} 
                        />
        }
                </Grid>
            </Box>
        </form>
    );
};

export default ProbabilityForm;
