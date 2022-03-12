const { v4: uuid } = require("uuid");
global.XMLHttpRequest = require("xhr2");
const fs = require("fs");

const functions = {
  refactorByProperty: (array, property) => {
    const newDocument = [];
    if (!array) return "Aucun résultat.";
    array.forEach((item) => {
      if (
        newDocument.findIndex(
          (newDocItem) => newDocItem[property] === item[property]
        ) !== -1
      ) {
        newDocument[
          newDocument.findIndex(
            (newDocItem) => newDocItem[property] === item[property]
          )
        ].push(item);
      } else {
        var newPro = [
          {
            property: property,
            value: item[property],
            id: uuid(),
            image:
              "https://assets.website-files.com/5ff319852fb4b1c3fc23719b/612b255af5fea663672f7489_logo%20Figma.png",
          },
        ];
        newPro[property] = item[property];
        newPro.push(item);
        newDocument.push(newPro);
      }
    });
    // newDocument.shift();

    return newDocument;
  },
  readTextFile: (file) => {
    let rawdata = fs.readFileSync(file);
    let data = JSON.parse(rawdata);
    return data;
  },
};
module.exports = functions;
