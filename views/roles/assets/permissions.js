async function fetchPermissions(roleId) {
  try {
    const response = await apiRequest("GET", `roles/${roleId}/nodes`);

    return response.data;
  } catch (error) {
    console.error("Error al cargar permisos:", error);
    return null;
  }
}

function createPermissionsTable(permissions) {
  const permissionsTable = document.getElementById("permissionsTable");

  Object.entries(permissions).forEach(([category, permissionList]) => {
    const categoryRow = document.createElement("tr");
    const categoryCell = document.createElement("td");
    categoryCell.colSpan = 2;
    categoryCell.textContent = category;
    categoryCell.style.fontWeight = "bold";
    categoryRow.appendChild(categoryCell);
    permissionsTable.appendChild(categoryRow);

    permissionList.forEach((permission) => {
      const permissionRow = document.createElement("tr");

      const permissionCell = document.createElement("td");
      permissionCell.textContent = permission;

      const checkboxCell = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.dataset.permissionName = permission;
      checkboxCell.appendChild(checkbox);

      permissionRow.appendChild(permissionCell);
      permissionRow.appendChild(checkboxCell);
      permissionsTable.appendChild(permissionRow);
    });
  });
}

async function savePermissions(roleId) {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const updatedPermissions = Array.from(checkboxes).map((checkbox) => ({
    permission: checkbox.dataset.permissionName,
    enabled: checkbox.checked,
  }));

  try {
    await apiRequest("POST", `roles/${roleId}/nodes`, updatedPermissions);

    alert("Permisos guardados con éxito.");
  } catch (error) {
    console.error("Error al guardar permisos:", error);
    alert("Hubo un error al guardar los permisos.");
  }
}

window.addEventListener("load", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const roleId = urlParams.get("id");

  const permissionsData = await fetchPermissions(roleId);

  if (permissionsData && permissionsData.message === "OK") {
    createPermissionsTable(permissionsData.permissions);
  } else {
    alert(permissionsData?.message || "Error al cargar los permisos.");
  }
});

document
  .getElementById("savePermissions")
  .addEventListener("click", async () => {
    await savePermissions(roleId);
  });
