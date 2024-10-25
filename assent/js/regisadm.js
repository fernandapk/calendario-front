document.getElementById("formulario-registro").addEventListener("submit", async function(event) {
    event.preventDefault();
    let nombre = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let contraseña = document.getElementById("pass").value;
    let nom_emp = document.getElementById("nombre-emp").value;
    let url_img_emp = document.getElementById("url-img-emp").value;
    let code_emp = document.getElementById("code-emp").value;
    
    const url = "https://calendario-bak.onrender.com/registroadm"; 

        const data = {
            username: nombre, 
            email: email, 
            password: contraseña,
            rol : 'adm',
            nom : nom_emp,
            url_img : url_img_emp,
            code : code_emp
        }

        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
 

        if (respuesta.ok) {
            const data = await respuesta.json();
            alert(data.message);        
            localStorage.setItem("email", email);
            localStorage.setItem("rol", "administrador");
             window.location.href = '/calendario-front/pages/app/tablaadmi.html';
          
        } else {
            alert("Error en el registro");
        }

    
});
