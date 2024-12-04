## Manual Test Test Cases

### Normal Tests

#### Setup
1. Start frontend
2. Start backend

**Expected Result**
- Heading, probability form, and calculate button are displayed, with no result before clicking the button
- **Redington Calculator has started.** is recorded to logs\probability\YYYY-MM-DD.log under bin directory

#### Test 1 - Normal case for CombinedWith
**Input**
- Probability 1: 0.5
- Probability 2: 0.5
- Calculation Function: unchanged (default is CombinedWith)

**Expected Result**
- Shows **Result for CombinedWith 0.25**
- Log entry for **Result for CombinedWith of 0.5 and 0.5 is 0.25** is recorded to logs\probability\YYYY-MM-DD.log
- No error or log in browser console
- While using web browser, the step of the numeric fields should be 0.01

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

**Steps and Expected Result**
1. Result is **0.06** after Calculation button is clicked
2. Changed Calculation Function to Either, result is **0.44** 
3. Changed Calculation Function back to CombinedWith, result is **0.06**

- Result should be disappeared after each switch of calculation function
- No error or log in browser console

#### Test 4 - Change probabilities numbers

**Step 1 Input**
- Probability 1: 0.2
- Probability 2: 0.3
- Calculation Function: Either

**Step 2 Input**
- Change Probability 1 to 0.4
- Change Probability 2 to 0.7
- Calculation Function remains Either

**Expected Result**
- Result should be **0.44 and 0.82** and all should be recorded to log properly
- Result should be disappeared whenever the Probability fields are changed
- No error or log in browser console

### Failure Tests

#### Test 1 - Probability 1 out of range with CombinedWith
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

#### Test 2 - Probability 1 out of range with CombinedWIth
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

#### Test 3 - Probability 2 out of range with Either
**Input**
- Probability 1: 0.5
- Probability 2: 1.00000000001
- Calculation Function: unchanged (default is CombinedWith)

**Expected Result**
- **Value must be between 0 and 1** is displayed at Probability 2, no error at Probability 1
- No result is shown after Calculate
- No log should be recorded
- No error or log in browser console

#### Test 4 - Probability 2 out of range with Either
**Input**
- Probability 1: 0.5
- Probability 2: -0.00000000001
- Calculation Function: unchanged (default is CombinedWith)

**Expected Result**
- **Value must be between 0 and 1** is displayed at Probability 2, no error at Probability 1
- No result is shown after Calculate
- No log should be recorded
- No error or log in browser console

### Failure Tests with server problem

#### Test 1 - Error if backend server not started
#### Setup
1. Start frontend
2. Do not start backend
3. Heading, probability form, and calculate button are displayed, with no result under Calculate button

**Input**
- Probability 1: 0.5
- Probability 2: 0.5
- Calculation Function: unchanged (default is CombinedWith)

**Expected Result**
- Circular loading bar is displayed
- Alert **An unexpected error occurred. Please try again.** is shown under the Calculate button after a while
- **ERR_CONNECTION_REFUSED** is shown in browser console 

#### Test 2 - Error when invalid probabilities are got in backend
1. Start frontend
2. Start debug at backend, set breakpoint at Calculate method in ProbabilityService at line 
    ```bash
    if (num1 < 0 || num1 > 1 || num2 < 0 || num2 > 1)
    ```
3. Input valid values in at frontend
4. change the value of num1 to 2 in debugger variables
5. continue the debug

**Expected Result**
- Alert **Invalid request. Please check your input.** is shown under the Calculate button after a while
- **400 error** is shown in browser console