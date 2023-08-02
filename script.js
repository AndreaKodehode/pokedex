const pokeInput = document.getElementById("pokeinput");
const pokeBtn = document.getElementById("pokebtn");
const resultInfo = document.getElementById("result");

pokeBtn.addEventListener("click", () => {
  const nameOrID = pokeInput.value;

  if (nameOrID) {
    const apiSource = `https://pokeapi.co/api/v2/pokemon/${nameOrID}`;

    const cacheData = sessionStorage.getItem("pokeData");

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
          sessionStorage.setItem(apiSource, JSON.stringify(data));
          displayPokeData(data);
        })
        .catch((Error) => {
          console.error("Error: ", Error);
          resultInfo.textContent = "error occurred while gathering info";
        });
    }
  }
});

function displayPokeData(data) {
  while (resultInfo.firstChild) {
    resultInfo.removeChild(resultInfo.firstChild);
  }

  const pokeSprite = document.createElement("img");
  pokeSprite.src = data.sprites.front_default;
  pokeSprite.alt = "Pokemon Sprite";
  resultInfo.appendChild(pokeSprite);

  function createParagraph(text) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph;
  }

  resultInfo.appendChild(createParagraph("Name: " + data.name));
  resultInfo.appendChild(createParagraph("Height: " + data.height));
  resultInfo.appendChild(createParagraph("Weight: " + data.weight));

  if (data.types.length > 0) {
    let typeText = "Type: ";
    for (let i = 0; i < data.types.length; i++) {
      typeText += data.types[i].type.name;
      if (i !== data.types.length - 1) {
        typeText += ", ";
      }
    }
    resultInfo.appendChild(createParagraph(typeText));
  }
}
