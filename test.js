const { readData,formatting } = require("./src/parse");
const { Revenue, Expenses, GrossProfit, NetProfitMargin, WorkingCapitalRatio } = require("./src/calculate");

test("test formatting ", () =>{
    expect(formatting(12345678)).toBe("12,345,678");
});

describe("test Revenue calculation",() => {
    it("test given json",()=>{
        const data = readData("./data.json");
        expect(Revenue(data)).toBe(32431);
    });
    it("should return the correct sum of revenue values", () => {

    const data = [
        { account_category: "revenue", total_value: 100.5 },
        { account_category: "revenue", total_value: 200.4 },
        { account_category: "expense", total_value: 50.0 },
        { account_category: "revenue", total_value: 300 }
    ];

    expect(Revenue(data)).toBe(600)
    });
    it("should return 0 when no revenue items are present", () => {
        const data = [
            { account_category: "expense", total_value: 100.5 },
            { account_category: "expense", total_value: 200.4 }
        ];

        const result = Revenue(data);
        expect(result).toBe(0);
    });

    it("should return 0 for an empty array", () => {
        const data = [];
        const result = Revenue(data);
        expect(result).toBe(0);
    });
    it("should handle mixed data types gracefully", () => {
        const data = [
            { account_category: "revenue", total_value: 123.45 },
            { account_category: "revenue", total_value: "invalid" }, 
            { account_category: "revenue", total_value: null },    
            { account_category: "expense", total_value: 50.0 }
        ];

        const result = Revenue(data);
        expect(result).toBe(123);
    });
});

describe("test expense calculation",()=>{
    it("test given json",()=>{
        const data = readData("./data.json");
        expect(Expenses(data)).toBe(36529);
    });

    it("should return the correct sum of expense values", () => {

        const data = [
            { account_category: "revenue", total_value: 100.5 },
            { account_category: "revenue", total_value: 200.4 },
            { account_category: "expense", total_value: 50000000.59},
            { account_category: "expense", total_value: 1.2 }
        ];
    
        expect(Expenses(data)).toBe(50000001);
        });
    it("should return 0 when no expense items are present", () => {
        const data = [
            { account_category: "revenue", total_value: 100.5 },
            { account_category: "revenue", total_value: 200.4 }
        ];

        expect(Expenses(data)).toBe(0);
    });
    it("should return 0 for an empty array", () => {
        const data = [];
        expect(Expenses(data)).toBe(0);
    });
    it("should handle mixed data types gracefully", () => {
        const data = [
            { account_category: "expense", total_value: 123.45 },
            { account_category: "expense", total_value: "invalid" }, 
            { account_category: "expense", total_value: null },      
            { account_category: "assets", total_value: 50.0 }
        ];

        expect(Expenses(data)).toBe(123);
    });

});

describe("test GrossProfit Margin", () => {
    it("test data json file", () => {
        const data = readData("./data.json");
        expect(GrossProfit(data,Revenue(data))).toBe("0.0");

    });

    it("should return correct value", () => {
        const data = [
            {  account_category: "revenue", account_type: "sales",value_type: "debit", total_value: 100.5 },
            {  account_category: "revenue", account_type: "sales",value_type: "credit", total_value: 50.0 },
            { account_category: "revenue", account_type: "overheads", total_value: 300 }
        ];

        expect (GrossProfit(data,Revenue(data))).toBe("22.3");
    });
    it("should return the correct gross profit percentage", () => {
        const data = [
            { account_type: "sales", value_type: "debit", total_value: 500 },
            { account_type: "sales", value_type: "debit", total_value: 300 },
            { account_type: "expense", value_type: "debit", total_value: 200 },
            { account_type: "sales", value_type: "credit", total_value: 400 }
        ];

        const revenue = 2000;
        expect(GrossProfit(data, revenue)).toBe("40.0"); // (500 + 300) / 2000 * 100 = 40.0
    });

    it("should handle cases with no sales items", () => {
        const data = [
            { account_type: "expense", value_type: "debit", total_value: 200 },
            { account_type: "expense", value_type: "credit", total_value: 300 }
        ];

        const revenue = 2000;
        expect(GrossProfit(data, revenue)).toBe("0.0"); // No sales items, so 0 / 2000 * 100 = 0.0
    });

    it("should ignore null or undefined total_value", () => {
        const data = [
            { account_type: "sales", value_type: "debit", total_value: 500 },
            { account_type: "sales", value_type: "debit", total_value: null },
            { account_type: "sales", value_type: "debit", total_value: undefined },
            { account_type: "sales", value_type: "debit", total_value: 300 }
        ];

        const revenue = 2000;
        expect(GrossProfit(data, revenue)).toBe("40.0"); // (500 + 300) / 2000 * 100 = 40.0
    });

});

describe("Test Net Profit Margin calculation", () => {
    it("test data json file", () => {
        const data = readData("./data.json");
        // const revenue = 32431;
        expect(NetProfitMargin(Revenue(data),Expenses(data))).toBe("-12.6");
    });

    it("should calculate the correct net profit margin for positive revenue and expense", () => {
        const revenue = 1000;
        const expense = 400;

        expect(NetProfitMargin(revenue, expense)).toBe("60.0"); // ((1000 - 400) / 1000) * 100 = 60.0
    });
    it("should return 0.0 when revenue equals expense", () => {
        const revenue = 500;
        const expense = 500;

        expect(NetProfitMargin(revenue, expense)).toBe("0.0"); // ((500 - 500) / 500) * 100 = 0.0
    });

    it("should return a net profit margin rounded to 1 decimal digit", () => {
        const revenue = 1000;
        const expense = 333.33;
        expect(NetProfitMargin(revenue, expense)).toBe("66.7"); // Rounded to 1 decimal place
    });
});

describe("test Working Capital Ratio" , () => {
    it("test data json file", () => {
        const data = readData("./data.json");
        // const revenue = 32431;
        expect(WorkingCapitalRatio(data)).toBe("118.8");
    });

    it("should calculate percentage correctly for valid data", () => {
        const data = [
            { account_category: "assets", value_type: "debit", account_type: "current", total_value: 500 },
            { account_category: "assets", value_type: "credit", account_type: "current", total_value: 200 },
            { account_category: "assets", value_type: "debit", account_type: "bank", total_value: 300 },
            { account_category: "liability", value_type: "credit", account_type: "current", total_value: 400 },
            { account_category: "liability", value_type: "debit", account_type: "current", total_value: 100 },
        ];

        expect(WorkingCapitalRatio(data)).toBe("200.0"); // Assets: 500 - 200 + 300 = 600; Liabilities: 400 - 100 = 300; (600/300)*100 = 200.0
    });

    it("should handle zero liabilities gracefully", () => {
        const data = [
            { account_category: "assets", value_type: "debit", account_type: "current", total_value: 500 },
            { account_category: "assets", value_type: "credit", account_type: "current", total_value: 200 },
        ];

        expect(WorkingCapitalRatio(data)).toBe("Infinity"); // Assets: 500 - 200 = 300; Liabilities: 0; Division by 0 -> Infinity
    });
    
    it("should handle zero assets gracefully", () => {
        const data = [
            { account_category: "liability", value_type: "credit", account_type: "current", total_value: 400 },
            { account_category: "liability", value_type: "debit", account_type: "current", total_value: 100 },
        ];

        expect(WorkingCapitalRatio(data)).toBe("0.0"); // Assets: 0; Liabilities: 400 - 100 = 300; (0/300)*100 = 0.0
    });

    it("should ignore null or undefined total_value", () => {
        const data = [
            { account_category: "assets", value_type: "debit", account_type: "current", total_value: 500 },
            { account_category: "assets", value_type: "credit", account_type: "current", total_value: null },
            { account_category: "liability", value_type: "credit", account_type: "current", total_value: 400 },
            { account_category: "liability", value_type: "debit", account_type: "current", total_value: undefined }, 
        ];

        expect(WorkingCapitalRatio(data)).toBe("125.0"); // Assets: 500; Liabilities: 400; (500/400)*100 = 125.0
    });

})
