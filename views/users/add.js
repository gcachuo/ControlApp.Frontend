window.addEventListener("load", async (event) => {
    let id=document.getElementById("txtId").value;
    if(id){
        const result = await fetch(`http://localhost:5033/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let response=await result.json();
        let user=response.user;
        document.getElementById("txtEmail").value=user.email;
        document.getElementById("txtFirstName").value=user.firstName;
        document.getElementById("txtSecondName").value=user.secondName;
        document.getElementById("txtFirstSurname").value=user.lastname;
        document.getElementById("txtSecondSurname").value=user.secondLastname;
        document.getElementById("txtPhone").value=user.phoneNumber;
        document.getElementById("txtAddress").value=user.address;
    }
});
async function handleSubmit(e, form){
    e.preventDefault();

    const formData = new FormData(form);

    let jsonData = {};

    formData.forEach(function(value, key){
        jsonData[key] = value;
    });

    try {
      
        const response = await fetch('http://localhost:5033/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Usuario registrado con éxito');
            location.reload();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al registrar el usuario.');
    }
}