import { sequelize } from '../database/database.js';
import { DataTypes } from 'sequelize';

export const Admin = sequelize.define('tbl_usuario_administrador',{
    idAdmin:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreAdmin:{
        type: DataTypes.STRING(300),
        allowNull:false
    },
    password:{
        type:DataTypes.STRING(300),
        allowNull:false
    },
},{
    timestamps: false,
    tableName: 'tbl_usuario_Administrador'
});