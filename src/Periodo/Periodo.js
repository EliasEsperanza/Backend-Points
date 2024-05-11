import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Periodo = sequelize.define('tbl_periodo',{
    idPeriodo:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaInicio:{
        type:DataTypes.DATE
    },
    fechaFin:{
        type:DataTypes.DATE
    },
    estado:{
        type:DataTypes.TINYINT
    }
},{timestamps: false,tableName: 'tbl_periodo'});