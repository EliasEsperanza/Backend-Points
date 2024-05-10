import app from "./app.js";
import {sequelize} from "./database/database.js";

if (process.env.NODE_ENV !== "production") {   
    require("dotenv").config();
}

const PORT = process.env.PORT || 3000;

async function main(){
    try{
        await sequelize.sync({force: false});
        console.log("Connection has been established successfully");
        app.listen(PORT)
        console.log("Server running on port ",PORT);
    }catch(error){
        console.log(error);
    }
}

main();