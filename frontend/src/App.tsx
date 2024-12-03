import { useState } from 'react';
import './App.css'
import ProbabilityForm from './components/ProbabilityForm'
import { ProbabilityOperation, ProbabilityResponse } from './models/probabilityModel';
import { Box, Container, Typography } from '@mui/material';
import ResultDisplay from './components/ResultDisplay';

const App = () => {
  const [result, setResult] = useState<ProbabilityResponse | undefined>(undefined);
  const [selectedOperation, setSelectedOperation] = useState<ProbabilityOperation>(ProbabilityOperation.CombinedWith);

  const handleResultCalculated = (calculatedResult: ProbabilityResponse | undefined) => {
    setResult(calculatedResult);
  };

  return (
    <Container maxWidth="sm">
    <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
            Probability Calculator
        </Typography>
        <ProbabilityForm 
            selectedOperation={selectedOperation}
            onOperationChange={setSelectedOperation}
            onResultCalculated={handleResultCalculated} 
        />
        {result && (
            <ResultDisplay 
                result={result.calculatedValue.toString()} 
                operation={selectedOperation} 
            />
        )}
    </Box>
</Container>
  )
}

export default App
