const petFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#add-pet-name').value.trim()
    const type = document.querySelector('#add-pet-type').value.trim();
    const breed = document.querySelector('#add-pet-breed').value.trim();
    const age = document.querySelector('#add-pet-age').value.trim();
    const date_added = document.querySelector('#add-pet-date-added').value.trim();
    const description = document.querySelector('#add-pet-description').value.trim();
    const owner_name = document.querySelector('#add-pet-owner-name').value.trim();
    const owner_phone = document.querySelector('#add-pet-owner-phone').value.trim();
    const owner_email = document.querySelector('#add-pet-owner-email').value.trim();
    const reward = document.querySelector('#add-pet-reward').value.trim();
  
    if (name && type && breed && age && date_added && description && owner_name && owner_phone && owner_email && reward) {
      const response = await fetch('/profile/addPet', {
        method: 'POST',
        body: JSON.stringify({ name, type, breed, age, date_added, description, owner_name, owner_phone, owner_email, reward }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to add lost pet.');
      }
    }
  };

  document
  .querySelector('#add-pet')
  .addEventListener('click', petFormHandler);