import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';
import { Nivel } from "../Niveles/Niveles.js";

export const Premio = sequelize.define('tbl_premio', {
    idPremio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idNivel: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombrePremio: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    puntos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
});

Premio.belongsTo(Nivel, { foreignKey: 'idNivel' });
