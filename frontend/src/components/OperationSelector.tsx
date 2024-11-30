import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { ProbabilityOperation } from "../models/probabilityModel";

interface OperationSelectorProps {
    operations: ProbabilityOperation[];
    onSelectChange: (value: ProbabilityOperation) => void;
}

const OperationSelector = ({ operations, onSelectChange }: OperationSelectorProps) => {
    return (
        <FormControl>
            <FormLabel id="operations-label">Operations</FormLabel>
            <RadioGroup
                row
                aria-labelledby="calculation-functions-label"
                name="calculation-functions-radio-buttons-group"
                onChange={(event) => onSelectChange(event.target.value as ProbabilityOperation)}
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