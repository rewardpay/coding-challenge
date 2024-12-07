const fs = require("fs");
const path = require("path");

/**
 * Reads and parses a JSON file.
 * @param {string} filePath - The relative path to the JSON file.
 * @returns {Object} - The parsed data object.
 */
function readJsonFileSync(filePath) {
  try {
    const absolutePath = path.resolve(filePath);
    const data = fs.readFileSync(absolutePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error.message);
    throw error;
  }
}

/**
 * Writes a line of text to the output file. Creates the directory/file if it doesn't exist.
 * @param {string} text - The text to append.
 * @param {string} dirPath - The path to the output directory.
 * @param {string} fileName - The name of the output file.
 */
function appendToFile(text, dirPath = "./output", fileName = "result.txt") {
  try {
    const directoryPath = path.resolve(dirPath);
    const filePath = path.join(directoryPath, fileName);

    // Ensure the directory exists
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Append text to the file, creating it if necessary
    fs.appendFileSync(filePath, text + "\n", "utf-8");
    console.log(`Successfully wrote to file: ${filePath}`);
  } catch (error) {
    console.error(`Error writing to file: ${error.message}`);
    throw error;
  }
}

/**
 * Clears the content of the output file if it exists.
 * @param {string} dirPath - The path to the output directory.
 * @param {string} fileName - The name of the output file.
 */
function clearFile(dirPath = "./output", fileName = "result.txt") {
  try {
    const directoryPath = path.resolve(dirPath);
    const filePath = path.join(directoryPath, fileName);

    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "", "utf-8");
    }
  } catch (error) {
    console.error(`Error clearing file: ${error.message}`);
    throw error;
  }
}

module.exports = { readJsonFileSync, appendToFile, clearFile };
