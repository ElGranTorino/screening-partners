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
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        defaultValue: DataTypes.UUIDV4,
    },
    sanction: {
        type: DataTypes.UUID,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    sequelize: db,
    tableName: 'SanctionAlias',
    modelName: 'SanctionAlias',
});



await SanctionAlias.sync();
export default SanctionAlias;