const updatePet = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#add-pet-name').value.trim();
    const type = document.querySelector('#add-pet-type').value.trim();
    const breed = document.querySelector('#add-pet-breed').value.trim();
    const age = document.querySelector('#add-pet-age').value.trim();
    const date_added = document.querySelector('#add-pet-date-added').value.trim();
    const description = document.querySelector('#add-pet-description').value.trim();
    const owner_name = document.querySelector('#add-pet-owner-name').value.trim();
    const owner_phone = document.querySelector('#add-pet-owner-phone').value.trim();
    const owner_email = document.querySelector('#add-pet-owner-email').value.trim();
    const reward = document.querySelector('#add-pet-reward').value.trim();
    const petId = window.location.pathname.split("/")[3];
  
    if (name && type && breed && age && date_added && description && owner_name && owner_phone && owner_email && reward) {
      try {
        const response = await fetch(`/updatePet/${petId}`, {
          method: 'PUT',
          body: JSON.stringify({ name, type, breed, age, date_added, description, owner_name, owner_phone, owner_email, reward }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          const updatedPetData = await fetch(`/api/pets/${petId}`);
          const updatedPet = await updatedPetData.json();
          console.log("Updated Pet:", updatedPet);
          document.location.replace("/profile");
        } else {
          alert("Failed to update pet");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  document
    .querySelector("#update-pet")
    .addEventListener("click", updatePet);