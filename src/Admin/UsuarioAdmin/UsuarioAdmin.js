import { sequelize } from "../../database/database.js";
import { DataTypes } from "sequelize";
import { Admin } from "../Admin.js";

export const UsuarioAdmin = sequelize.define('tbl_usuario_admin',{
    idUsuarioAdmin:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    usuario:{
        type: DataTypes.STRING(300),
        allowNull:false
    },
    password:{
        type: DataTypes.STRING(300),
        allowNull: false
    },
    idAdmin:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:false,
    tableName: 'tbl_usuario_admin'
});

UsuarioAdmin.belongsTo(Admin, {foreignKey:'idAdmin'});