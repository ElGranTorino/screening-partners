import { Model, DataTypes } from "sequelize";
import db from "../loaders/db.js";
class Total extends Model {
}
Total.init({
    _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: Date.now
    }
}, {
    timestamps: true,
    sequelize: db,
    tableName: 'Total',
    modelName: 'Total',
});
await Total.sync();
export default Total;
