const fs = require("fs");

const json_data = fs.readFileSync("JSON/data.json", "utf-8");
const data = JSON.parse(json_data);

module.exports.mostrar = (req, res) => {
  res.render("index.ejs",{
    data
  });
  //res.status(200).json(data);
};
