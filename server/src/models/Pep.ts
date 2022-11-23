import sequelize from "../loaders/db.js"

import {
    Sequelize,
    Model,
    DataTypes
} from "sequelize";
import db from "../loaders/db.js";

class PEP extends Model {

}

PEP.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },



    fatherName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    secondName: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    type: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    nationality: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    country: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    birthDate: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    birthPlace: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    deathDate: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    gender: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    position: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    religion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    modifiedAt: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    nameVariations: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    aliases: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    sourceUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    education: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    ethnicity: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    weakAlias: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    website: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: db,
    tableName: 'PEP',
    modelName: 'PEP',
});



await PEP.sync();
export default PEP;