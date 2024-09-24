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
