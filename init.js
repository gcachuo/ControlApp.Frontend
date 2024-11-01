window.addEventListener("load", async (event) => {
    await loadEnvFile('/.env');
    validateToken();
});

// Función para decodificar un JWT (base64)
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1]; // Obtener la parte del payload
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
}

// Función para verificar el token
window.validateToken = () => {
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

async function loadEnvFile(filePath) {
    try {
        const response = await axios.get(filePath);
        window.envVars = parseEnv(response.data);
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

async function apiRequest(method, url, data) {
    try {
        const api = axios.create({
            baseURL: window.envVars.API_URL
        });
        const response = await api({method, url, data});
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function actionRequest(method, action, data){
    const actions = axios.create({
        baseURL: "/actions/"
    });

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    const config = {
        method: method,
        url: action+'.php',
        headers: headers,
        data: new URLSearchParams(data).toString(),
    };

    try {
        const response = await actions(config);
        return response;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
}

function formDataToJson(formData) {
    const jsonObject = {};
    for (const [key, value] of formData.entries()) {
        // Si hay más de un valor para la misma clave, los almacenamos en un array
        if (jsonObject[key]) {
            if (!Array.isArray(jsonObject[key])) {
                jsonObject[key] = [jsonObject[key]];
            }
            jsonObject[key].push(value);
        } else {
            jsonObject[key] = value;
        }
    }
    return jsonObject;
}

