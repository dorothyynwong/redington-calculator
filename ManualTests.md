## Manual Test Test Cases

### Normal Tests

#### Setup
1. Start frontend server.
2. Start backend server.

#### Test 1
**Input**
- Probability 1: 0.5
- Probability 2: 0.5
- Calculation Function: unchanged (default is CombinedWith)

**Expected Result**
- Heading, probability form, and calculate button are displayed properly, with no result before clicking the button.
- After clicking the "Calculate" button, shows **Result for CombinedWith 0.25**
- Log entry for **Result for CombinedWith of 0.5 and 0.5 is 0.25** is recorded to logs\probability\YYYY-MM-DD.log properly.

#### Test 2
**Input**
- Probability 1: 0.5
- Probability 2: 0.5
- Calculation Function: Either

**Expected Result**
- Heading, probability form, and calculate button are displayed properly, with no result before clicking the button.
- After clicking the "Calculate" button, shows **Result for Either 0.75**
- Log entry for **Result for Either 0.75** is recorded to logs\probability\YYYY-MM-DD.log properly.