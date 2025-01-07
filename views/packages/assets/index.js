async function fetchPackages() {
    try {
        return await apiRequest("GET", "packages");
    } catch (error) {
        console.error("Error al cargar paquetes:", error);
        return null;
    }
}

function createCell(textContent) {
    const cell = document.createElement("td");
    cell.textContent = textContent;
    return cell;
}

function createActionsCell(pkg) {
    const actionsCell = document.createElement("td");

    const confirmButton = createConfirmButton(pkg.id);
    actionsCell.appendChild(confirmButton);

    return actionsCell;
}

function createPackageRow(pkg) {
    const row = document.createElement("tr");

    const serviceCell = createCell(pkg.service);
    const receivedCell = createCell(pkg.received_at);
    const confirmationCell = createCell(pkg.confirmed_at);
    const addressCell = createCell(pkg.address_id);
    const statusCell = createCell(pkg.status);
    const actionsCell = createActionsCell(pkg);

    row.appendChild(serviceCell);
    row.appendChild(receivedCell);
    row.appendChild(confirmationCell);
    row.appendChild(addressCell);
    row.appendChild(statusCell);
    row.appendChild(actionsCell);

    return row;
}

function createConfirmButton(packageId) {

    const confirmButton = document.createElement("button");
    confirmButton.className = "btn btn-outline-success btn-sm";
    confirmButton.title = "Confirmar Entrega";
    confirmButton.setAttribute("data-cy", "btnConfirm");

    const confirmIcon = document.createElement("span");
    confirmIcon.className = "material-symbols-outlined";
    confirmIcon.textContent = "check_circle";
    confirmButton.appendChild(confirmIcon);

    confirmButton.onclick = async () => {
        try {
            const response = await apiRequest("POST", `packages/${packageId}/confirm`);
            if (response.success) {
                alert("Entrega confirmada.");
                await loadPackagesTable();
            } else {
                alert("No se pudo confirmar la entrega.");
            }
        } catch (error) {
            console.error("Error al confirmar entrega ", error);
        }
    };

    return confirmButton;
}

async function loadPackagesTable() {
    try {
        const response = await fetchPackages();

        console.log("API Response:", response);

        const packageTable = document.getElementById("packageTable");
        packageTable.innerHTML = "";

        response.data.packages.forEach((pkg) => {
            const row = createPackageRow(pkg);
            packageTable.appendChild(row);
        });
    } catch (error) {
        console.error("Error al cargar la tabla de paquetes ", error);
    }
}

document.getElementById("registerPackage").addEventListener("click", () => {
    window.location.href = "/packages/register.html";
});

window.addEventListener("load", async () => {
    await loadPackagesTable();
});
