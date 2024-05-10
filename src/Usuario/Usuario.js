import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';
import { Cliente } from "../Cliente/Cliente.js";

export const Usuario = sequelize.define('tbl_usuario', {
    idCliente: {
        type: DataTypes.INTEGER,
        primariKey: true,
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
}, {
    timestamps: false,
});

Usuario.belongsTo(Cliente, { foreignKey: 'idCliente' });
Usuario.belongsTo(Cliente, { foreignKey: 'correo' });
Usuario.belongsTo(Cliente, { foreignKey: 'password' });