import fs from "fs";
import path from "path";
import { DataTypes } from "sequelize";
import { fileURLToPath } from "url";
import sequelize from "../lib/sequelize.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

const db = {};

const files = fs.readdirSync(__dirname).filter(
  (file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
);

for(let file of files){
  const modelImport = await import (path.join(__dirname, file));
  const model = modelImport.default(sequelize, DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach((modelName)=>{
  if(db[modelName].associate){
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize.Sequelize;

export default db;
