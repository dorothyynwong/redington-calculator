import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

interface OperationSelectorProps<T> {
    operations: T[];
    onSelectChange: (value: T) => void;
    label: string;
}

const OperationSelector = <T,>({ operations, onSelectChange, label }: OperationSelectorProps<T>) => {
    return (
        <FormControl>
            <FormLabel id="operations-label">{label}</FormLabel>
            <RadioGroup
                row
                aria-labelledby="calculation-functions-label"
                name="calculation-functions-radio-buttons-group"
                onChange={(event) => onSelectChange(event.target.value as T)}
            >
                {operations.map((operation) => (
                    <FormControlLabel
                        key={operation as string}
                        value={operation as string}
                        control={<Radio />}
                        label={operation as string}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default OperationSelector;