const newSearchHandler = async (event) => {
  event.preventDefault();

  let search = document.querySelector("#searchfield").value.trim();
  search = search.split(" ").join("+");

  if (search) {
    console.log(search);
    document.location.replace(`/search/${search}`);
  } else {
    document.location.replace(`/no-results`);
  }
};

document
  .querySelector("#searchbutton")
  .addEventListener("click", newSearchHandler);


  
