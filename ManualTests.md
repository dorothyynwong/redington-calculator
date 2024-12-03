## Manual Test Test Cases

### Normal Tests

#### Setup
1. Start frontend server.
2. Start backend server.
3. Heading, probability form, and calculate button are displayed properly, with no result before clicking the button.

#### Test 1 - Normal case for CombinedWith
**Input**
- Probability 1: 0.5
- Probability 2: 0.5
- Calculation Function: unchanged (default is CombinedWith)

**Expected Result**
- Shows **Result for CombinedWith 0.25**
- Log entry for **Result for CombinedWith of 0.5 and 0.5 is 0.25** is recorded to logs\probability\YYYY-MM-DD.log properly.

#### Test 2 - Normal case for Either
**Input**
- Probability 1: 0.5
- Probability 2: 0.5
- Calculation Function: Either

**Expected Result**
- Shows **Result for Either 0.75**
- Log entry for **Result of Either of 0.5 and 0.5 is 0.75** is recorded to logs\probability\YYYY-MM-DD.log properly.

#### Test 3 - Switch back and forth between CombinedWith and Either
**Input**
- Probability 1: 0.2
- Probability 2: 0.3
- Calculation Function: CombinedWith
- Calculation Function: Either
- Calculation Function: CombinedWith

**Expected Result**
- Result should be **0.06, 0.44 and then 0.06** and all should be recorded to log properly
- Result should be disappeared after each switch of calculation function

#### Test 4 - Change probabilities
**Input**
- Probability 1: 0.2
- Probability 2: 0.3
- Calculation Function: Either
- Probability 1: 0.4
- Probability 2: 0.7

**Expected Result**
- Result should be **0.44 and 0.82** and all should be recorded to log properly
- Result should be disappeared whenever the Probability fields are changed