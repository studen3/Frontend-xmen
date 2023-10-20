const btnAbrirMenu = document.querySelector("#btnAbrir");
const btbCerrarMenu = document.querySelector("#btnCerrar");
const formularioContainer = document.querySelector(".formularioContainer");
const container = document.querySelector(".container");
const formulario = document.querySelector("#formulario");
const eliminarPersonaje = document.querySelector(".eliminar")

// Abrir formulario con el boton del header
btnAbrirMenu.addEventListener("click", () => {
  formularioContainer.classList.add("abrirFormulario");
});

// Cerrar formulario con el boton del formulario
btbCerrarMenu.addEventListener("click", () => {
  formularioContainer.classList.remove("abrirFormulario");
});

async function obtenerPersonajes() {
  try {
    const respuesta = await fetch("https://api-xmen.2.us-1.fl0.io/personajes");
    const data = await respuesta.json();
    data.forEach((personaje) => {
      const $personaje = document.createElement("div");
      $personaje.classList.add("card");
      $personaje.id = personaje.id_personaje;
      $personaje.innerHTML = `
        <img src="${personaje.imagen}"/>
        <h2>${personaje.nombre}</h2>
        <p>Apodo: ${personaje.apodo}</p>
        <p>Género: ${personaje.genero}</p>
        <p>Poder: ${personaje.poder}</p>
        <p>Rol: ${personaje.rol}</p>
        <p>Calificación: ${personaje.calificacion}/10</p>
        <button class="editar">Editar</button>
        <button class="eliminar">Eliminar</button>
        `;
      container.appendChild($personaje);
    });
  } catch (error) {
    console.log(error);
    alert("No se pudo obtener los personajes");
  }
}

function crearPersonaje() {
  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    try {
      const respuesta = await fetch(
        "https://api-xmen.2.us-1.fl0.io/personajes",
        {
          method: "POST",
          body: JSON.stringify({
            imagen: evento.target.elements.imageURL.value,
            nombre: evento.target.elements.nombre.value,
            apodo: evento.target.elements.apodo.value,
            genero: evento.target.elements.genero.value,
            poder: evento.target.elements.poder.value,
            rol: evento.target.elements.rol.value,
            calificacion: evento.target.elements.calificacion.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await respuesta.json();
      const personaje = data.body;
      const $personaje = document.createElement("div");
      $personaje.classList.add("card");
      $personaje.id = personaje.id_personaje;
      $personaje.innerHTML = `
        <img src="${personaje.imagen}"/>
        <h2>${personaje.nombre}</h2>
        <p>Apodo: ${personaje.apodo}</p>
        <p>Género: ${personaje.genero}</p>
        <p>Poder: ${personaje.poder}</p>
        <p>Rol: ${personaje.rol}</p>
        <p>Calificación: ${personaje.calificacion}/10</p>
        <button class="editar">Editar</button>
        <button class="eliminar">Eliminar</button>
        `;
      container.appendChild($personaje);
      formulario.reset();
      formularioContainer.classList.remove("abrirFormulario");
      alert("Personaje creado exitosamente");
    } catch (error) {
      console.log(error);
      alert("No se pudo crear el personaje");
    }
  });
}

// Eliminar personaje
function eliminarPersonaje() {
  const botonesEliminar = document.querySelectorAll(".eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", async (evento) => {
      const personajeId = evento.target.parentNode.id;

      try {
        const respuesta = await fetch(`https://api-xmen.2.us-1.fl0.io/personajes/${personajeId}`, {
          method: "DELETE",
        });

        if (respuesta.status === 200) {
          // Si la eliminación es exitosa
          evento.target.parentNode.remove();
          alert("Personaje eliminado exitosamente");
        } else {
          alert("No se pudo eliminar el personaje");
        }
      } catch (error) {
        console.log(error);
        alert("Ocurrió un error al eliminar el personaje");
      }
    });
  });
}

// Obtener los personajes cuando se cargue la pagina
document.addEventListener("DOMContentLoaded", () => {
  obtenerPersonajes();
  crearPersonaje();
  eliminarPersonaje();
});

