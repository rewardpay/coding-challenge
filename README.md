# RewardPay Coding Challenge — Kateryna Bilokur

## Overview

This is a Node.js application that calculates 5 key financial metrics, including **Revenue**, **Expenses**, **Gross Profit Margin**, **Net Profit Margin**, and **Working Capital Ratio**, based on data from a provided in `data.json` file.

## Features

- 📊 Calculate financial metrics from JSON data
- 🧩 Modular, testable codebase using Vitest
- 🖥️ Command-line-based for easy execution
- 🔧 Supports adding new metrics with minimal changes
- 📁 Output calculated results into a file with an easy to read formatting

## Assumptions During Development

- Print results to the file instead of a simple console for better outcome usage and visibility
- JavaScript selected. Assumed "of" is a typo of "or" in the `Please use JavaScript of TypeScript...` challenge overview
- **Working Capital Ratio** was calculated exactly as it was given in the description. Potentially there is a typo of what should be subtracted in `liabilities` calculation. Given `credit` - `debit` but possible should be visa versa. In real project should be verified

## Technologies Used

- **JavaScript**: Core logic and application
- **Node.js v20.17.0**: Application runtime
- **Nodemon**: Development server auto-reloading
- **Vitest**: Unit testing framework

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/katyabilokur/rewardpay-coding-challenge.git
   ```

2. Navigate to the project folder:

   ```bash
   cd rewardpay-coding-challenge
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

### Run the Application:

```bash
npm start
```

### Calculate Metrics:

On running the app, it will read the `data.json` file from `data` folder, do the accounting metrics calculations and output key financial metrics to the `result.txt` file in `output` folder.

To view calculated metrics run

```bash
cd output
cat result.txt
```

The result will come in this format. Note, this is just an example, not the exact calculations

```
Accounting metrics calculated for 14/09/2023 in AUD

                  Revenue:  $42,151
                 Expenses:  $67,570
      Gross Profit Margin:  0.5%
        Net Profit Margin:  15.8%
    Working Capital Ratio:  89%
```

It also includes header information about the currency and date

## Testing

Vitest was used for unit tests. To run unit tests suits:

```bash
npm test
```

## Future Improvements

- 🛠️ Add a command-line interface (CLI)
- 📈 Support additional financial metrics
- 🔗 Integrate data from external APIs
- 🔎 Input data.json file validation
- 📂 Add arguments support. For example file selection from command-line
- ⛑ Add GitHub Action to run Unit Tests on each push to the repository

**Thank you and hope to see in person on the next interview stage.**
