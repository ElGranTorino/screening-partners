import sequelize from "../loaders/db.js"

import {Sequelize, Model, DataTypes} from "sequelize";
import db from "../loaders/db.js";
import SanctionEntity from "./SanctionEntity.model.js";

class SanctionInfo extends Model {
    
}

SanctionInfo.init({
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
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: true,
    sequelize: db,
    tableName: 'SanctionInfo',
    modelName: 'SanctionInfo',
});




await SanctionInfo.sync();
// Info.belongsTo(SanctionEntity)

export default SanctionInfo;