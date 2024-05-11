import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const CategoriaPromocion = sequelize('tbl_categoria_promocion',{
    idCategoriaPromocion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreCategoria:{
        type: DataTypes.STRING(300)
    }
},{timestamps: false});