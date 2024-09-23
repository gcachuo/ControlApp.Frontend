async function handleSubmit(e, form){

    const formData = new FormData(form);
    
    let jsonData = {};

    formData.forEach(function(value, key){
        jsonData[key] = value;

    try{
        const response =await fetch('',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username : txt-Username,
                Password : txt-Password
            })

        });

        const data =await response.JSON;

        if(response.ok){

            localStorage.setItem('token', data.token);
            //Rededirgir a pagina de bienvenida
            
            
        }else {
                alert('Error al iniciar sesión: ' + data.message);
            }
    } catch (error) {
                console.error('Error:', error);
    
        }


});
