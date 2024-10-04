window.addEventListener("load", async (event) => {
    let id = document.getElementById("txtId").value;
    if (id) {
        const result = await fetch(`http://localhost:5033/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let response = await result.json();
        let user = response.user;
        document.getElementById("txtEmail").value = user.email;
        document.getElementById("txtFirstName").value = user.firstName;
        document.getElementById("txtSecondName").value = user.secondName || null;
        document.getElementById("txtFirstSurname").value = user.lastname;
        document.getElementById("txtSecondSurname").value = user.secondLastname || null;
        document.getElementById("txtPhone").value = user.phoneNumber;
        document.getElementById("txtAddress").value = user.address;
    }
});


async function handleSubmit(e, form) {
    e.preventDefault();

    const formData = new FormData(form);

    let jsonData = {};

    formData.forEach(function (value, key) {
        jsonData[key] = value;
    });

    try {

        let id = document.getElementById("txtId").value;

        let url = id ? `http://localhost:5033/users/${id}` : 'http://localhost:5033/users/register';
        let method = id ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        const result = await response.json();

        if (response.ok) {
            alert(id ? 'Usuario actualizado con éxito' : 'Usuario registrado con éxito');
            window.location.href = '/users/list';
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al registrar el usuario.');
    }
}
