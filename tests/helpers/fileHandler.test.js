import { describe, it, expect, beforeAll, afterAll } from "vitest";
import fs from "fs";
import path from "path";
import {
  readJsonFile,
  appendToFile,
  clearFile,
} from "../../src/helpers/fileHandler";

const testJsonPath = "./tests/testData.json";
const testOutputDir = path.join(__dirname, "files");
const testOutputFile = "testResult.txt";

beforeAll(() => {
  if (!fs.existsSync(testOutputDir)) {
    fs.mkdirSync(testOutputDir);
  }
});

afterAll(() => {
  if (fs.existsSync(path.join(testOutputDir, testOutputFile))) {
    fs.unlinkSync(path.join(testOutputDir, testOutputFile));
  }
  if (fs.existsSync(testOutputDir)) {
    fs.rmdirSync(testOutputDir);
  }
});

describe("fileHandler.js", () => {
  describe("readJsonFile", () => {
    it("should read and parse a JSON file correctly", () => {
      const testData = { key: "value" };
      fs.writeFileSync(testJsonPath, JSON.stringify(testData), "utf-8");
      const data = readJsonFile(testJsonPath);
      expect(data).toEqual(testData);
    });
  });

  describe("appendToFile", () => {
    it("should append text to the file", () => {
      const text = "New text to be appended";
      appendToFile(text, testOutputDir, testOutputFile);
      const content = fs.readFileSync(
        path.join(testOutputDir, testOutputFile),
        "utf-8"
      );
      expect(content.trim()).toBe(text);
    });

    it("should create file if it doesn't exist", () => {
      appendToFile("Content", testOutputDir, testOutputFile);
      expect(fs.existsSync(path.join(testOutputDir, testOutputFile))).toBe(
        true
      );
    });
  });

  describe("clearFile", () => {
    it("should clear the content of an existing file", () => {
      fs.writeFileSync(
        path.join(testOutputDir, testOutputFile),
        "Initial content",
        "utf-8"
      );
      clearFile(testOutputDir, testOutputFile);
      const content = fs.readFileSync(
        path.join(testOutputDir, testOutputFile),
        "utf-8"
      );
      expect(content).toBe("");
    });

    it("should do nothing if the file does not exist", () => {
      const filePath = path.join(testOutputDir, testOutputFile);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

      clearFile(testOutputDir, testOutputFile);

      expect(fs.existsSync(filePath)).toBe(false);
    });
  });
});
