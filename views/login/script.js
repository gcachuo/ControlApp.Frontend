window.addEventListener("load", async (event) => {
    getAccessToken();
    document.getElementsByName("user_agent")[0].value = navigator.userAgent;
});

function getAccessToken() {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        location.href = "/dashboard/";
    }
}

async function handleSubmit(e, form) {
    e.preventDefault();
    const formData = new FormData(form);

    let jsonData = {};

    formData.forEach(function (value, key) {
        jsonData[key] = value;
    });

    try {
        const response = await fetch(this.envVars.API_URL + '/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)

        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('accessToken', data.accessToken);

            location.href = "/dashboard/";
        } else {
            alert('Error al iniciar sesión: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);

    }


};
