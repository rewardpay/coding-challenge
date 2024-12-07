const {
  readJsonFile,
  appendToFile,
  clearFile,
} = require("./helpers/fileHandler");

const dataFilePath = "./data/data.json";

function main() {
  try {
    //Read data from the file
    const data = readJsonFile(dataFilePath);

    // console.log(data);
    // clearFile();
    // appendToFile("Some text comes here.");
  } catch (error) {
    console.error("Failed to load data:", error.message);
  }
}

main();
