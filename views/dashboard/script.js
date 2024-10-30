window.addEventListener("load", async (event) => {
    // Obtener el token desde localStorage
    const token = localStorage.getItem('access_token');

    // Decodificar el token para obtener los datos
    const decodedToken = await jwtDecode(token);

    // Obtener el rol del usuario
    const role = decodedToken.role;  // Asegúrate de que el token contenga la información de rol

    showButtonsByRole(role)

});
function navigateTo(page) {
    window.location.href = page;
};
async function jwtDecode(token) {
    const response = await fetch('/actions/jwt-decode.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ token }).toString()
    });
    const jsonResponse = await response.json();

    return jsonResponse;
};
// Función para mostrar los botones basados en el rol
function showButtonsByRole(role) {
    if (role === 'admin') {
        // Mostrar los tres botones si es administrador
        document.getElementById('admin').style.display = 'block';
    } else if (role === 'guard') {
        // Mostrar solo el botón de guardia
        document.getElementById('guard').style.display = 'block';

    } else {
        //Envia a error 403
        document.getElementById('forbidden').style.display = 'block';

    }
};
