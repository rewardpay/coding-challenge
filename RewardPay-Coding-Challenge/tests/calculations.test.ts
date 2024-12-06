import { expensesCalculation, grossProfitMarginCalculation, netProfitMarginCalculation, revenueCalculation } from "../src/calculations";
import { ExpensesRecord } from "../types/ExpensesRecord";
import { GrossProfitMarginRecord } from "../types/GrossProfitMarginRecord";
import { RevenueRecord } from "../types/RevenueRecord";

/**
 * Test Cases for Revenue Calculation
 */

test("REV-CASE-1: Calculates the revenue CORRECTLY", () => {
    const revMock: RevenueRecord [] = [
        { "account_category": "revenue","total_value": 100},
        { "account_category": "revenue","total_value": 200},
        { "account_category": "expense","total_value": 300}
    ];

    expect(revenueCalculation(revMock)).toBe(300);
})

test("REV-CASE-2: Calculates the revenue INCORRECTLY", () => {
    const revMock: RevenueRecord [] = [
        { "account_category": "revenue","total_value": 200},
        { "account_category": "revenue","total_value": 300},
        { "account_category": "expense","total_value": 400}
    ];

    expect(revenueCalculation(revMock)).not.toBe(600);
})

/**
 * Test Cases for Expenses Calculation
 */

test("EXP-CASE-1: Calculates the expenses CORRECTLY", () => {
    const expMock: ExpensesRecord [] = [
        { "account_category": "revenue","total_value": 100},
        { "account_category": "expense","total_value": 200},
        { "account_category": "expense","total_value": 300}
    ];

    expect(expensesCalculation(expMock)).toBe(500);
})

test("EXP-CASE-2: Calculates the revenue INCORRECTLY", () => {
    const expMock: ExpensesRecord [] = [
        { "account_category": "revenue","total_value": 200},
        { "account_category": "expense","total_value": 300},
        { "account_category": "expense","total_value": 400}
    ];

    expect(expensesCalculation(expMock)).not.toBe(600);
})

/**
 * Test Cases for Gross Profit Margin Calculation
 */

test("GROSS-CASE-1: Calculates the gross profit margin CORRECTLY", () => {
    const revMock: RevenueRecord [] = [
        { "account_category": "revenue","total_value": 200},
        { "account_category": "revenue","total_value": 200},
        { "account_category": "expense","total_value": 300}
    ];

    const grossMock: GrossProfitMarginRecord [] = [
        { "account_type": "sales", "value_type": "credit","total_value": 100},
        { "account_type": "sales", "value_type": "debit","total_value": 200},
        { "account_type": "overheads", "value_type": "debit","total_value": 300}
    ];
    const revenue = revenueCalculation(revMock); //400
    expect(grossProfitMarginCalculation(grossMock,revenue)).toBe(0.5);
})


test("GROSS-CASE-2: Calculates the gross profit margin INCORRECTLY", () => {
    const revMock: RevenueRecord [] = [
        { "account_category": "revenue","total_value": 200},
        { "account_category": "revenue","total_value": 200},
        { "account_category": "expense","total_value": 300}
    ];

    const grossMock: GrossProfitMarginRecord [] = [
        { "account_type": "sales", "value_type": "credit","total_value": 100},
        { "account_type": "sales", "value_type": "debit","total_value": 200},
        { "account_type": "sales", "value_type": "debit","total_value": 100}
    ];
    const revenue = revenueCalculation(revMock); //400
    expect(grossProfitMarginCalculation(grossMock,revenue)).not.toBe(0.8);
})


test("GROSS-CASE-3: Calculates the gross profit margin FAILED, DIVIDED BY ZERO", () => {
    const revMock: RevenueRecord [] = [
        { "account_category": "revenue","total_value": -200},
        { "account_category": "revenue","total_value": 200},
        { "account_category": "expense","total_value": 300}
    ];

    const grossMock: GrossProfitMarginRecord [] = [
        { "account_type": "sales", "value_type": "credit","total_value": 100},
        { "account_type": "sales", "value_type": "debit","total_value": 200},
        { "account_type": "sales", "value_type": "debit","total_value": 100}
    ];
    const revenue = revenueCalculation(revMock); //0
    expect(() => grossProfitMarginCalculation(grossMock, revenue)).toThrow(
        "Gross Profit Margin cannot be calculated when revenue is smaller or equal to 0 !!"
    );

    expect(() => grossProfitMarginCalculation(grossMock, revenue)).not.toThrow(
        "RANDOM ERROR!"
    );
})

test("GROSS-CASE-4: Calculates the gross profit margin FAILED, DIVIDED BY NEGATIVE", () => {
    const revMock: RevenueRecord [] = [
        { "account_category": "revenue","total_value": -300},
        { "account_category": "revenue","total_value": 200},
        { "account_category": "expense","total_value": 300}
    ];

    const grossMock: GrossProfitMarginRecord [] = [
        { "account_type": "sales", "value_type": "credit","total_value": 100},
        { "account_type": "sales", "value_type": "debit","total_value": 200},
        { "account_type": "sales", "value_type": "debit","total_value": 100}
    ];
    const revenue = revenueCalculation(revMock); //-100
    expect(() => grossProfitMarginCalculation(grossMock, revenue)).toThrow(
        "Gross Profit Margin cannot be calculated when revenue is smaller or equal to 0 !!"
    );

    expect(() => grossProfitMarginCalculation(grossMock, revenue)).not.toThrow(
        "RANDOM ERROR!"
    );
})

/**
 * Test Cases for Net Profit Margin Calculation
 */


test("NET-CASE-1: Calculates the net profit margin CORRECTLY and INCORRECTLY", () => {
    const revMock: RevenueRecord [] = [
        { "account_category": "revenue","total_value": 300},
        { "account_category": "revenue","total_value": 400},
        { "account_category": "revenue","total_value": 500}
    ];

    const expMock: ExpensesRecord [] = [
        { "account_category": "expense","total_value": 100},
        { "account_category": "expense","total_value": 200},
        { "account_category": "expense","total_value": 300}
    ];

    const revenue = revenueCalculation(revMock); //1200
    const expenses = expensesCalculation(expMock); //600

    expect(netProfitMarginCalculation(expenses,revenue)).toBe(0.5);
    expect(netProfitMarginCalculation(expenses,revenue)).not.toBe(0.6);
})

test("NET-CASE-2: Calculates the net profit margin FAILED, DIVIDED BY ZERO", () => {
    const revMock: RevenueRecord [] = [
        { "account_category": "revenue","total_value": 300},
        { "account_category": "revenue","total_value": 400},
        { "account_category": "revenue","total_value": -700}
    ];

    const expMock: ExpensesRecord [] = [
        { "account_category": "expense","total_value": 100},
        { "account_category": "expense","total_value": 200},
        { "account_category": "expense","total_value": 300}
    ];

    const revenue = revenueCalculation(revMock); //0
    const expenses = expensesCalculation(expMock); //600

    expect(() => netProfitMarginCalculation(expenses, revenue)).toThrow(
        "Net Profit Margin cannot be calculated when revenue is smaller or equal to 0 !!"
    );

    expect(() => netProfitMarginCalculation(expenses, revenue)).not.toThrow(
        "RANDOM ERROR!"
    );

    
})

test("NET-CASE-3: Calculates the net profit margin FAILED, DIVIDED BY NEGATIVE", () => {
    const revMock: RevenueRecord [] = [
        { "account_category": "revenue","total_value": 300},
        { "account_category": "revenue","total_value": 400},
        { "account_category": "revenue","total_value": -800}
    ];

    const expMock: ExpensesRecord [] = [
        { "account_category": "expense","total_value": 100},
        { "account_category": "expense","total_value": 200},
        { "account_category": "expense","total_value": 300}
    ];

    const revenue = revenueCalculation(revMock); //-100
    const expenses = expensesCalculation(expMock); //600

    expect(() => netProfitMarginCalculation(expenses, revenue)).toThrow(
        "Net Profit Margin cannot be calculated when revenue is smaller or equal to 0 !!"
    );

    expect(() => netProfitMarginCalculation(expenses, revenue)).not.toThrow(
        "RANDOM ERROR!"
    );

    
})




