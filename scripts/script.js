document.addEventListener("DOMContentLoaded", () => {
  fetch("https://mi-api-paisajes.onrender.com/paisajes")
    .then(res => res.json())
    .then(data => {
      const galeria = document.getElementById("galeria");
      data.slice(0, 20).forEach(paisaje => {
        const card = document.createElement("div");
        card.className = "card";
        const imgURL = `https://mi-api-paisajes.onrender.com${paisaje.imagen}`;
        card.innerHTML = `
          <img src="${imgURL}" alt="${paisaje.nombre}">
          <div class="card-content">
            <p>${paisaje.nombre}</p>
            <div class="buttons">
              <button class="btn" onclick="descargarImagen('${imgURL}')">Descargar</button>
              <button class="btn" onclick="compartir('${imgURL}', '${paisaje.nombre}')">Compartir</button>
            </div>
          </div>
        `;
        galeria.appendChild(card);
      });
    })
    .catch(err => console.error("Error al cargar la API:", err));

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });
});

function descargarImagen(url) {
  const a = document.createElement("a");
  a.href = url;
  a.download = "fondo.jpg";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function compartir(url, nombre) {
  if (navigator.share) {
    navigator.share({
      title: nombre,
      text: "Mira este fondo de pantalla:",
      url: url
    });
  } else {
    alert("Tu navegador no admite la función compartir.");
  }
}
