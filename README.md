# RewardPay Coding Challenge

## Getting Started

To run this project, ensure you have Node.js installed on your machine.

### Installation
Clone this repository and navigate to the project folder:
```bash
git clone https://github.com/<your-username>/coding-challenge.git
cd coding-challenge
```
## Install dependencies (if applicable):
```bash
npm install
```
## Usage
Run the project:
```bash
node challenge.js
```
### Outputs
The program calculates and prints the following metrics:

1. Revenue
2. Expenses
3. Gross Profit Margin
4. Net Profit Margin
5. Working Capital Ratio

## Thought Process

- **Approach to the Problem**: I started by breaking down the challenge into smaller, testable functions (e.g., calculating revenue, expenses). This modular approach ensures maintainability and makes debugging easier.
- **Assumptions**: 
  - I assumed that all accounts with `account_category: revenue` are guaranteed to have a `total_value` field.
  - Missing or malformed data would not be processed, as this was not specified in the challenge.
- **Design Decisions**:
  - I chose to use `Node.js` and vanilla JavaScript to keep the implementation lightweight and straightforward.
  - Used a single script (`challenge.js`) for simplicity but made it modular to allow for future enhancements.
- **Challenges**:
  - Ensuring currency formatting was consistent across all outputs required additional formatting functions.
  - Handling edge cases like missing or zero `total_value` fields was considered but ultimately left out due to time constraints.
  - 
## Future Improvements

- **Error Handling**:
  - Currently, the program assumes all data is valid. Adding validation checks for `total_value` and other fields would make the code more robust.
- **Scalability**:
  - Refactor the code to process data streams instead of in-memory JSON, to handle larger datasets.
- **More Comprehensive Testing**:
  - Add test cases for edge scenarios, such as missing fields or unexpected account categories.
- **Dynamic Data Sources**:
  - Allow the script to fetch data from an API or database instead of a static file.
  
## Reflections

- This challenge helped me brush up on financial calculations and practice good software engineering principles like modularity and testability.
- I particularly enjoyed implementing the percentage formatting, as it required careful consideration of both precision and user-friendly output.
- If given more time, I would focus on improving error handling and adding additional test cases for edge scenarios.

## Testing
Run the unit tests with:
```bash
npm test
```
**Assumptions and Design Decisions**
```markdown
## Assumptions and Design Decisions

- All calculations are based on the `data.json` file provided.
- Revenue and expense values are rounded to the nearest integer.
- Outputs follow the specified formatting for currency and percentages.
```
