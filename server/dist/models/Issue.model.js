import { Model, DataTypes } from "sequelize";
import db from "../loaders/db.js";
class SearchIssue extends Model {
}
SearchIssue.init({
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
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    sequelize: db,
    tableName: 'SearchIssue',
    modelName: 'SearchIssue',
});
await SearchIssue.sync();
export default SearchIssue;
