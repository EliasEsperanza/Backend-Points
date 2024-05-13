import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';

export const TipoCliente = sequelize.define('tbl_tipo_cliente', {
    idTipoCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcionTipo: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'tbl_tipo_cliente'
});