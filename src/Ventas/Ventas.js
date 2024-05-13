import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';
import { Cliente } from "../Cliente/Cliente.js";
import { Sucursal } from "../Sucursal/Sucursal.js";
import { Periodo } from "../Periodo/Periodo.js";

export const Venta = sequelize.define('tbl_ventas', {
    idVenta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idSucursal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idPeriodo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    puntosGanados: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalVenta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    numeroFactura: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fechaVenta: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'tbl_ventas'
});

Venta.belongsTo(Sucursal, { foreignKey: 'idSucursal' });
Venta.belongsTo(Periodo, { foreignKey: 'idPeriodo' });
Venta.belongsTo(Cliente, { foreignKey: 'idCliente' });
