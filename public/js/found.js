const foundBtn = document.querySelector("#foundBtn");

const foundPet = async (event) => {
  event.preventDefault();

  const isFound = foundBtn.getAttribute("data-found");
  const id = foundBtn.getAttribute("data-id");
  const Found_user = foundBtn.getAttribute("data-current");
  const pet_owner = foundBtn.getAttribute("data-user");
  const logged_in = foundBtn.getAttribute("data-isloggedIn");

  if (logged_in) {
    const responseUpdate = await fetch(`/api/pet/${id}`, {
      method: "PUT",
      body: JSON.stringify({ isFound, Found_user, pet_owner }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responsePost = await fetch("/api/notification", {
      method: "POST",
      body: JSON.stringify({ pet_owner, Found_user, id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    responseUpdate.ok && responsePost.ok
      ? document.location.replace("/")
      : alert("Failed to update pet");
  } else alert("You must be logged in to do that");
};

foundBtn.addEventListener("click", foundPet);
