var XLSX = require("xlsx");
var functions = require("./functions");
const fs = require("fs");
const path = require("path");
const db = {
  createJsonFile: (weekId) => {
    console.log(weekId);
    var workbook = XLSX.readFile("../data/data.xlsx");
    var sheet_name_list = workbook.SheetNames;
    var data = [];
    var worksheet = workbook.Sheets[sheet_name_list[3]];
    //getting the complete sheet
    // console.log(worksheet);

    var headers = {};
    for (z in worksheet) {
      if (z[0] === "!") continue;
      //parse out the column, row, and value
      var col = z.substring(0, 1);
      // console.log(col);

      var row = parseInt(z.substring(1));
      // console.log(row);

      var value = worksheet[z].v;
      // console.log(value);

      //store header names
      if (row == 1) {
        headers[col] = value;
        // storing the header names
        continue;
      }

      if (!data[row]) data[row] = {};
      data[row][headers[col]] = value;
    }
    //drop those first two rows which are empty
    data.shift();
    data.shift();
    const dataFiltered = data.filter(
      (dataItem) => dataItem["Périod  *"] === weekId
    );
    const newData = functions.refactorByProperty(dataFiltered, "Client Name*");

    fs.writeFileSync(
      path.resolve("../data", "data.json"),
      JSON.stringify(newData)
    );
    return newData;
  },
  getAllData: () => {
    const data = functions.readTextFile("../data/data.json");
    return data;
  },
  createNewClient: (client) => {
    try {
      const data = functions.readTextFile("../data/data.json");
      data.push(client);
      fs.writeFileSync(
        path.resolve("../data", "data.json"),
        JSON.stringify(data)
      );
      return { success: true, message: "Client correctement enregistré." };
    } catch (err) {
      return { success: false, message: err };
    }
  },
  getDataById: (id) => {
    const data = functions.readTextFile("../data/data.json");
    const dataFiltered = data.filter((dataItem) => dataItem[0].id === id);
    const finalData = functions.refactorByProperty(
      dataFiltered[0],
      "Project Name"
    );
    return finalData;
  },
  createNewProject: (clientid, project) => {
    try {
      const data = functions.readTextFile("../data/data.json");
      const clientIndex = data.findIndex(
        (dataitem) => dataitem[0].id === clientid
      );
      if (clientIndex === -1) {
        return { success: false, message: "Le client n'existe pas." };
      }
      console.log(data[clientIndex]);
      const dataFinal = [...data];
      dataFinal[clientIndex].push(project);
      fs.writeFileSync(
        path.resolve("../data", "data.json"),
        JSON.stringify(dataFinal)
      );
      return { success: true, message: "Project correctement enregistré." };
    } catch (err) {
      return { success: false, message: err };
    }
  },
};
module.exports = db;
