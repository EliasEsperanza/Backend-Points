import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Sucursal = sequelize.define('tbl_sucursal', {
    idSucursal:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombreSucursal:{
        type:DataTypes.STRING(300)
    },
    direccion:{
        type: DataTypes.TEXT
    },
    telefono:{
        type: DataTypes.STRING(30)
    },
    cordenadas:{
        type: DataTypes.STRING(400)
    }
})