import { sequelize } from '../database/database.js';
import { DataTypes } from 'sequelize';
import { Sucursal } from '../Sucursal/Sucursal.js';

export const Admin = sequelize.define('tbl_Administrador',{
    idAdmin:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreAdmin:{
        type: DataTypes.STRING(300),
        allowNull:false
    },
    correo:{
        type: DataTypes.STRING(300),
        allowNull:false
    },imagen:{
        type: DataTypes.STRING(300),
        allowNull: false
    },
    idSucursal:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'tbl_Administrador'
});

Admin.belongsTo(Sucursal, {foreignKey: 'idSucursal'});