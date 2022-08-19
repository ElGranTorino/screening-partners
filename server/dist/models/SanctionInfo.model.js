import { Model, DataTypes } from "sequelize";
import db from "../loaders/db.js";
class SanctionInfo extends Model {
}
SanctionInfo.init({
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
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    sequelize: db,
    tableName: 'SanctionInfo',
    modelName: 'SanctionInfo',
});
await SanctionInfo.sync();
export default SanctionInfo;
