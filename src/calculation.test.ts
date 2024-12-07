import { calculations } from "./calculations";

const mockData = {
    data: [
        { account_category: "revenue", total_value: 50000 },
        { account_category: "revenue", total_value: 30000 },
        { account_category: "expense", total_value: 20000 },
        { account_category: "expense", total_value: 15000 },
        { account_category: "assets", total_value: 40000, value_type: "debit", account_type: "current" },
        { account_category: "assets", total_value: 5000, value_type: "credit", account_type: "current" },
        { account_category: "liability", total_value: 10000, value_type: "credit", account_type: "current" },
        { account_category: "liability", total_value: 2000, value_type: "debit", account_type: "current" },
        { account_category: "revenue", total_value: 10000, value_type: "debit", account_type: "sales" },
    ]
};

describe("Calculations:", ()=>{

    const result = calculations(mockData.data);
    it("should calculate Revenue correctly", () => {
        expect(result.revenue).toBe(90000); // 50000 + 30000 + 10000
    });

    it("should calculate Expenses correctly", () => {
        expect(result.expenses).toBe(35000); // 20000 + 15000
    });

    it("should calculate Gross Profit Margin correctly", () => {
        const grossProfitMargin = result.grossProfitMargin
        expect(grossProfitMargin).toBeCloseTo(11.11); // (10000 / 90000) * 100
    });

    it("should calculate Net Profit Margin correctly", () => {
        const netProfitMargin = result.netProfitMargin
        expect(netProfitMargin).toBeCloseTo(61.11); // ((90000 - 35000) / 90000) * 100
    });
    
    it("should calculate Working Capital Ratio correctly", () => {
        const workingCapitalRatio = result.workingCapitalRatio
        expect(workingCapitalRatio).toBeCloseTo(437.5); // (35000 / 8000) * 100
    });
})