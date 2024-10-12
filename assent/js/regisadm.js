document.getElementById("formulario-registro").addEventListener("submit", async function(event) {
    event.preventDefault();
    let nombre = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let contraseña = document.getElementById("pass").value;
    let nom_emp = document.getElementById("nombre-emp").value;
    let code_emp = document.getElementById("code-emp").value;
    const url = "http://localhost:5000/registroadm";  // URL de tu servidor de registro (cambia a http://localhost:5000 si no estás usando HTTPS)

    //try {
        console.log("-----333333-----")
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: nombre, 
                email: email, 
                password: contraseña,
                rol : 'adm',
                nom : nom_emp,
                code : code_emp
             })
        });


        console.log("--------------------")

        if (respuesta.ok) {
            const data = await respuesta.json();
            alert(data.message);
        
             window.location.href = '../pages/app/tablaadmi.html';

          
        } else {
            throw new Error("Error en el registro");
        }
    //} catch (error) {
      //  console.error("Error al intentar registrar:", error);
        //alert("Error al intentar registrar. Por favor, inténtalo nuevamente.");
    //}
    
});
