import fs from "fs";

export const ReadDataFile = (filePath, callback) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading file:", err);
      callback(err, null);
      return;
    }
    try {
      const result = JSON.parse(data);
      callback(null, result.data);
    } catch (parseError) {
      console.log("Something went wrong when parsing data:", parseError);
      callback(parseError, null);
    }
  });
};
