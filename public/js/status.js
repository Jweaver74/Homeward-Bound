const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#status-content').value.trim();
    const petId = window.location.pathname.split("/")[2]; 
  
    if (content) {
      const response = await fetch(`/pet/${petId}/addStatus`, {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/pet/${petId}`);
      } else {
        alert('Failed to update status.');
      }
    }
  };

  document
  .querySelector('#add-status')
  .addEventListener('click', commentFormHandler);