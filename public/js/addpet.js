// const petFormHandler = async (event) => {
//     event.preventDefault();
  
//     const name = document.querySelector('#add-pet-name').value.trim()
//     const image = document.querySelector('#add-pet-image').files[0];
//     const type = document.querySelector('#add-pet-type').value.trim();
//     const breed = document.querySelector('#add-pet-breed').value.trim();
//     const age = document.querySelector('#add-pet-age').value.trim();
//     const date_added = document.querySelector('#add-pet-date-added').value.trim();
//     const description = document.querySelector('#add-pet-description').value.trim();
//     const last_seenLocation = document.querySelector('#add-last-seenLocation').value.trim();
//     const owner_name = document.querySelector('#add-pet-owner-name').value.trim();
//     const owner_phone = document.querySelector('#add-pet-owner-phone').value.trim();
//     const owner_email = document.querySelector('#add-pet-owner-email').value.trim();
//     const reward = document.querySelector('#add-pet-reward').value.trim();
  
//     if (name && image && type && breed && age && date_added && description && last_seenLocation && owner_name && owner_phone && owner_email && reward) {
//       const response = await fetch('/profile/addPet', {
//         method: 'POST',
//         body: JSON.stringify({ name, image, type, breed, age, date_added, description, last_seenLocation, owner_name, owner_phone, owner_email, reward }),
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert('Failed to add pet.');
//       }
//     }
//   };

//   document
//   .querySelector('#add-pet')
//   .addEventListener('click', petFormHandler);


const petFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#add-pet-name').value.trim();
  const image = document.querySelector('#add-pet-image').files[0];
  const type = document.querySelector('#add-pet-type').value.trim();
  const breed = document.querySelector('#add-pet-breed').value.trim();
  const age = document.querySelector('#add-pet-age').value.trim();
  const date_added = document.querySelector('#add-pet-date-added').value.trim();
  const description = document.querySelector('#add-pet-description').value.trim();
  const last_seenLocation = document.querySelector('#add-last-seenLocation').value.trim();
  const owner_name = document.querySelector('#add-pet-owner-name').value.trim();
  const owner_phone = document.querySelector('#add-pet-owner-phone').value.trim();
  const owner_email = document.querySelector('#add-pet-owner-email').value.trim();
  const reward = document.querySelector('#add-pet-reward').value.trim();

  if (name && image && type && breed && age && date_added && description && last_seenLocation && owner_name && owner_phone && owner_email && reward) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('type', type);
    formData.append('breed', breed);
    formData.append('age', age);
    formData.append('date_added', date_added);
    formData.append('description', description);
    formData.append('last_seenLocation', last_seenLocation);
    formData.append('owner_name', owner_name);
    formData.append('owner_phone', owner_phone);
    formData.append('owner_email', owner_email);
    formData.append('reward', reward);

    const response = await fetch('/profile/addPet', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to add lost pet.');
    }
  }
};

document.querySelector('#add-pet').addEventListener('click', petFormHandler);