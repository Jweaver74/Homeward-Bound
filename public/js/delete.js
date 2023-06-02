const deletePet = async (event) => {
  event.preventDefault();

  const petId = window.location.pathname.split("/")[3];

  console.log(petId);

  const response = await fetch(`/profile/deletePet/${petId}`, {
      method: "DELETE",
  });
      if (response.ok) {
        document.location.replace("/profile");
      } else {
        alert("Failed to delete pet");
      }
    };

    document
        .querySelector("#delete-pet")
        .addEventListener("click", deletePet);