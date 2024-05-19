import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Periodo = sequelize.define('tbl_periodo',{
    idPeriodo:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaInicio:{
        type:DataTypes.DATE,
        allowNull:false
    },
    fechaFin:{
        type:DataTypes.DATE,
        allowNull:false
    },
    estado:{
        type:DataTypes.TINYINT,
        allowNull:false
    }
},{timestamps: false,tableName: 'tbl_periodo'});