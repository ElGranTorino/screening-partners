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
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now
    },
    target: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [3, 64]
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [3, 64]
        }
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [5, 128]
        }
    },
}, {
    timestamps: true,
    sequelize: db,
    tableName: 'SearchIssue',
    modelName: 'SearchIssue',
});
await SearchIssue.sync();
export default SearchIssue;
