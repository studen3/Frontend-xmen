const btnAbrirMenu = document.querySelector("#btnAbrir");
const btbCerrarMenu = document.querySelector("#btnCerrar");
const formularioContainer = document.querySelector(".formularioContainer");
const container = document.querySelector(".container");
const formulario = document.querySelector("#formulario");
const formularioEditarContainer = document.querySelector(".formularioEditar");
const formularioEditar = document.querySelector("#formularioEditar");

// Abrir formulario con el boton del header
btnAbrirMenu.addEventListener("click", () => {
  formularioContainer.classList.add("abrirFormulario");
});

// Cerrar formulario con el boton del formulario
btbCerrarMenu.addEventListener("click", () => {
  formularioContainer.classList.remove("abrirFormulario");
});

function mostrarPersonaje(personaje) {
  const $personaje = document.createElement("div");
  $personaje.classList.add("card");
  $personaje.id = personaje.id_personaje;
  $personaje.dataset.imagen = personaje.imagen;
  $personaje.dataset.nombre = personaje.nombre;
  $personaje.dataset.apodo = personaje.apodo;
  $personaje.dataset.genero = personaje.genero;
  $personaje.dataset.poder = personaje.poder;
  $personaje.dataset.rol = personaje.rol;
  $personaje.dataset.calificacion = personaje.calificacion;
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
}

function modificarPersonaje(personaje) {
  const $personaje = document.getElementById(personaje.id_personaje);
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
}

async function obtenerPersonajes() {
  try {
    const respuesta = await fetch("https://api-xmen.2.us-1.fl0.io/personajes");
    if (!respuesta.ok) {
      throw new Error("No se pudo obtener los personajes");
    }
    const data = await respuesta.json();
    data.forEach((personaje) => {
      mostrarPersonaje(personaje);
    });
  } catch (error) {
    console.log(error);
    alert("No se pudo obtener los personajes");
  }
}

async function crearPersonaje(personaje) {
  try {
    const respuesta = await fetch("https://api-xmen.2.us-1.fl0.io/personajes", {
      method: "POST",
      body: JSON.stringify(personaje),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await respuesta.json();
    mostrarPersonaje(data.body);
    formulario.reset();
    formularioContainer.classList.remove("abrirFormulario");
    alert("Personaje creado exitosamente");
  } catch (error) {
    console.log(error);
    alert("No se pudo crear el personaje");
  }
}

async function eliminarPersonaje(id) {
  try {
    const respuesta = await fetch(
      `https://api-xmen.2.us-1.fl0.io/personajes/${id}`,
      {
        method: "DELETE",
      }
    );

    if (respuesta.status === 204) {
      // Si la eliminación es exitosa
      const personaje = document.getElementById(id);
      personaje.remove();
      alert("Personaje eliminado exitosamente");
    } else {
      alert("No se pudo eliminar el personaje");
    }
  } catch (error) {
    console.log(error);
    alert("Ocurrió un error al eliminar el personaje");
  }
}

async function editarPersonaje(personaje) {
  fetch(`https://api-xmen.2.us-1.fl0.io/personajes/${personaje.id}`, {
    method: "PUT",
    body: JSON.stringify(personaje),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => {
      if (!respuesta.ok) throw new Error("No se pudo editar el personaje");
      return respuesta.json();
    })
    .then((data) => {
      modificarPersonaje(data.body);
      alert(data.message);
      formularioEditarContainer.classList.remove("abrirFormulario");
    })
    .catch((error) => {
      console.log(error);
      alert("No se pudo editar el personaje");
    });
}

// Obtener los personajes cuando se cargue la pagina
document.addEventListener("DOMContentLoaded", () => {
  obtenerPersonajes();
});

// Crear personaje y editar personaje
document.addEventListener("submit", (evento) => {
  evento.preventDefault();
  if (evento.target.matches("#formulario")) {
    crearPersonaje({
      imagen: evento.target.elements.imageURL.value,
      nombre: evento.target.elements.nombre.value,
      apodo: evento.target.elements.apodo.value,
      genero: evento.target.elements.genero.value,
      poder: evento.target.elements.poder.value,
      rol: evento.target.elements.rol.value,
      calificacion: evento.target.elements.calificacion.value,
    });
  }

  if (evento.target.matches("#formularioEditar")) {
    const personajeId = evento.target.parentNode.dataset.id;
    editarPersonaje({
      id: personajeId,
      imagen: evento.target.elements.imageURL.value,
      nombre: evento.target.elements.nombre.value,
      apodo: evento.target.elements.apodo.value,
      genero: evento.target.elements.genero.value,
      poder: evento.target.elements.poder.value,
      rol: evento.target.elements.rol.value,
      calificacion: evento.target.elements.calificacion.value,
    });
  }
});

// Eliminar personaje
document.addEventListener("click", (evento) => {
  if (evento.target.matches(".eliminar")) {
    const personajeId = evento.target.parentNode.id;
    eliminarPersonaje(personajeId);
  }

  if (evento.target.matches(".editar")) {
    const personajeId = evento.target.parentNode.id;
    const personaje = document.getElementById(personajeId);
    const imagen = personaje.dataset.imagen;
    const nombre = personaje.dataset.nombre;
    const apodo = personaje.dataset.apodo;
    const genero = personaje.dataset.genero;
    const poder = personaje.dataset.poder;
    const rol = personaje.dataset.rol;
    const calificacion = personaje.dataset.calificacion;

    if (genero.trim().toLowerCase() === "masculino") {
      formularioEditar.genero[0].selected = true;
      formularioEditar.genero[1].selected = false;
    } else {
      formularioEditar.genero[0].selected = false;
      formularioEditar.genero[1].selected = true;
    }
    formularioEditar.imageURL.value = imagen;
    formularioEditar.nombre.value = nombre;
    formularioEditar.apodo.value = apodo;
    formularioEditar.poder.value = poder;
    formularioEditar.rol.value = rol;
    formularioEditar.calificacion.value = calificacion;
    formularioEditarContainer.dataset.id = personajeId;

    formularioEditarContainer.classList.add("abrirFormulario");
  }

  if (evento.target.matches(".formularioEditar #btnCerrar")) {
    formularioEditarContainer.classList.remove("abrirFormulario");
  }
});
