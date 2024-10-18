
async function loadUsersTable() {
    try {
        let result = null;
        try {
            result = await fetch('http://localhost:5033/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }

        if (result.ok) {

            const users = await result.json();

            const userTable = document.getElementById('userTable');
            userTable.innerHTML = '';

            users.addresses.forEach(user => {
                const row = document.createElement('tr');

                const addressCell = document.createElement('td');
                addressCell.textContent = user.address;

                const fullNameCell = document.createElement('td');
                fullNameCell.textContent = `${user.firstName} ${user.lastName}`;

                const phoneCell = document.createElement('td');
                phoneCell.textContent = user.phoneNumber;

                const actionsCell = document.createElement('td');
                const editButton = document.createElement('button');
                editButton.className = 'btn outline-secondary btn-sm me-2';
                editButton.title = 'Editar';
                editButton.setAttribute('data-cy', 'btnEdit');
                editButton.setAttribute('data-user-id', user.id);


                const editIcon = document.createElement('span');
                editIcon.className = 'material-symbols-outlined';
                editIcon.textContent = 'edit';

                editButton.appendChild(editIcon);

                editButton.onclick = () => {
                    window.location.href = `/users/add/?id=${user.id}`;
                };

                const deactivateButton = document.createElement('button');
                deactivateButton.className = 'btn btn-outline-secondary btn-sm';
                deactivateButton.title = 'Desactivar';
                deactivateButton.disabled = true;

                const deactivateIcon = document.createElement('span');
                deactivateIcon.className = 'material-symbols-outlined';
                deactivateIcon.textContent = 'person_off';

                deactivateButton.appendChild(deactivateIcon);

                deactivateButton.onclick = () => {

                    //Codigo para desactivar usuario
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
            console.warn('La lista está vacía');
        }
    } catch (error) {
        console.error('Error: ', error);
    }
}

window.addEventListener('load', (event) => {
    loadUsersTable();
});

