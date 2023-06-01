const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#pet-name').value.trim();
    const description = document.querySelector('#pet-desc').value.trim();
  
    if (name && description) {
      const response = await fetch(`/api/pet`, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create lost pet');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/pet/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete lost pet');
      }
    }
  };
  
  document
    .querySelector('#addPetForm')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('#pet-list')
    .addEventListener('click', delButtonHandler);