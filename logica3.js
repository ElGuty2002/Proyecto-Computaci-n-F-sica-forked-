const opcion1 = document.getElementById("respuesta1");
const opcion2 = document.getElementById("respuesta2");
const opcion3 = document.getElementById("respuesta3");
const opcion4 = document.getElementById("respuesta4");
const botonValidar = document.getElementById("boton-respuesta");
const contenidoResultado = document.getElementById("contenido-resultado");
const contenedorCuestionario = document.getElementById("cuestionario");
const h2 = document.getElementById("h2");
const contenedorImagen = document.getElementById("contenedor-imagen");
const texto = document.getElementById("texto");
const fraccion = document.getElementById("img-fraccion");

let puntuacionJugador;
let estudiantes = [];

class Estudiante {
  constructor(nombre, puntos, foto) {
    this.nombre = nombre;
    this.puntos = puntos;
    this.foto = foto;
  }
}

// Inicializa los estudiantes
let jp = new Estudiante("Tú", 0, "./src/img/jp.png"); // Cambiado "Juan Pablo Pinto" a "Tú"
let js = new Estudiante("Juan Santiago Gutierrez", 50, "./src/img/js.png");
let at = new Estudiante("Alvaro Tenorio", 30, "./src/img/at.png");
let ga = new Estudiante("Geraldine Arcos", 20, "./src/img/ga.png");
let sp = new Estudiante("Santiago Peralta", 10, "./src/img/sp.png");

estudiantes.push(jp, js, at, ga, sp);

function comprobarRespuesta() {
  if (opcion1.checked) {
    puntuacionJugador = 45; // Asignar los 50 puntos al jugador
    jp.puntos += puntuacionJugador; // Actualiza los puntos del jugador

    Swal.fire({
      title: "¡Felicidades!",
      text: "Es la respuesta correcta",
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      mostrarResultados(); // Invoca mostrarResultados aquí
    });
  } else if (opcion2.checked || opcion3.checked || opcion4.checked) {
    Swal.fire({
      title: "Respuesta incorrecta",
      text: "Intenta de nuevo",
      icon: "error",
      confirmButtonText: "Reintentar",
    });
  } else {
    Swal.fire({
      title: "Selección requerida",
      text: "Por favor selecciona una respuesta",
      icon: "warning",
      confirmButtonText: "Ok",
    });
  }
}

function mostrarResultados() {
  // Actualiza el contenido del div para mostrar la tabla de puntos y la imagen 3D
  contenidoResultado.style.display = "block";
  contenidoResultado.style.justifyContent = "center";
  contenidoResultado.style.alignItems = "center";
  contenidoResultado.style.height = "100vh";

  // Genera la tabla de estudiantes
  mostrarEstudiantes();

  // Oculta el contenido del cuestionario
  contenedorCuestionario.style.display = "none";
  h2.style.display = "none";
  contenedorImagen.style.display = "none";
  botonValidar.style.display = "none";
  texto.style.display = "none";
  fraccion.style.display = "none";
}

function mostrarEstudiantes() {
  // Ordenar estudiantes por puntos de mayor a menor
  estudiantes.sort((a, b) => b.puntos - a.puntos);
  let aviso = `
    <div id="felicitacion"> 
    <img id="abuelo" src="./src/img/felicitacion.png"/>
    </div>
    <h3 id="texto-felicitacion">Felicitaciones has ganado ¡${jp.puntos}puntos!
  `;
  // Generar HTML para la tabla de posiciones
  let tablaHTML = `
      <h2>Tabla de posiciones</h2>
      <table border="1" id="table">
        <tr>
          <th>Posición</th>
          <th>Foto</th>
          <th>Estudiante</th>
          <th>Puntos</th>
        </tr>
    `;

  // Recorrer estudiantes y crear filas
  estudiantes.forEach((estudiante, index) => {
    // Resaltar la fila del estudiante que respondió correctamente
    const estiloFila =
      estudiante.nombre === "Tú" // Verifica el nombre exacto
        ? 'style="background-color: #458be7;"'
        : "";

    tablaHTML += `
        <tr ${estiloFila}>
          <td>${index + 1}</td>
          <td><img src="${estudiante.foto}" alt="Foto de ${
      estudiante.nombre
    }" width="50"></td>
          <td>${estudiante.nombre}</td>
          <td>${estudiante.puntos}</td>
        </tr>
      `;
  });

  tablaHTML += `</table>`;

  // Agregar contenido al div de resultados
  contenidoResultado.innerHTML =
    aviso +
    tablaHTML +
    `
      <model-viewer src="ruta/a/tu_imagen3d.glb" alt="Imagen 3D" auto-rotate camera-controls></model-viewer>
    `;
}

// Asegúrate de que el botón esté configurado para llamar a comprobarRespuesta
botonValidar.addEventListener("click", comprobarRespuesta);
