import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';

export const CategoriaCliente = sequelize.define('tbl_categoria_cliente', {
    idCategoriaCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreCategoria: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'tbl_categoria_cliente'
});