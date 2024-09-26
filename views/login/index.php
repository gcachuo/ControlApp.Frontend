<script>
    async function handleSubmit(e, form){

const formData = new FormData(form);

let jsonData = {};

formData.forEach(function(value, key){
    jsonData[key] = value;
});

try{
    const response =await fetch('/login',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)

    });

    const data =await response.json();

    if(response.ok){

        localStorage.setItem('token', data.token);
        //Rededirigir a pagina de bienvenida
        
        
    }else {
            alert('Error al iniciar sesión: ' + data.message);
        }
} catch (error) {
            console.error('Error:', error);

    }


};

</script>
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Inicio de Sesión</h3>
            <form id="LogInForm" class="needs-validation" onsubmit="handleSubmit(event, this)">

                <div class="container mt-5 mb-5">

                    <div class="mb-3">
                        <label for="txtUsername">Usuario</label>
                        <input type="text" class="form-control" id="txtUsername" name="username" placeholder="Introduce tu usuario"required>
                        <div class="invalid-feedback">
                            Por favor, introduce un usuario válido.
                        </div>

                    </div>

                    <div class="mb-3">
                        <label for="txtPassword">Contraseña</label>
                        <input type="password" class="form-control" id="txtPassword" name="password" placeholder="Introduce la contraseña"required>
                        <div class="invalid-feedback">
                            Por favor, introduce una contraseña válida.
                        </div>
                    </div>

                    <div class="mb-3">
                        <input type="submit" class="btn btn-primary" value="Ingresar" id="logIn">
                    </div>

                    <br>

                    <div class="mb-3">
                        <input type="button" class="btn btn-secondary" value="Reestablecer contraseña" id="resetPassword">
                    </div>
            
                </div>

               

            </form>
        </div>
    </div>
</div>
