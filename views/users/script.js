async function handleSubmit(e, form){
    e.preventDefault();

    const formData = new FormData(form);

    let jsonData = {};

    formData.forEach(function(value, key){
        jsonData[key] = value;
    });

    try {
      
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Usuario registrado con éxito');
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al registrar el usuario.');
    }
}
