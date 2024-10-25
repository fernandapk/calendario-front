document.getElementById("but").addEventListener("click", function () {
  // Mostrar el modal de términos y condiciones
  document.getElementById("modal-terminos").style.display = "flex";
});

document.getElementById("btn-aceptar").addEventListener("click", async function (event) {
  // Ocultar el modal
  document.getElementById("modal-terminos").style.display = "none";
  event.preventDefault();
  // Continuar con el registro
  let nombre = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let contraseña = document.getElementById("pass").value;

  const url = "https://calendario-bak.onrender.com/registro"; // URL de tu servidor de registro

  try {
    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: nombre,
        email: email,
        password: contraseña,
      }),
    });

    if (respuesta.ok) {
      const data = await respuesta.json();      
      localStorage.setItem("email", email);
      localStorage.setItem("rol", "usuario");
      alert(data.message);
      window.location.href = 'pages/app/empresas.html';    
    } else {
      throw new Error("Error en el registro");
    }
  } catch (error) {
    console.error("Error al intentar registrar:", error);
    alert("Error al intentar registrar. Por favor, inténtalo nuevamente.");
  }
});

document.getElementById("btn-cancelar").addEventListener("click", function () {
  // Ocultar el modal si el usuario cancela
  document.getElementById("modal-terminos").style.display = "none";
});
