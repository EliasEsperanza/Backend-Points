import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";


export const Niveles = sequelize.define('tbl_niveles',{
    idNivel:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion:{
        type: DataTypes.STRING(300)
    },
    puntosInicio:{
        type:DataTypes.INTEGER
    },
    puntosFin:{
        type: DataTypes.INTEGER
    },
    icono:{
        type: DataTypes.TEXT
    }

},{timestamps: false});