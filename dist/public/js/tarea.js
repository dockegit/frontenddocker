document.getElementById('tareas').value = localStorage.getItem('envtarea');
document.getElementById('notas').value = localStorage.getItem('envnotas');
document.getElementById('prioridad').value = localStorage.getItem('envprioridad');
document.getElementById('estado').value = localStorage.getItem('envestado');
const id = localStorage.getItem('envidcompleto');

const cancelar = document.getElementById("cancelar");
cancelar.addEventListener('click',()=>{
    window.location.href= "/dash/completas"
})