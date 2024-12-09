import fs from "fs";
import { Account } from "../types/account";

export function parseAccountData(filePath: string): Account[] {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileContent);

    if (!jsonData.data || !Array.isArray(jsonData.data)) {
      throw new Error("Invalid data format: expected data array");
    }

    return jsonData.data as Account[];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse account data: ${error.message}`);
    }
    throw error;
  }
}
