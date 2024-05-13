import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Sucursal = sequelize.define('tbl_sucursal', {
    idSucursal:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombreSucursal:{
        type:DataTypes.STRING(300),
        allowNull:false
    },
    direccion:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    telefono:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    cordenadas:{
        type: DataTypes.STRING(400),
        allowNull: false
    }
},{timestamps: false, tableName: 'tbl_sucursal'});