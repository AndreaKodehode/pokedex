const pokeInput = document.getElementById("pokeinput");
const pokeBtn = document.getElementById("pokebtn");
const resultInfo = document.getElementById("result");

pokeBtn.addEventListener("click", () => {
  const nameOrID = pokeInput.value;

  if (nameOrID) {
    const apiSource = `https://pokeapi.co/api/v2/pokemon/${nameOrID}`;

    const cacheData = localStorage.getItem("pokeData");

    if (cacheData) {
      displayPokeData(JSON.parse(cacheData));
    } else {
      fetch(apiSource)
        .then((Response) => {
          if (Response.ok) {
            return Response.json();
          } else {
            throw new Error("Error: " + Response.status);
          }
        })
        .then((data) => {
          localStorage.setItem(apiSource, JSON.stringify(data));
          displayPokeData(data);
        })
        .catch((Error) => {
          console.Error("Error: ", Error);
          resultInfo.textContent = "error occurred while gathering info";
        });
    }
  }
});

function displayPokeData(data) {
  while (resultInfo.firstChild) {
    resultInfo.removeChild(resultInfo.firstChild);
  }
  const pokeName = document.createElement("p");
  pokeName.textContent = "Name: " + data.name;

  const pokeHeight = document.createElement("p");
  pokeHeight.textContent = "height: " + data.height;

  const pokeWeight = document.createElement("p");
  pokeWeight.textContent = "Weight: " + data.weight;

  const pokeType = document.createElement("p");
  pokeType.textContent = "Type: " + data.types;

  resultInfo.appendChild(pokeName);
  resultInfo.appendChild(pokeHeight);
  resultInfo.appendChild(pokeWeight);
  resultInfo.appendChild(pokeType);
}
