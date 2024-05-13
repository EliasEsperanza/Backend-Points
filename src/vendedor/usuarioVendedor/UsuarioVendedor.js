import { sequelize } from "../../database/database.js";
import { DataTypes } from "sequelize";
import { Vendedor } from "../Vendedor.js";

export const UsuarioVendedor = sequelize.define('tbl_usuario_vendedor',{
    idUsuarioVendedor:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario:{
        type: DataTypes.STRING(300),
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(300),
        allowNull: false
    },
    idVendedor:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false, 
    tableName: 'tbl_usuario_vendedor'
});

UsuarioVendedor.belongsTo(Vendedor, {foreignKey: 'idVendedor'});