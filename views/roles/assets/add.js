async function handleSubmit(e, form) {
    e.preventDefault();

    try {
        var result = await sendRequest('POST', 'roles/create', form);
        if (!result.ok) {
            console.error(await result.json())
            return;
        }
        location.reload();
    } catch (e) {
        alert('Hubo un problema al registrar el rol.');
        console.error(e);
    }
}

async function sendRequest(method, uri, form) {
    let baseUrl = 'http://localhost:5033/';

    let jsonData = {};
    new FormData(form).forEach((value, key) => jsonData[key] = value);

    let headers = { 'Content-Type': 'application/json' };
    let body = JSON.stringify(jsonData);
    return await fetch(baseUrl + uri, { method, headers, body });
}