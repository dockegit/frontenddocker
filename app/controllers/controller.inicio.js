import { config } from "dotenv";
config();


const login = (req, res)=>{

    const url = process.env.BACK_URL;
    const options ={
        url:url
    };
    res.render("view.login.ejs", options);
}



export const ruta = {
    login
}