async function fetchUsers() {
    try {
        return await fetch('http://localhost:5033/users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        return null;
    }
}

function createTableRow(user) {
    const row = document.createElement('tr');

    const addressCell = createCell(user.address);
    const fullNameCell = createCell(`${user.firstName} ${user.lastName}`);
    const phoneCell = createCell(user.phoneNumber);
    const actionsCell = createActionsCell(user);

    row.appendChild(addressCell);
    row.appendChild(fullNameCell);
    row.appendChild(phoneCell);
    row.appendChild(actionsCell);

    return row;
}

function createCell(textContent) {
    const cell = document.createElement('td');
    cell.textContent = textContent;
    return cell;
}

function createActionsCell(user) {
    const actionsCell = document.createElement('td');

    // Boton de Editar
    const editButton = createEditButton(user);
    actionsCell.appendChild(editButton);

    // Boton de Desactivar
    const deactivateButton = createDeactivateButton();
    actionsCell.appendChild(deactivateButton);

    return actionsCell;
}

function createEditButton(user) {
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

    return editButton;
}

function createDeactivateButton() {
    const deactivateButton = document.createElement('button');
    deactivateButton.className = 'btn btn-outline-secondary btn-sm';
    deactivateButton.title = 'Desactivar';
    deactivateButton.disabled = true;
    deactivateButton.setAttribute('data-cy', 'btnDeactivate');

    const deactivateIcon = document.createElement('span');
    deactivateIcon.className = 'material-symbols-outlined';
    deactivateIcon.textContent = 'person_off';
    deactivateButton.appendChild(deactivateIcon);

    return deactivateButton;
}

async function loadUsersTable() {
    try {
        const result = await fetchUsers();

        if (result && result.ok) {
            const users = await result.json();
            const userTable = document.getElementById('userTable');
            userTable.innerHTML = '';

            users.addresses.forEach(user => {
                const row = createTableRow(user);
                userTable.appendChild(row);
            });
        } else {
            console.warn('La lista está vacía');
        }
    } catch (error) {
        console.error('Error: ', error);
    }
}

window.addEventListener('load', () => {
    loadUsersTable();
});
