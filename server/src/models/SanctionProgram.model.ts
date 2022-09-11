import sequelize from "../loaders/db.js"

import {Sequelize, Model, DataTypes} from "sequelize";
import db from "../loaders/db.js";
import SanctionEntity from "./SanctionEntity.model.js";

class SanctionProgram extends Model {
    
}

SanctionProgram.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        defaultValue: DataTypes.UUIDV4,
    },
    sanction: {
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    sequelize: db,
    tableName: 'SanctionProgram',
    modelName: 'SanctionProgram',
});

await SanctionProgram.sync();
export default SanctionProgram;

/** 
11

I suggest reasoning in following steps:

    Determine source and target model. This is just convention: the source is the model on which the method is invoked, 
    so basically 'the one on the left' in the notation. The target is the other model, so 'the one on the right'.
    Know where various methods put the foreign key: hasOne and hasMany put fk on target; belongsTo puts fk on source; 
    belongsToMany puts fk on the through model.
    Understand that the foreign key (as the name implies) will refer to 'the other model' (so not the one under 
        2). So for hasOne and hasMany will be a reference to the source model; for belongsTo a reference to the target model; for belongsToMany a reference to the source model (and you can reference the target model with otherKey:).

belongsToMany is a special case since a third model is introduced: the through model (or join table) on which both the foreign keys 
to the source and the target are stored. This changes 'the perspective' for the foreign key somewhat and therefor you can not compare 
it fully with belongsTo in respect of foreign key referencing.

So answering your questions:

    Which is the target?: Subarea, and Book respectively.
    Which foreign key to use?: your foreign keys are in line with above explanation. belongsToMany is exceptional as foreign keys are 
    stored on neither source nor target, but on the through model.

*/