import { config } from "dotenv"
config();

const inicio = (req, res)=>{
    res.render("view.nav.dash.ejs")
}

const pazysalvo = (req, res)=>{
    const url = process.env.BACK_URL;
    const options ={
        url:url
    };
    
    res.render("view.nav.paz.ejs", options)
}
const ajustes = (req, res)=>{
    const url = process.env.BACK_URL;
    const options ={
        url:url
    };
    
    res.render("view.ajustes.ejs", options)
}
const listarpazysalvo = (req, res)=>{
    const url = process.env.BACK_URL;
    const options ={
        url:url
    };
    
    res.render("historial/view.paz.ejs", options)
}
const editarpazysalvo = (req, res)=>{
    const url = process.env.BACK_URL;
    const options ={
        url:url
    };
    
    res.render("editar.paz.ejs", options)
}
const verpazysalvo = (req, res)=>{
    const url = process.env.BACK_URL;
    const options ={
        url:url
    };
    
    res.render("view.ver.paz.ejs", options)
}

const historial = (req, res)=>{
    const url = process.env.BACK_URL;
    const options ={
        url:url
    };

    res.render("view.nav.historial.ejs", options)

}


// historial
const historialreservas = (req, res) =>{
    const url = process.env.BACK_URL;
    const options ={
        url:url
    };
    res.render("historial/view.his.ejs",options);
    // historail reserva
}
// historial
const correos = (req, res)=>{
    const url = process.env.BACK_URL;
    const options ={
        url:url
    };

    res.render("view.nav.correos.ejs",options)
}
const sanciones = (req, res)=>{
    const url = process.env.BACK_URL;
    const options ={
        url:url
    };
    res.render("view.nav.sancion.ejs",options)
}
const accesorios = (req, res)=>{
    const url = process.env.BACK_URL;
    const options ={
        url:url
    };

    res.render("view.nav.accesorio.ejs", options);
}
const computadores = (req, res)=>{
    const url = process.env.BACK_URL;
    const options ={
        url:url
    };

    res.render("view.nav.computador.ejs", options);
}
const notas = (req, res)=>{
    const url = process.env.BACK_URL;
    const options ={
        url:url
    };
    res.render("view.nav.notas.ejs",options);
}
const ingrenota = (req, res)=>{
    const url = process.env.BACK_URL;
    const options ={
        url:url
    };

    res.render("view.notaingre.ejs", options);
}
const editarnota = (req, res)=>{
    const url = process.env.BACK_URL;
    const options ={
        url:url
    };

    res.render("view.editar.nota.ejs", options);
}
const notascompletas = (req, res)=>{
    const url = process.env.BACK_URL;
    const options ={
        url:url
    };

    res.render("historial/view.notas.completas.ejs", options);
}
const vertarea = (req, res)=>{
    const url = process.env.BACK_URL;
    const options ={
        url:url
    };

    res.render("ver.tareas.ejs", options);
}

export const navegacion = {
    inicio,
    pazysalvo,
    listarpazysalvo,
    editarpazysalvo,
    verpazysalvo,
    historial,
    correos,
    sanciones,
    accesorios,
    computadores,
    historialreservas,
    notas,
    ingrenota,
    editarnota,
    notascompletas,
    vertarea,
    ajustes,
}
