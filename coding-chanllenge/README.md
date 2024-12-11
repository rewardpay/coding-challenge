# RewardPay Coding Challenge

### Live Demo
The project is live and can be accessed at:
[https://coding-challenge-orcin.vercel.app/](https://coding-challenge-orcin.vercel.app/)

## Overview

This project is a financial metrics calculator that processes general ledger data and displays key accounting metrics through an interactive dashboard. The application calculates and visualizes:

1. Revenue
2. Expenses
3. Gross Profit Margin
4. Net Profit Margin
5. Working Capital Ratio

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/xuqinzhe111/coding-challenge.git
```

2. Navigate to the project directory:

```bash
cd coding-chanllenge    # Important: All commands must be run from this directory
```

3. Install dependencies:

```bash
npm install
# or
pnpm install
```

> ⚠️ **Important**: All commands must be run from the `coding-chanllenge` directory, not the root directory.

### Running the Application

1. Ensure you're in the correct directory:

```bash
pwd    # Should end with /coding-chanllenge
```

2. Start the development server:

```bash
npm run dev
# or
pnpm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Running Tests

Ensure you're in the `coding-chanllenge` directory, then:

To run the test suite:

```bash
npm test
```

To run tests in watch mode:

```bash
npm test -- --watch
```

## Project Structure

```
coding-chanllenge/        # <- You should be in this directory
├── app/                  # Next.js app directory
├── components/           # React components
├── lib/                  # Core business logic
|    └──  _tests_/        # Test files
```

## Features

- Interactive dashboard with metric visualizations
- Responsive design for various screen sizes

## Technical Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- Jest for testing

## Development

The page auto-updates as you edit files. The project uses:
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Recharts](https://recharts.org/) for charts












