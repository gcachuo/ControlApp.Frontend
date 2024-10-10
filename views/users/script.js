window.addEventListener("load", async (event) => {
    let id = document.getElementById("txtId").value;
    await loadRole();
    await loadAddresses();
    if (id) {
        await loadUserDataWithId(id);
    }
});

async function loadUserDataWithId(id) {
    const titulo = document.getElementById('lblTitulo');
    const passwordField = document.getElementById('passwordField');
    try {
        passwordField.remove();
        titulo.textContent = 'Edicion de Usuario'
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
    } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
    }
}

async function loadAddresses() {

    try {
        const response = await fetch(`http://localhost:5033/addresses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const addresses = await response.json();
            createAddressOption(addresses);
        } else {
            console.error('Error al obtener direcciones');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}

function createAddressOption(addresses) {
    const addressSelect = document.getElementById("txtAddress");
    addresses.forEach(address => {
        const option = document.createElement("option");
        option.value = `${address.street} ${address.number}`;
        option.textContent = `${address.street} ${address.number}`;
        addressSelect.appendChild(option);
    });
}

async function loadRole() {
    let method = 'GET';
    try {
        const response = await fetch('http://localhost:5033/roles/', {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener los roles');
        }

        const roles = await response.json();

        const roleSelect = document.getElementById("txtRole");

        roles.forEach(role => {
            const option = document.createElement("option");
            option.value = role.id;
            option.textContent = role.name;
            roleSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al traer los roles:', error);
    }

}

async function editUser(id, userData) {
    let uri = id;
    let method = 'PATCH';
    let jsonData = userData;

    try {
        let response = await requestUser(uri, method, jsonData);
        const result = await response.json();

        if (response.ok) {
            alert("Usuario actualizado correctamente");
            window.location.href = '/users/';
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al modificar el usuario.');
    }
}

async function createUser(userData) {
    let uri = 'register';
    let method = 'POST';
    let jsonData = userData;
    const form = document.getElementById('userForm');

    try {
        let response = await requestUser(uri, method, jsonData);
        const result = await response.json();

        if (response.ok) {
            alert("El usuario se ha creado con éxito");
            form.reset();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al crear el usuario.');
    }
}

async function requestUser(uri, method, jsonData) {
    const baseUrl = 'http://localhost:5033';
    const usersUrl = 'users';

    let url = `${baseUrl}/${usersUrl}/${uri}`;

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Error al procesar la solicitud');
    }
    return response;
}

async function handleSubmit(e, form) {
    e.preventDefault();

    const formData = new FormData(form);
    let jsonData = {};

    formData.forEach(function (value, key) {
        jsonData[key] = value;
    });

    try {
        let id = document.getElementById("txtId").value;

        if (id) {
            // SI EXISTE EL ID ENTONCES ES EDICION 
            await editUser(id, jsonData); // Usar await aquí
        } else {
            // SI NO EXISTE EL ID ENTONCES ES CREACION
            await createUser(jsonData); // Usar await aquí
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al registrar el usuario.');
    }
}
