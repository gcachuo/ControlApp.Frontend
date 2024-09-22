<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Registrar Usuario</h3>
            <form id="roleForm" class="needs-validation" onsubmit="handleSubmit(event, this)">

                <div class="container mt-5 mb-5">
                    <!-- Campo para el correo-->
                    <div class="mb-6">
                        <label for="txtEmail" class="form-label">Correo electrónico </label>
                        <input type="email" class="form-control" id="txtEmail" name="email" placeholder="Introduce tu correo electrónico" required>
                        <div class="invalid-feedback">
                            Por favor, introduce un correo electrónico válido.
                        </div>
                    </div>

                    <br>

                    <div class="row mb-3">
                        <!-- Campo para el primer nombre-->
                        <div class="col-md-6">
                            <label for="txtFirstName" class="form-label">Primer Nombre</label>
                            <input type="text" class="form-control" id="txtFirstName" name="firstName" placeholder="Introduce tu primer nombre" required>
                            <div class="invalid-feedback">
                                Por favor, introduce un nombre válido para el usuario.
                            </div>
                        </div>

                        <!-- Campo para el segundo nombre-->
                        <div class="col-md-6">
                            <label for="txtSecondName" class="form-label">Segundo Nombre</label>
                            <input type="text" class="form-control" id="txtSecondName" name="secondName" placeholder="Introduce tu segundo nombre">
                            <div class="invalid-feedback">
                                Por favor, introduce el nombre válido para el usuario.
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <!-- Campo para el primer apellido-->
                        <div class="col-md-6">
                            <label for="txtFirstSurname" class="form-label">Primer Apellido </label>
                            <input type="text" class="form-control" id="txtFirstSurname" name="firstSurname" placeholder="Introduce tu primer apellido"required>
                            <div class="invalid-feedback">
                                Por favor, introduce un apellido válido para el usuario.
                            </div>
                        </div>
                        <!-- Campo para el segundo apellido-->
                        <div class="col-md-6">
                            <label for="txtSecondSurname" class="form-label">Segundo Apellido </label>
                            <input type="text" class="form-control" id="txtSecondSurname" name="secondSurname" placeholder="Introduce tu segundo apellido">
                            <div class="invalid-feedback">
                                Por favor, introduce un apellido válido para el usuario.
                            </div>
                        </div>
                    </div>

                    <!-- Campo para la contraseña-->
                    <div class="mb-6">
                        <label for="txtPassword" class="form-label">Contraseña </label>
                        <input type="password" class="form-control" id="txtPassword" name="password" placeholder="Introduce la contraseña" required>
                        <div class="invalid-feedback">
                            Por favor, introduce una contraseña válida.
                        </div>
                    </div>

                    <br>
                    <!-- Campo para el telefono-->
                    <div class="mb-6">
                        <label for="txtPhone" class="form-label">Teléfono </label>
                        <input maxlength="10" type="tel" class="form-control" id="txtPhone" name="phone" placeholder="Introduce un teléfono" required>
                        <div class="invalid-feedback">
                            Por favor, introduce un teléfono válido.
                        </div>
                    </div>

                    <br>
                    <!-- Campo para la direccion-->
                    <div class="mb-6">
                        <label for="txtAddress" class="form-label">Dirección</label>
                        <input  type="text" class="form-control" id="txtAddress" name="address" placeholder="Ingresa tu dirección" required>
                        <div class="invalid-feedback">
                            Por favor, ingresa una dirección válida.
                        </div>
                    </div>

                
                    <br>
                    <!-- Botones de acción -->
                    <div class="d-flex justify-content-between">
                        <button type="submit" class="btn btn-primary">Guardar</button>
                        <button type="reset" class="btn btn-secondary">Cancelar</button>
                    </div>

                </div>

            </form>
        </div>
    </div>
</div>
<script>
async function handleSubmit(e, form){
    e.preventDefault();

    alert('Simulación de envío');

}
</script>