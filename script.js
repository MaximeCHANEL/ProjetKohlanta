document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("tbody");
  const rows = tableBody.querySelectorAll("tr");

  // Stocke le classement précédent par joueur
  const previousRanks = new Map();

  rows.forEach((row, index) => {
    const pointsCell = row.children[2];

    const playerName = row.children[1].innerText;
    previousRanks.set(playerName, index + 1);
  });

  function updateRanking() {
    const rowsArray = Array.from(tableBody.querySelectorAll("tr"));

    // Sauvegarder le classement actuel avant de trier
    const currentRanks = new Map();
    rowsArray.forEach((row, index) => {
      const playerName = row.children[1].innerText;
      currentRanks.set(playerName, index + 1);
    });

    // Trier les lignes par points
    rowsArray.sort((a, b) => {
      const pointsA = parseInt(a.children[2].innerText) || 0;
      const pointsB = parseInt(b.children[2].innerText) || 0;
      return pointsB - pointsA;
    });

    // Nettoyer et réinsérer dans le bon ordre
    tableBody.innerHTML = "";

    rowsArray.forEach((row, newIndex) => {
      const playerName = row.children[1].innerText;
      const oldRank = previousRanks.get(playerName);
      const newRank = newIndex + 1;

      console.log(oldRank, playerName, newRank);

      const classementCell = row.children[3];
      classementCell.textContent = `${newRank} `;

      const arrowSpan = document.createElement("span");
      arrowSpan.classList.add("arrow");

      if (oldRank && newRank < oldRank) {
        arrowSpan.innerHTML = "&#9650;"; // ▲
        arrowSpan.classList.add("up");
      } else if (oldRank && newRank > oldRank) {
        arrowSpan.innerHTML = "&#9660;"; // ▼
        arrowSpan.classList.add("down");
      } else {
        arrowSpan.innerHTML = "&#8212;"; // —
        arrowSpan.classList.add("equal");
      }

      classementCell.appendChild(arrowSpan);
      tableBody.appendChild(row);
    });

    // Met à jour les anciens rangs pour la prochaine mise à jour
    previousRanks.clear();
    currentRanks.forEach((rank, player) => {
      previousRanks.set(player, rank);
    });
  }

  updateRanking(); // Classement initial
});
