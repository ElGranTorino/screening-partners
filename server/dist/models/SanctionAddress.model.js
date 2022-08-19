import { Model, DataTypes } from "sequelize";
import db from "../loaders/db.js";
class SanctionAddress extends Model {
}
SanctionAddress.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    address1: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stateOrProvince: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sanction: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
    sequelize: db,
    tableName: 'SanctionAddress',
    modelName: 'SanctionAddress',
});
await SanctionAddress.sync();
export default SanctionAddress;
