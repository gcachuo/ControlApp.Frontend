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

    passwordField.remove();
    titulo.textContent = 'Edicion de Usuario'

    const response = await apiRequest('GET', `users/${id}`);

    let user = response.data.user;
    document.getElementById("txtEmail").value = user.email;
    document.getElementById("txtFirstName").value = user.firstName;
    document.getElementById("txtSecondName").value = user.secondName || null;
    document.getElementById("txtFirstSurname").value = user.lastname;
    document.getElementById("txtSecondSurname").value = user.secondLastname || null;
    document.getElementById("txtPhone").value = user.phoneNumber;
    document.getElementById("txtAddress").value = user.address;
    document.getElementById("txtRole").value = user.idRole;
}

async function loadAddresses() {
    const response = await apiRequest('GET', `addresses`);
    createAddressOption(response.data.addresses);
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
    const response = await apiRequest('GET', `roles`);

    const roleSelect = document.getElementById("txtRole");

    response.data.role.forEach(role => {
        const option = document.createElement("option");
        option.value = role.id;
        option.textContent = role.name;
        roleSelect.appendChild(option);
    });
}

async function editUser(id, userData) {
    try {
        await requestUser(id, 'PATCH', userData);

        alert("Usuario actualizado correctamente");
        window.location.href = '/users/';
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al modificar el usuario.');
    }
}

async function createUser(userData) {
    const form = document.getElementById('userForm');

    try {
        await requestUser('register', 'POST', userData);

        alert("El usuario se ha creado con éxito");
        form.reset();
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al crear el usuario.');
    }
}

async function requestUser(uri, method, jsonData) {
    const response = await apiRequest(method, `users/${uri}`, jsonData);
    return response.data;
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
