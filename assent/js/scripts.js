document.getElementById("but").addEventListener("click", function () {
    // Mostrar el modal de términos y condiciones
    document.getElementById("modal-terminos").style.display = "flex";
  });
  
  document.getElementById("btn-aceptar").addEventListener("click", async function (event) {
    // Ocultar el modal
    document.getElementById("modal-terminos").style.display = "none";
  
    // Continuar con el registro
    let nombre = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let contraseña = document.getElementById("pass").value;
  
    const url = "http://localhost:5000/registro"; // URL de tu servidor de registro
  
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
          rol: "usuario",
        }),
      });
  
      if (respuesta.ok) {
        const data = await respuesta.json();
        alert("Registro exitoso. Rol: " + data.rol);
        if (data.rol === "usuario") {
          window.location.href = "./calendario.html";
        }
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
  