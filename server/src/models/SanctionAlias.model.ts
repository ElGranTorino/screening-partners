import sequelize from "../loaders/db.js"

import {
    Sequelize,
    Model,
    DataTypes
} from "sequelize";
import db from "../loaders/db.js";
import SanctionEntity from "./SanctionEntity.model.js";

class SanctionAlias extends Model {

}

SanctionAlias.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    sanction: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1, 1024]
        }
    },
}, {
    timestamps: true,
    sequelize: db,
    tableName: 'SanctionAlias',
    modelName: 'SanctionAlias',
});



await SanctionAlias.sync();
export default SanctionAlias;