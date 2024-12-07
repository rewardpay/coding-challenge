import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import {
  readJsonFileSync,
  appendToFile,
  clearFile,
} from "../../src/helpers/fileHandler";

const outputDir = "./output";
const outputFile = "testResult.txt";
const testJsonPath = "./tests/testData.json";

beforeEach(() => {
  if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
});

afterEach(() => {
  if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
});

describe("fileHandler.js", () => {
  describe("readJsonFileSync", () => {
    it("should read and parse a JSON file correctly", () => {
      const testData = { key: "value" };
      fs.writeFileSync(testJsonPath, JSON.stringify(testData), "utf-8");
      const data = readJsonFileSync(testJsonPath);
      expect(data).toEqual(testData);
    });
  });

  describe("appendToFile", () => {
    it("should append text to the file", () => {
      const text = "New text to be appended";
      appendToFile(text, outputDir, outputFile);
      const content = fs.readFileSync(
        path.join(outputDir, outputFile),
        "utf-8"
      );
      expect(content.trim()).toBe(text);
    });

    it("should create file if it doesn't exist", () => {
      appendToFile("Content", outputDir, outputFile);
      expect(fs.existsSync(path.join(outputDir, outputFile))).toBe(true);
    });

    it("should create the directory if it doesn't exist", () => {
      const newDir = "./newOutputDir";
      const newFile = "newResult.txt";
      appendToFile("Directory and file created", newDir, newFile);
      expect(fs.existsSync(path.join(newDir, newFile))).toBe(true);
    });
  });

  describe("clearFile", () => {
    it("should clear the content of an existing file", () => {
      fs.writeFileSync(
        path.join(outputDir, outputFile),
        "Initial content",
        "utf-8"
      );
      clearFile(outputDir, outputFile);
      const content = fs.readFileSync(
        path.join(outputDir, outputFile),
        "utf-8"
      );
      expect(content).toBe("");
    });

    it("should do nothing if the file does not exist", () => {
      const filePath = path.join(outputDir, outputFile);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

      clearFile(outputDir, outputFile);

      expect(fs.existsSync(filePath)).toBe(false);
    });
  });
});
