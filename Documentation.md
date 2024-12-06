# RewardPay Coding Challenge

## Overview

This TypeScript application reads accounting data from a JSON file and calculates key financial metrics, including revenue, expenses, profit margins, and the working capital ratio.

## Features

- Parses financial data from JSON files
- Calculates five essential financial metrics:
  - Revenue
  - Expenses
  - Gross Profit Margin
  - Net Profit Margin
  - Working Capital Ratio
- Formats output with proper currency and percentage styling
- Provides comprehensive test coverage
- Enforces strict type checking with TypeScript

## Prerequisites

- Node.js (v18.x or v20.x)
- npm (comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
npm install
```

## Usage

Run the application:

```bash
npm start
```
Example output:

```
Revenue: $32,431
Expenses: $36,529
Gross Profit Margin: 0.0%
Net Profit Margin: -12.6%
Working Capital Ratio: 118.8%
```

## Build the Application

To build the application, run:

```bash
npm run build
```

## Run Tests

To run the test suite, execute:

```bash
npm test
```

## Type Checking

To perform type checking, run:

```bash
npx tsc --noEmit
```

## Project Structure

- **src/**: Contains the source code for the application
  - **index.ts**: Main application entry point
  - **calculations.ts**: Functions for financial calculations
  - **format.ts**: Functions for formatting currency and percentage values
- **tests/**: Contains test suites
  - **calculation.test.ts**: Tests for calculation functions
  - **format.test.ts**: Tests for formatting functions
- **data/**: Contains data files
  - **data.json**: Sample financial data
- **types/**: Contains TypeScript type definitions
  - **index.d.ts**: Type definitions for financial data structures
- **.github/workflows/**: Contains CI/CD configuration
  - **ci.yml**: GitHub Actions workflow for continuous integration
- **Documentation.md**: Detailed project documentation
- **README.md**: General project overview and instructions
- **package.json**: Project metadata and dependencies
- **tsconfig.json**: TypeScript compiler configuration
- **jest.config.js**: Jest testing framework configuration
- **.gitignore**: Specifies files to be ignored by Git

## Testing

The project includes comprehensive test coverage for:

- **Financial Calculations** (`tests/calculation.test.ts`):

  - **Total Revenue Calculation**: Verifies revenue entries are summed correctly and handles cases with no revenue data.
  - **Total Expenses Calculation**: Checks that expense entries are summed accurately and handles absence of expense data.
  - **Gross Profit Margin Calculation**: Tests correct percentage calculation based on sales and revenue, including zero revenue scenarios.
  - **Net Profit Margin Calculation**: Validates accurate percentage calculation based on revenue and expenses, with error handling for zero revenue.
  - **Working Capital Ratio Calculation**: Ensures correct computation based on assets and liabilities, including error handling when liabilities are zero.

- **Formatting Functions** (`tests/format.test.ts`):

  - **Currency Formatting**: 
    - Formats numbers with `$` prefix and proper comma separators.
    - Removes cents from currency values.
    - Handles small numbers and zero correctly.
  - **Percentage Formatting**:
    - Formats percentages with one decimal place and `%` suffix.
    - Tests correct rounding behavior.
    - Handles whole numbers and zero appropriately.

Run the test suite:

```bash
npm test
```

## CI/CD

The project includes a Continuous Integration workflow configured with GitHub Actions (`.github/workflows/ci.yml`). This workflow automates the following tasks on every push or pull request to the `main` and `rewardpay-patrick` branches:

- **Build**: Compiles the TypeScript code using `npm run build`.
- **Type Checking**: Ensures type safety by running `tsc --noEmit`.
- **Testing**: Executes all unit tests with `npm test`.
- **Artifact Generation**: Uploads build artifacts for future reference.

### Supported Node.js Versions

- 18.x

The CI workflow uses Node.js version 18.x to ensure compatibility.


## License

ISC

## Author

Patrick Nguyen - [http://patrickdevs.vercel.app/](http://patrickdevs.vercel.app/)