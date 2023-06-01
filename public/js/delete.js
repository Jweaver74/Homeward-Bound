const delButtonHandler = async (event) => {
    console.log(event);
    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");
      console.log(id);
      const response = await fetch(`/api/pet/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to delete project");
      }
    }
    };

    document
        .querySelector(".delete-pet-btn")
        .addEventListener("click", delButtonHandler);