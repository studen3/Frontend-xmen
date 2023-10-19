/*// Obtenemos referencias a los elementos del DOM
const mostrarFormularioButton = document.getElementById("mostrarFormulario");
const formularioContainer = document.getElementById("formularioContainer");
const agregarButton = document.getElementById("agregar");

// Agregamos un manejador de eventos al botón para mostrar/ocultar el formulario
mostrarFormularioButton.addEventListener("click", () => {
    formularioContainer.classList.toggle("oculto");
});

// Agregamos un manejador de eventos al botón "Agregar" para realizar la acción deseada
agregarButton.addEventListener("click", () => {
    // Aquí puedes recopilar los valores de los campos del formulario y realizar la acción deseada
    const imagen = document.getElementById("imagen").value;
    const nombre = document.getElementById("nombre").value;
    const apodo = document.getElementById("apodo").value;
    const genero = document.getElementById("genero").value;
    const poder = document.getElementById("poder").value;
    const rol = document.getElementById("rol").value;
    const calificacion = document.getElementById("calificacion").value;

    // Puedes hacer lo que necesites con estos valores, por ejemplo, agregarlos a una lista de personajes.
    console.log("Personaje agregado:", {
        imagen,
        nombre,
        apodo,
        genero,
        poder,
        rol,
        calificacion
    });

    // Limpia los campos del formulario
    document.getElementById("formulario").reset();
});*/

