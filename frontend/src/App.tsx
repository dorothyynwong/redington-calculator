import { useState } from 'react';
import ProbabilityForm from './components/ProbabilityForm';
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
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', textAlign: 'center' }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Probability Calculator
        </Typography>
        <ProbabilityForm
          selectedOperation={selectedOperation}
          onOperationChange={setSelectedOperation}
          onResultCalculated={handleResultCalculated}
        />
        <Box sx={{ my:1, minHeight: '10vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {result ? (
            <ResultDisplay
              result={result.calculatedValue.toString()}
              operation={selectedOperation}
            />
          )  :<></>}
        </Box>
      </Box>
    </Container>
  );
};

export default App;
