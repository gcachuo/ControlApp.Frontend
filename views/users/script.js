window.addEventListener("load", async (event) => {
    let id=document.getElementById("txtId").value;
    if(id){
        const result = await fetch(`http://localhost:5033/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let response=await result.json();
        let user=response.user;
        document.getElementById("txtEmail").value=user.email;
        document.getElementById("txtFirstName").value=user.firstName;
        document.getElementById("txtSecondName").value=user.secondName;
        document.getElementById("txtFirstSurname").value=user.lastname;
        document.getElementById("txtSecondSurname").value=user.secondLastname;
        document.getElementById("txtPhone").value=user.phoneNumber;
        document.getElementById("txtAddress").value=user.address;
    }
});
async function handleSubmit(e, form){
    e.preventDefault();

    const formData = new FormData(form);

    let jsonData = {};

    formData.forEach(function(value, key){
        jsonData[key] = value;
    });

    try {
      
        const response = await fetch('http://localhost:5033/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Usuario registrado con éxito');
            location.reload();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al registrar el usuario.');
    }
}
async function loadUsersTable() {
    try {
        const result = await fetch('http://localhost:5033/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (result.ok) {
            const users = await result.json(); 

            const userTable = document.getElementById('userTable');
            userTable.innerHTML = '';

            users.forEach(user => {
                const row = document.createElement('tr');

                const addressCell = document.createElement('td');
                addressCell.textContent = user.address;
                
                const fullNameCell = document.createElement('td');
                fullNameCell.textContent = `${user.firstName} ${user.lastName}`;
                
                const phoneCell = document.createElement('td');
                phoneCell.textContent = user.phoneNumber;

                const actionsCell = document.createElement('td');
                const editButton = document.createElement('button');
                editButton.className = 'btn btn-info btn-sm me-2';
                editButton.textContent = 'Editar';
                editButton.onclick = () => {
                    window.location.href="/users/add";
                };

                const deactivateButton = document.createElement('button');
                deactivateButton.className = 'btn btn-outline-secondary btn-sm';
                deactivateButton.textContent = 'Desactivar';
                deactivateButton.onclick = () => {
                    
                };

                actionsCell.appendChild(editButton);
                actionsCell.appendChild(deactivateButton);

                row.appendChild(addressCell);
                row.appendChild(fullNameCell);
                row.appendChild(phoneCell);
                row.appendChild(actionsCell);

                userTable.appendChild(row);
            });
        } else {
            console.error('Error al cargar la lista de usuarios');
        }
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    if (document.getElementById('userTable')) {
        loadUsersTable();
    }
});

