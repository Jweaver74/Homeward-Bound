const updatePet = async (event) => {
    const name = document.querySelector("#pet-name").value;
    const description = document.querySelector("#pet-description").value;
    const reward = document.querySelector("#pet-reward").value;
    const id = document.querySelector("#update-pet").getAttribute('date-pet');

    if(name && description && reward){
        console.log(name, description, reward, id);
        const response = await fetch(`/api/pet/${id}`, {
            method: "PUT",
            body: JSON.stringify({name, description, reward}),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(response.ok){
            document.location.replace("/dashboard");
        }
        else{
            alert("Failed to update pet");
        }   
    }
};

document
    .querySelector("#update-pet")
    .addEventListener("click", updatePet);