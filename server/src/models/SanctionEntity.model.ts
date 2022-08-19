import sequelize from "../loaders/db.js"

import {Sequelize, Model, DataTypes} from "sequelize";
import db from "../loaders/db.js";

import SanctionAddress from "../models/SanctionAddress.model.js"
import SanctionAlias from "../models/SanctionAlias.model.js"
import SanctionInfo from "../models/SanctionInfo.model.js"
import SanctionProgram from "../models/SanctionProgram.model.js"

class SanctionEntity extends Model {
    
}

SanctionEntity.init({
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created: {
        type: DataTypes.DATE,
        defaultValue: Date.now,
    },
    latestUpdate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: db,
    tableName: 'SanctionEntity',
    modelName: 'SanctionEntity',
});

SanctionEntity.hasMany(SanctionAddress, {
    foreignKey: "sanction"
});
SanctionEntity.hasMany(SanctionAlias, {
    foreignKey: "sanction"
});SanctionEntity.hasMany(SanctionInfo, {
    foreignKey: "sanction"
});SanctionEntity.hasMany(SanctionProgram, {
    foreignKey: "sanction"
});

await SanctionEntity.sync();
export default SanctionEntity;