document.getElementById('tareas').value = localStorage.getItem('envtarea');
document.getElementById('notas').value = localStorage.getItem('envnotas');
document.getElementById('prioridad').value = localStorage.getItem('envprioridad');
document.getElementById('estado').value = localStorage.getItem('envestado');
var id = localStorage.getItem('envidcompleto');
var cancelar = document.getElementById("cancelar");
cancelar.addEventListener('click', function () {
  window.location.href = "/dash/completas";
});