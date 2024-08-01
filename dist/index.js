import app from "./app.js"
app.listen(app.get("port"), ()=>{
    console.log(`se escucha ${app.get("port")}`);
});