```markdown
# RewardPay Coding Challenge

## Overview

This project implements the RewardPay coding challenge, calculating and displaying essential accounting metrics based on data from a JSON file. It follows a modular approach, includes unit tests, and ensures maintainable and scalable code.

## Features

- Reads data from `data.json` for calculations.
- Computes the following accounting metrics:
  1. Revenue
  2. Expenses
  3. Gross Profit Margin
  4. Net Profit Margin
  5. Working Capital Ratio
- Uses Jest for unit testing and Babel for transpiling ES6+ code.
- Modular structure for ease of development and testing.

## Requirements

- Node.js (>=14.x)
- npm (>=6.x)
```

## Installation

1. Clone the repository:

   ```bash
   git clone [Repo-link](https://github.com/Srijan1231/coding-challenge.git)
   cd coding-challenge
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

### Run the Application

To execute the program:

```bash
npm start
```

### Run in Development Mode

For live reload during development:

```bash
npm run dev
```

### Run Tests

To execute the test suite:

```bash
npm test
```

## Project Structure

```
src/
│
├── data/                          # Contains data files
│   └── data.json                  # Input JSON file for calculations
│
├── metrics/                       # Contains metric calculation logic
│   ├── Expenses.js                # Logic for expenses calculation
│   ├── GrossProfitMargin.js       # Logic for gross profit margin calculation
│   ├── NetProfitMargin.js         # Logic for net profit margin calculation
│   ├── Revenue.js                 # Logic for revenue calculation
│   └── WorkingCapitalRatio.js     # Logic for working capital ratio calculation
│
├── util/                          # Contains utility functions
│   ├── Formater.js                # For formatting currency and percentages
│   └── ReadDataFile.js            # For reading and parsing the JSON file
│
└── index.js                       # Main entry point of the application
```

```
tests/
│
└── src/
    ├── metrics/                   # Unit tests for metrics
    │   ├── Expenses.test.js
    │   ├── GrossProfitMargin.test.js
    │   ├── NetProfitMargin.test.js
    │   ├── Revenue.test.js
    │   └── WorkingCapitalRatio.test.js
    └── index.test.js              # Test for application entry point
```

## Accounting Metrics

1. **Revenue**:  
   Sum of `total_value` for all entries with `account_category` = `revenue`.

2. **Expenses**:  
   Sum of `total_value` for all entries with `account_category` = `expense`.

3. **Gross Profit Margin**:  
   Formula: `(Sales Debit / Revenue) * 100`

4. **Net Profit Margin**:  
   Formula: `((Revenue - Expenses) / Revenue) * 100`

5. **Working Capital Ratio**:  
   Formula: `(Assets / Liabilities) * 100`

## Formatting

- **Currency**: Prefixed with `$`, no decimals, and commas for thousands.
- **Percentage**: Prefixed with `%` and formatted to one decimal place.

### Example Output

```
Revenue: $519,169
Expenses: $411,664
Gross Profit Margin: 22.1%
Net Profit Margin: 21.0%
Working Capital Ratio: 95.0%
```

## Development Tools

- **Node.js**: JavaScript runtime.
- **Jest**: Test framework.
- **Babel**: For using modern JavaScript features.

## Author

**Srijan Dahal**  
[LinkedIn](https://www.linkedin.com/in/srijan21/) | [Website](https://www.dahalsrijan.com.np/)

## License

This project is licensed under the ISC License.

```

You can copy this file and save it as `README.md` in your project directory. Let me know if you'd like further adjustments!
```
