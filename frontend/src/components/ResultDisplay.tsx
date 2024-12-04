import { Box, Typography } from "@mui/material";

interface ResultDisplayProps {
    result: string;
    operation: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, operation }) => {
    if (result === "" || operation === "") 
        return (<></>);

    return (
        <Box sx={{ flexGrow: 1 }} aria-label="Result Display">
            <Typography variant="h5" gutterBottom>
                Result for {operation}
            </Typography>
            <Typography variant="h6">{result}</Typography>
        </Box>
    );
};

export default ResultDisplay;