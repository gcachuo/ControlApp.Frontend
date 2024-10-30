window.addEventListener("load", async (event) => {
await loadEnvFile('/.env');
validateToken();
});
// Función para decodificar un JWT (base64)
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1]; // Obtener la parte del payload
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
}

// Función para verificar el token
window.validateToken=()=> {
    const accessToken = localStorage.getItem('accessToken'); // O sessionStorage

    if (!accessToken) {
        const currentPath = window.location.pathname;
        if (!currentPath.includes('login')) {
            // Redirigir al login si no hay token
            window.location.href = '/login';
        }
        return;
    }

    const decodedToken = parseJwt(accessToken);

    if (decodedToken) {
        const currentTime = Date.now() / 1000; // Tiempo actual en segundos

        // Si el token ha expirado, redirigir al login
        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('accessToken'); // Opcional: limpiar el token
            window.location.href = '/login';
        }
    } else {
        // Si no se puede decodificar el token, redirigir al login
        localStorage.removeItem('accessToken'); // Opcional: limpiar el token
        window.location.href = '/login';
    }
}

let envVars;
async function loadEnvFile(filePath) {
    try {
        const response = await fetch(filePath); // Cargar el archivo .env como texto
        const data = await response.text();     // Leer el contenido del archivo
        envVars = parseEnv(data);         // Parsear el contenido

        // Puedes usar las variables de entorno cargadas aquí
        //console.log(envVars); // Imprimir las variables en la consola

        // Ejemplo de cómo usar una variable
        //console.log("API_URL:", envVars.API_URL);
    } catch (error) {
        console.error("Error al cargar el archivo .env:", error);
    }
}

function parseEnv(envText) {
    const envVars = {};
    const lines = envText.split('\n');

    // Parsear cada línea del archivo .env
    lines.forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            envVars[key.trim()] = value.trim();
        }
    });

    return envVars; // Devolver un objeto con las variables de entorno
}
