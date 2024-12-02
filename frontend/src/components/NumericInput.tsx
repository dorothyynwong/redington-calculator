import React from "react";
import { TextField } from "@mui/material";

interface NumericInputProps {
    label: string;
    value: string;
    index: number;
    error: boolean;
    onChange: (index: number, value: string) => void;
}

const NumericInput: React.FC<NumericInputProps> = ({ value, label, index, error, onChange }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(index, e.target.value);
    };

    return (
        <TextField
            label={label}
            type="number"
            value={value}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            error={error}
            helperText={error ? "Value must be between 0 and 1" : ""}
            slotProps={{ htmlInput: { step: 0.01 } }}
        />
    );
};

export default NumericInput;
