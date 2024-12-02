import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

interface OperationSelectorProps {
    operations: string[];
    onSelectChange: (value: string) => void;
    label: string;
}

const OperationSelector:React.FC<OperationSelectorProps> = ({ operations, onSelectChange, label }) => {
    return (
        <FormControl>
            <FormLabel id="operations-label" aria-label="Operation Selector">{label}</FormLabel>
            <RadioGroup
            row
            aria-labelledby="operations-label"
            name="calculation-functions-radio-buttons-group"
            defaultValue={operations[0] as string}
            onChange={(event) => onSelectChange(event.target.value)}
            >
            {operations.map((operation) => (
                <FormControlLabel
                key={operation}
                value={operation}
                control={<Radio />}
                label={operation}
                />
            ))}
            </RadioGroup>
        </FormControl>
    );
};

export default OperationSelector;