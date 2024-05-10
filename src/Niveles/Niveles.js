import { Types } from "mysql2";
import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";
import { type } from "express/lib/response";

export const Niveles = sequelize.define('tbl_nivles',{
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
        type:DataTypes.INTEGER
    },
    puntosFin:{
        type: DataTypes.INTEGER
    },
    icono:{
        type: DataTypes.TEXT
    }
})