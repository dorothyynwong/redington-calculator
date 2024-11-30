import { useState } from "react";
import { ProbabilityOperation, ProbabilityResponse } from "../models/probabilityModel";
import { getProbability } from "../api/probabilityAPI";
import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import OperationSelector from "./OperationSelector";

const ProbabilityCalculationForm = () => {
    const [num1, setNum1] = useState("0");
    const [num2, setNum2] = useState("0");
    const [result, setResult] = useState<ProbabilityResponse>();
    const [num1Error, setNum1Error] = useState<boolean>(false);
    const [num2Error, setNum2Error] = useState<boolean>(false);
    const [calculationFunction, setCalculationFunction] = useState<ProbabilityOperation>(ProbabilityOperation.CombinedWith);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>,
        setError: React.Dispatch<React.SetStateAction<boolean>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const numericValue = parseFloat(value);
            setter(value);
            setError(value === "" || (numericValue >= 0 && numericValue <= 1) ? false : true);
        };

    const handleNum1Change = handleInputChange(setNum1, setNum1Error);
    const handleNum2Change = handleInputChange(setNum2, setNum2Error);

    const handleSelectChange = (key: string) => {
        const value = ProbabilityOperation[key as keyof typeof ProbabilityOperation];
        setCalculationFunction(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!num1Error && !num2Error) {
            getProbability({ num1: parseFloat(num1), num2: parseFloat(num2), operation: calculationFunction })
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
                    {["Probability 1", "Probability 2"].map((label, index) => (
                        <Grid size={6} key={label}>
                            <TextField
                                label={label}
                                type="number"
                                value={index === 0 ? num1 : num2}
                                onChange={index === 0 ? handleNum1Change : handleNum2Change}
                                fullWidth
                                variant="outlined"
                                error={index === 0 ? num1Error : num2Error}
                                helperText={index === 0 ? (num1Error ? "Value must be between 0 and 1" : "") : (num2Error ? "Value must be between 0 and 1" : "")}
                            />
                        </Grid>
                    ))}
                    <Grid size={12}>
                        <OperationSelector 
                            operations={Object.values(ProbabilityOperation)}
                            onSelectChange={handleSelectChange} 
                        />
                    </Grid>
                    <Grid size={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Calculate
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {result !== null && (
                <Typography variant="h6" style={{ marginTop: "20px" }}>
                    Result: {result?.result}
                </Typography>
            )}
        </form>
    );
};

export default ProbabilityCalculationForm;