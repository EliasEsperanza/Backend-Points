import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';
import { Cliente } from "../Cliente/Cliente.js";
import { Niveles } from "../Niveles/Niveles.js";

export const Usuario = sequelize.define('tbl_usuario_cliente', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    puntos:{
        type: DataTypes.INTEGER,
<<<<<<< Updated upstream
        allowNull: false,
        defaultValue: 0
    },
    idNivel:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
=======
        allowNull:false
    },
    idNivel:{
        type:DataTypes.INTEGER,
        allowNull:false
>>>>>>> Stashed changes
    }
}, {
    timestamps: false,
    tableName: 'tbl_usuario_cliente'
});
Usuario.belongsTo(Niveles, { foreignKey: 'idNivel'});
Usuario.belongsTo(Cliente, { foreignKey: 'idCliente' });
Usuario.belongsTo(Niveles, { foreignKey: 'idNivel' });
