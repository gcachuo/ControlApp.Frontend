async function handleSubmit(e, form){
    e.preventDefault();
        const formData = new FormData(form);
        
        let jsonData = {};
    
        formData.forEach(function(value, key){
            jsonData[key] = value;
        });
    
        try{
            const response =await fetch('http://localhost:5308/addresses/create',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
    
            });
    
            const data =await response.json();
    
            if (!response.ok) {
                const data = await response.json();
                alert('Error al registrar dirección: ' + data.message);
                return; // Detener si hay un error
            }
    
            alert('Dirección registrada con éxito');
            location.reload();
        } catch (error) {
                    console.error('Error:', error);
        
            }
    
    };