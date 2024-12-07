# Financial Metrics Calculation Project - Coding Challenge

This project calculates important financial metrics, including:
- **Revenue**: The total sales revenue.
- **Expenses**: The total operational expenses.
- **Gross Profit Margin**: Measures the profitability based on revenue and cost of goods sold.
- **Net Profit Margin**: Measures overall profitability by accounting for all expenses.
- **Working Capital Ratio**: An indicator of a company's short-term liquidity.

## Features
- Ability to calculate the key financial metrics from given data
- Can be customized for different sets of financial data
- Provides clear outputs for better understanding of financial health

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   git clone <repository-url>
  
2. Navigate to the project directory:

cd <project-folder>

3. Install dependencies using npm:

npm install

## Usage
Once you've set up the project, you can run it using ts-node:

npx ts-node src/index.ts

## This will calculate and output the following metrics based on the provided data:

Revenue
Expenses
Gross Profit Margin
Net Profit Margin
Working Capital Ratio

Example Output 

Revenue: $32,431
Expenses: $36,530
Gross Profit Margin: 0.0%
Net Profit Margin: -12.6%
Working Capital Ratio: 118.8%


## Project Structure
CODING-CHALLENGE/ ├── src/ │ ├── index.ts # Main program entry │ │ │ ├── metrics/ │ │ ├── expenses-calculations.ts # Expenses calculation function │ │ ├── revenue-calculations.ts # Revenue calculation function │ │ ├── gross-profit-margin-calculations.ts # Gross Profit Margin calculation function │ │ ├── net-profit-margin-calculations.ts # Net Profit Margin calculation function │ │ ├── working-capital-ratio-calculations.ts # Working Capital Ratio calculation function │ │ │ ├── testParser.ts # Parse data function │ ├── utils.ts # Utility functions (e.g., formatting tools) │ └── types/ │ ├── types.ts # Data type definitions │ ├── tests/ │ ├── utils.ts # Unit tests for utility functions │ ├── data/ │ └── data.json # JSON data file ├── .gitignore # Ignore node_modules and other files ├── jest.config.js # Jest configuration ├── package.json # Project metadata and scripts ├── package-lock.json # package-lock.json file for managing dependencies ├── tsconfig.json # TypeScript configuration └── README.md # Project documentation



