<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Crear Rol de Usuario</h3>
            <form id="frmRole" class="needs-validation" onsubmit="handleSubmit(event, this)">
                <!-- Campo para el nombre del rol -->
                <div class="mb-3">
                    <label for="txtName" class="form-label">Nombre del Rol</label>
                    <input type="text" class="form-control" id="txtName" name="name"
                           placeholder="Introduce el nombre del rol" required>
                    <div class="invalid-feedback">
                        Por favor, introduce un nombre válido para el rol.
                    </div>
                </div>

                <!-- Botones de acción -->
                <div class="d-flex justify-content-between">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                    <button type="reset" class="btn btn-secondary">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
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

        let headers = {'Content-Type': 'application/json'};
        let body = JSON.stringify(jsonData);
        return await fetch(baseUrl + uri, {method, headers, body});
    }
</script>
