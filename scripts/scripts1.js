pdocument.addEventListener("DOMContentLoaded", function () {
  const modelViewer = document.querySelector("model-viewer");
  const arButton = document.getElementById("start-ar");
  // const actividad = document.getElementById("");

  // Función para iniciar AR al hacer clic en el botón
  arButton.addEventListener("click", () => {
    modelViewer.enterAR();
  });

  // Opcional: evento para saber cuándo comienza el modo AR
  modelViewer.addEventListener("ar-status", (event) => {
    if (event.detail.status === "started") {
      console.log("AR ha comenzado");
    }
  });

  // Evita que los eventos del slider afecten la escena XR
  document.querySelector(".slider").addEventListener("beforexrselect", (ev) => {
    ev.preventDefault();
  });
});
