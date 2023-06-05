const updatePet = async (event) => {
  console.log('test');
  event.preventDefault();

  const form = document.querySelector("#update-pet-form");
  const formData = new FormData(form);
  const petId = window.location.pathname.split("/")[3];
  console.log(petId);

  try {
    const response = await fetch(`/profile/updatePet/${petId}`, {
      method: 'PUT',
      body: formData,
    });
console.log(response);
    if (response.ok) {
      // const updatedPetData = await fetch(`/profile/updatePet/${petId}`);
      // const updatedPet = await updatedPetData.json();
      // console.log("Updated Pet:", updatedPet);
      document.location.replace("/profile");
    } else {
      alert("Failed to update pet");
    }
  } catch (err) {
    console.log(err);
  }
};

document.querySelector("#update-pet-btn").addEventListener("click", updatePet);