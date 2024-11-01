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
    const jsonData = formDataToJson(formData);

    const response = await apiRequest('POST', 'users/login', jsonData);

    localStorage.setItem('accessToken', response.data.accessToken);
    location.href = "/dashboard/";
}
