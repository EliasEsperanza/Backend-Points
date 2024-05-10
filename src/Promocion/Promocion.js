import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';
import { CategoriaPromocion } from "../CategoriaPromocion/CategoriaPromocion.js";

export const Promocion = sequelize.define('tbl_promocion', {
    idPromocion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcionPromocion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imagen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fechaInicio: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fechaFin: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    estado: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    idCategoriaPromocion: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'tbl_promocion'
});

Promocion.belongsTo(CategoriaPromocion, { foreignKey: 'idCategoriaPromocion' });
