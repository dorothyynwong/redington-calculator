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
- No error or log in browser console

#### Test 2 - Normal case for Either
**Input**
- Probability 1: 0.5
- Probability 2: 0.5
- Calculation Function: Either

**Expected Result**
- Shows **Result for Either 0.75**
- Log entry for **Result of Either of 0.5 and 0.5 is 0.75** is recorded to logs\probability\YYYY-MM-DD.log properly.
- No error or log in browser console

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
- No error or log in browser console

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
- No error or log in browser console

### Failure Tests

#### Test 1 - Probability 1 out of range
**Input**
- Probability 1: 1.00000001
- Probability 2: 0.5
- Calculation Function: unchanged (default is CombinedWith)
- No error or log in browser console

**Expected Result**
- **Value must be between 0 and 1** is displayed at Probability 1, no error at Probability 2
- No result is shown after Calculate
- No log should be recorded
- No error or log in browser console

#### Test 2 - Probability 1 out of range
**Input**
- Probability 1: -0.00000000001
- Probability 2: 0.5
- Calculation Function: unchanged (default is CombinedWith)
- No error or log in browser console

**Expected Result**
- **Value must be between 0 and 1** is displayed at Probability 1, no error at Probability 2
- No result is shown after Calculate
- No log should be recorded
- No error or log in browser console

#### Test 3 - Probability 2 out of range
**Input**
- Probability 1: 0.5
- Probability 2: 1.00000000001
- Calculation Function: unchanged (default is CombinedWith)

**Expected Result**
- **Value must be between 0 and 1** is displayed at Probability 2, no error at Probability 1
- No result is shown after Calculate
- No log should be recorded
- No error or log in browser console

#### Test 4 - Probability 2 out of range
**Input**
- Probability 1: 0.5
- Probability 2: -0.00000000001
- Calculation Function: unchanged (default is CombinedWith)

**Expected Result**
- **Value must be between 0 and 1** is displayed at Probability 2, no error at Probability 1
- No result is shown after Calculate
- No log should be recorded
- No error or log in browser console

### Failure Tests with connection problem

#### Setup
1. Start frontend server.
2. Do not start backend.
3. Heading, probability form, and calculate button are displayed properly, with no result before clicking the button.

#### Test 1 - Error if backend server not started
**Input**
- Probability 1: 0.5
- Probability 2: 0.5
- Calculation Function: unchanged (default is CombinedWith)

**Expected Result**
- Circular loading bar is displayed
- Alert **An unexpected error occurred. Please try again.** is shown under the Calculate button after a while
- **ERR_CONNECTION_REFUSED** is shown in browser console 