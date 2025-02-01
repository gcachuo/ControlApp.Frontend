async function fetchRoles() {
  try {
    return await fetch("http://localhost:5033/roles", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al cargar roles:", error);
    return null;
  }
}
function createTableRow(role) {
  const row = document.createElement("tr");

  const roleCell = createCell(role.name);
  const actionsCell = createActionsCell(role);

  row.appendChild(roleCell);
  row.appendChild(actionsCell);

  return row;
}

function createCell(textContent) {
  const cell = document.createElement("td");
  cell.textContent = textContent;
  return cell;
}

function createActionsCell(role) {
  const actionsCell = document.createElement("td");

  // Boton de Asignar Permisos
  const assignButton = createAssignButton(role);
  actionsCell.appendChild(assignButton);

  return actionsCell;
}

function createAssignButton(role) {
  const assignButton = document.createElement("button");
  assignButton.className = "btn outline-secondary btn-sm me-2";
  assignButton.title = "Asignar Permisos";
  assignButton.setAttribute("data-cy", "btnAssign");

  const assignIcon = document.createElement("span");
  assignIcon.className = "material-symbols-outlined";
  assignIcon.textContent = "manage_accounts";

  assignButton.appendChild(assignIcon);

  assignButton.onclick = () => {
    window.location.href = `/roles/permissions/?id=${role.id}`;
  };

  return assignButton;
}

async function loadRolesTable() {
  try {
    const result = await fetchRoles();

    if (result && result.ok) {
      const role = await result.json();
      const roleTable = document.getElementById("roleTable");
      roleTable.innerHTML = "";

      role.roles.forEach((role) => {
        const row = createTableRow(role);
        roleTable.appendChild(row);
      });
    } else {
      console.warn("La lista está vacía");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

window.addEventListener("load", async () => {
  await loadRolesTable();
});
