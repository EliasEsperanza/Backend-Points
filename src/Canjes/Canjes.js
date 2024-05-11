import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';
import { Cliente } from "../Cliente/Cliente.js";
import { Sucursal } from "../Sucursal/Sucursal.js";
import { Premio } from "../Premio/Premio.js";

export const Canje = sequelize.define('tbl_canjes', {
  idCanje: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idPremio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idCliente: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idSucursal: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  puntosCanjeados: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fechaCanje: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  nombreCliente: {
    type: DataTypes.STRING(300),
    allowNull: false
  },
  costo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'tbl_canjes'
});

Canje.belongsTo(Cliente, { foreignKey: 'idCliente' });
Canje.belongsTo(Premio, { foreignKey: 'idPremio' });
Canje.belongsTo(Sucursal, { foreignKey: 'idSucursal' });