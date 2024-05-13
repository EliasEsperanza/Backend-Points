import { sequelize } from '../database/database.js';
import { DataTypes } from 'sequelize';
import { Cliente } from "../Cliente/Cliente.js";

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
    idCliente:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps: false,
    tableName: 'tbl_usuario_Administrador'
});

Admin.belongsTo(Cliente, { foreignKey: 'idCliente' });
