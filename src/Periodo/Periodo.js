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

/*
{
	"fechaInicio": "2024-05-10 12:30:00",//ingresa dato fecha
	"fechaFin": "2024-05-11 12:30:00",
	"estado":1 //ingresa dato TinyInt o booleano (porque no le escriben como booleano o algo parecido)
}

*/