const gameGrid = document.getElementById("gameGrid");
const searchBox = document.getElementById("search");

const modal = document.getElementById("gameModal");
const frame = document.getElementById("gameFrame");
const closeBtn = document.getElementById("closeBtn");

let games = [];

fetch("games.json")
    .then(response => response.json())
    .then(data => {
        games = data;
        displayGames(games);
    });

function displayGames(gameList) {
    gameGrid.innerHTML = "";

    gameList.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";

        card.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.name}">
            <h3>${game.name}</h3>
        `;

        card.addEventListener("click", () => {
            frame.srcdoc = game.iframe;
            modal.classList.remove("hidden");
        });

        gameGrid.appendChild(card);
    });
}

searchBox.addEventListener("input", () => {
    const query = searchBox.value.toLowerCase();

    const filtered = games.filter(game =>
        game.name.toLowerCase().includes(query)
    );

    displayGames(filtered);
});

closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    frame.srcdoc = "";
});
