import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';
import { CategoriaCliente } from "../CategoriaCliente/CategoriaCliente.js";
import { TipoCliente } from "../TipoCliente/TipoCliente.js";

export const Cliente = sequelize.define('tbl_cliente', {
    idCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreCliente: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    dui: {
        type: DataTypes.STRING(30)
    },
    nit: {
        type: DataTypes.STRING(30)
    },
    nrc: {
        type: DataTypes.STRING(30)
    },
    telefono: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    direccion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    idCategoriaCliente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idTipoCliente: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'tbl_cliente'
});

Cliente.belongsTo(CategoriaCliente, { foreignKey: 'idCategoriaCliente' });
Cliente.belongsTo(TipoCliente, { foreignKey: 'idTipoCliente' });