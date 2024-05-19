import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";


export const Niveles = sequelize.define('tbl_niveles',{
    idNivel:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion:{
        type: DataTypes.STRING(300),
        allowNull: false
    },
    puntosInicio:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    puntosFin:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    icono:{
        type: DataTypes.TEXT,
        allowNull: false
    }

},{timestamps: false, tableName: 'tbl_niveles'});