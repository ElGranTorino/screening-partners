import { Model, DataTypes } from "sequelize";
import db from "../loaders/db.js";
class SanctionAddress extends Model {
}
SanctionAddress.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    sanction: {
        type: DataTypes.UUID,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    stateOrProvince: {
        type: DataTypes.STRING,
        allowNull: true
    },
    zipCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true,
    sequelize: db,
    tableName: 'SanctionAddress',
    modelName: 'SanctionAddress',
});
await SanctionAddress.sync();
export default SanctionAddress;
