import sequelize from "../loaders/db.js"

import {Sequelize, Model, DataTypes} from "sequelize";
import db from "../loaders/db.js";
import SanctionEntity from "./SanctionEntity.model.js";

class SanctionDocument extends Model {
    
}

SanctionDocument.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        defaultValue: DataTypes.UUIDV4
    },
    sanction: {
        type: DataTypes.UUID,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    additionalType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    number: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    person: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
    sequelize: db,
    tableName: 'SanctionDocument',
    modelName: 'SanctionDocument',
});




await SanctionDocument.sync();
// Info.belongsTo(SanctionEntity)

export default SanctionDocument;