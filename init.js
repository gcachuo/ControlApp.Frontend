window.addEventListener("load", async (event) => {
await loadEnvFile('/.env');
});

async function loadEnvFile(filePath) {
    try {
        const response = await fetch(filePath); // Cargar el archivo .env como texto
        const data = await response.text();     // Leer el contenido del archivo
        this.envVars = parseEnv(data);         // Parsear el contenido

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
