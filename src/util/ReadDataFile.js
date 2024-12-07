import fs from "fs";

// Function to read a JSON file and parse its contents
export const ReadDataFile = (filePath, callback) => {
  // Use fs.readFile to read the file at the specified filePath with 'utf8' encoding
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      // If there is an error reading the file (e.g., file not found), log it and pass the error to the callback
      console.log("Error reading file:", err);
      callback(err, null); // Return error to the callback
      return;
    }
    try {
      // Try to parse the file content as JSON
      const result = JSON.parse(data);
      // Pass the parsed data to the callback
      callback(null, result.data);
    } catch (parseError) {
      // If an error occurs during JSON parsing (e.g., invalid JSON format), log the error and pass it to the callback
      console.log("Something went wrong when parsing data:", parseError);
      callback(parseError, null);
    }
  });
};
