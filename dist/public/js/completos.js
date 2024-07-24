document.getElementById('marca').value = localStorage.getItem('editmarca');
document.getElementById('modelo').value = localStorage.getItem('editmodelo');
document.getElementById('estado').value = localStorage.getItem('editestado');
document.getElementById('area').value = localStorage.getItem('editarea');
const id = localStorage.getItem('editidcomputador');

const cancelar = document.getElementById("cancelar");
cancelar.addEventListener('click',()=>{
    window.location.href= "/dash/computador"
})