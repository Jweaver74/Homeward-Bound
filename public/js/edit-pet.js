const updatePet = async (event) => {
  event.preventDefault();

  const form = document.getElementById("update-pet-form");
  const formData = new FormData(form);
  const petId = window.location.pathname.split("/")[3];
  const petData = {};
  
  for(let [name, value] of formData) {
    if (name !== "image") {
    petData[name]=value;
    }
  }

  try {
    const response = await fetch(`/profile/updatePet/${petId}`, {
      method: 'PUT',
      body: JSON.stringify(petData), 
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to update pet");
    }
  } catch (err) {
    console.log(err);
  }
};

document.querySelector("#update-pet-btn").addEventListener("click", updatePet);

