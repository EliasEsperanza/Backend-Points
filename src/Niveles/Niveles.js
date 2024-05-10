import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";


export const Niveles = sequelize.define('tbl_nivles',{
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
})