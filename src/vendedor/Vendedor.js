import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
import { Sucursal } from "../Sucursal/Sucursal.js";

export const Vendedor = sequelize.define('tbl_vendedor',{
    idVendedor:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreVendedor:{
        type: DataTypes.STRING(300),
        allowNull: false
    },
    correo:{
        type: DataTypes.STRING(300),
        allowNull: false
    },
    imagenVendedor:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    idSucursal:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false, 
    tableName: 'tbl_vendedor'
});

Vendedor.belongsTo(Sucursal, {foreignKey: 'idSucursal'});