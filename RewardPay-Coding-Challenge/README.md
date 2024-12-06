# RewardPay Coding Challenge

## Project Overview
This project is part of the `RewardPay` coding challenge. The task involves parsing a JSON file to calculate the following accounting metrics:
1. **Revenue**
2. **Expenses**
3. **Gross Profit Margin**
4. **Net Profit Margin**
5. **Working Capital Ratio**

The project is built using **TypeScript**, managed with **Yarn**, and adheres to modular coding practices, including unit tests and formatted output.

## Project Structure
```
RewardPay-Challenge/
├── src/
│   ├── index.ts          # Main program entry
│   ├── calculations.ts   # Core calculation logic
│   ├── utils.ts          # Utility functions (e.g., formatting tools)
│   └── types.ts          # Data type definitions
├── tests/
│   ├── calculations.test.ts # Unit tests for calculations
│   ├── utils.test.ts        # Unit tests for utility functions
├── data/
│   └── data.json        # JSON data file
├── .gitignore           # Ignore node_modules and other files
├── jest.config.js       # Jest configuration
├── package.json         # Project metadata and scripts
├── tsconfig.json        # TypeScript configuration
├── yarn.lock            # Yarn lockfile for dependencies
└── README.md            # Project documentation
```


## Usage
### 1. Clone the Repository
```bash
git clone <url>
cd RewardPay-Coding-Challenge
```
### 2. Install the Dependencies
```bash
yarn install 
```
### 3. Execution
To execute the main program:
```bash
yarn start
```
### 4. Running Tests
To run the unit tests:
```bash
yarn test
```
