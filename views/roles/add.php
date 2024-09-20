<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Crear Rol de Usuario</h3>
            <form id="roleForm" class="needs-validation" onsubmit="handleSubmit(event, this)">
                <!-- Campo para el nombre del rol -->
                <div class="mb-3">
                    <label for="roleName" class="form-label">Nombre del Rol</label>
                    <input type="text" class="form-control" id="roleName" name="name" placeholder="Introduce el nombre del rol" required>
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
async function handleSubmit(e, form){
    e.preventDefault();
    const body = new FormData(form);
    await fetch('/actions/roles/add.php', {
        method: 'post',
        body
    })
}
</script>
