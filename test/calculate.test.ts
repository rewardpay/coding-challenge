import { 
    getExpense, 
    getGrossProfitMargin, 
    getNetProfitMargin, 
    getRevenue, 
    getWorkingCapitalRatio 
} from "../src/calculate";
import { Account } from "../src/types";

//test getRevenue
describe ("getRevenue", () => {
    it ("get revenue correct", () => {
        const testData = [
            {account_category: "expense", total_value: 100},
            {account_category: "revenue", total_value: 100},
            {account_category: "revenue", total_value: 100},
        ] as Account[];

        const result = getRevenue(testData);
        expect(result).toBe(200);
    });

    it ("return 0 if no revenue account", () => {
        const testData = [
            {account_category: "expense", total_value: 100},
            {account_category: "expense", total_value: 100},
            {account_category: "expense", total_value: 100},
        ] as Account[];

        const result = getRevenue(testData);
        expect(result).toBe(0);
    });
});

//test getExpense
describe("getExpense", () => {
    it ("get expenses correct", () => {
        const testData = [
            {account_category: "expense", total_value: 100},
            {account_category: "expense", total_value: 100},
            {account_category: "revenue", total_value: 100},
        ] as Account[];

        const result = getExpense(testData);
        expect(result).toBe(200);
    });

    it ("return 0 if no expense account", () => {
        const testData = [
            {account_category: "revenue", total_value: 100},
            {account_category: "revenue", total_value: 100},
            {account_category: "revenue", total_value: 100},
        ] as Account[];

        const result = getExpense(testData);
        expect(result).toBe(0);
    });
});

//test getGrossProfitMargin
describe("test getGrossProfitMargin", () => {
    it ("get correct gross profit margin", () => {
        const testData = [
            {account_category: "revenue", total_value: 100, account_type: "sales", value_type: "debit"},
            {account_category: "revenue", total_value: 100, account_type: "sales", value_type: "credit"},
            {account_category: "revenue", total_value: 100, account_type: "sales", value_type: "debit"},
            {account_category: "revenue", total_value: 100, account_type: "sales", value_type: "debit"},
        ] as Account[];
        
        const revenue = 400;
        const result = getGrossProfitMargin(testData, revenue);
        expect(result).toBe(0.75);
    });

    it ("throw error when revenue is 0", () => {
        const testData = [
            {account_category: "expense", total_value: 100, account_type: "sales", value_type: "debit"},
            {account_category: "expense", total_value: 100, account_type: "sales", value_type: "credit"},
            {account_category: "expense", total_value: 100, account_type: "overheads", value_type: "debit"},
            {account_category: "expense", total_value: 100, account_type: "sales", value_type: "debit"},
        ] as Account[];

        const revenue = 0;
        expect(() => getGrossProfitMargin(testData, revenue)).toThrow("Revenue can't be 0.");
    });

    it ("return 0 when no sales account_type exist or accout_type is sales but value_type isnot debit", () => {
        const testData = [
            {account_category: "expense", total_value: 100, account_type: "overheads", value_type: "debit"},
            {account_category: "expense", total_value: 100, account_type: "sales", value_type: "credit"},
            {account_category: "expense", total_value: 100, account_type: "overheads", value_type: "debit"},
            {account_category: "revenue", total_value: 100, account_type: "overheads", value_type: "other"},
        ] as Account[];
        const revenue = 100;
        const result = getGrossProfitMargin(testData, revenue);
        expect(result).toBe(0);
    });
});

//test getNetProfitMargin
describe("test getNetProfitMargin", () => {
    it ("get correct net profit margin", () => {
        const expenses = 100;
        const revenue = 400;
        const result = getNetProfitMargin(revenue, expenses);
        expect(result).toBe(0.75);
    });

    it ("throw error when revenue is 0", () => {
        const expenses = 10;
        const revenue = 0;
        expect(() => getNetProfitMargin(revenue, expenses)).toThrow("Revenue can't be 0.");
    });
});

//test getWorkingCapitalRatio 
describe("test getWorkingCapitalRatio", () => {
    it("calculates the correct working capital ratio with valid data", () => {
        const testData = [
            { account_category: "assets", account_type: "current", value_type: "debit", total_value: 10000 },
            { account_category: "assets", account_type: "bank", value_type: "credit", total_value: 2000 },
            { account_category: "liability", account_type: "current", value_type: "credit", total_value: 5000 },
            { account_category: "liability", account_type: "current_accounts_payable", value_type: "debit", total_value: 1000 },
        ] as Account[];

        const result = getWorkingCapitalRatio(testData);
        expect(result).toBeCloseTo(2.0, 1); 
    });

    it("returns Infinity when liabilities are zero", () => {
        const testData = [
            { account_category: "assets", account_type: "current", value_type: "debit", total_value: 10000 },
            { account_category: "assets", account_type: "bank", value_type: "credit", total_value: 2000 },
        ] as Account[];

        const result = getWorkingCapitalRatio(testData);
        expect(result).toBe(Infinity);
    });
});