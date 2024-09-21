<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Registrar Usuario</h3>
            <form id="roleForm" class="needs-validation" onsubmit="handleSubmit(event, this)">

                <div class="container mt-5 mb-5">
                    <!-- Campo para el correo-->
                    <div class="mb-6">
                        <label for="Email" class="form-label">Correo electrónico </label>
                        <input type="email" class="form-control" id="txtEmail" name="Email" placeholder="Introduce tu correo electrónico" required>
                        <div class="invalid-feedback">
                            Por favor, introduce un correo electrónico válido.
                        </div>
                    </div>

                    <br>

                    <div class="row mb-3">
                        <!-- Campo para el primer nombre-->
                        <div class="col-md-6">
                            <label for="FirstName" class="form-label">Primer Nombre</label>
                            <input type="text" class="form-control" id="FirstName" name="name" placeholder="Introduce tu primer nombre" required>
                            <div class="invalid-feedback">
                                Por favor, introduce un nombre válido para el usuario.
                            </div>
                        </div>

                        <!-- Campo para el segundo nombre-->
                        <div class="col-md-6">
                            <label for="SecondName" class="form-label">Segundo Nombre</label>
                            <input type="text" class="form-control" id="SecondName" name="name" placeholder="Introduce tu segundo nombre">
                            <div class="invalid-feedback">
                                Por favor, introduce el nombre válido para el usuario.
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <!-- Campo para el primer apellido-->
                        <div class="col-md-6">
                            <label for="FirstSurname" class="form-label">Primer Apellido </label>
                            <input type="text" class="form-control" id="FirstSurname" name="name" placeholder="Introduce tu primer apellido">
                            <div class="invalid-feedback">
                                Por favor, introduce un apellido válido para el usuario.
                            </div>
                        </div>
                        <!-- Campo para el segundo apellido-->
                        <div class="col-md-6">
                            <label for="SecondSurname" class="form-label">Segundo Apellido </label>
                            <input type="text" class="form-control" id="SecondSurname" name="name" placeholder="Introduce tu segundo apellido">
                            <div class="invalid-feedback">
                                Por favor, introduce un apellido válido para el usuario.
                            </div>
                        </div>
                    </div>

                    <!-- Campo para la contraseña-->
                    <div class="mb-6">
                        <label for="Password" class="form-label">Contraseña </label>
                        <input type="password" class="form-control" id="txtPassword" name="Password" placeholder="Introduce la contraseña" required>
                        <div class="invalid-feedback">
                            Por favor, introduce una contraseña válida.
                        </div>
                    </div>

                    <br>
                    <!-- Campo para el telefono-->
                    <div class="mb-6">
                        <label for="Phone" class="form-label">Teléfono </label>
                        <input type="tel" class="form-control" id="Phone" name="Phone" placeholder="Introduce un teléfono" required>
                        <div class="invalid-feedback">
                            Por favor, introduce un teléfono válido.
                        </div>
                    </div>

                    <br>
                    <!-- Campo para la direccion-->
                    <div class="mb-6">
                        <label for="Address" class="form-label">Dirección</label>
                        <input type="text" class="form-control" id="Address" name="Address" placeholder="Ingresa tu dirección" required>
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