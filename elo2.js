

let eloRatings = {};

function calculateEloRatings() {

    // const allGames = gamesData.map(game => game.jogo);
    // const eloRatings = {};
    const gameCounts = {};
    
    // Function to calculate the probability of winning
    const probability = (rating2, rating1) => {
        return 1.0 / (1.0 + Math.pow(10, (rating2 - rating1) / 400));
    }
    
    const getKFactor = (gamesPlayed) => {
        if (gamesPlayed <= 10) return 60;
        if (gamesPlayed <= 20) return 40;
        return 20;
    }

    const computeEloRating = (rating1, rating2, isPlayer1Winner, player1, player2) => {
        const W = isPlayer1Winner ? 1 : 0;
        const pD = probability(rating2, rating1);
        let newElo1, newElo2;
    
        // Get the K values for each player
        const K1 = getKFactor(gameCounts[player1] || 0);
        const K2 = getKFactor(gameCounts[player2] || 0);
    
        if (rating1 === 0 && rating2 === 0) {
            newElo1 = isPlayer1Winner ? Math.max(1, rating1 + K1 * (W - pD)) : 1;
            newElo2 = isPlayer1Winner ? 1 : Math.max(1, rating2 + K2 * ((1 - W) - pD));
        } else if (rating1 === 0) {
            newElo1 = isPlayer1Winner ? Math.max(1, rating1 + K1 * (W - pD)) : 1;
            newElo2 = rating2 - K2 * (W - pD);
        } else if (rating2 === 0) {
            newElo2 = isPlayer1Winner ? rating2 : Math.max(1, rating2 + K2 * ((1 - W) - pD));
            newElo1 = rating1 + K1 * (W - pD);
        } else {
            newElo1 = rating1 + K1 * (W - pD);
            newElo2 = rating2 + K2 * ((1 - W) - pD);
        }
    
        // Apply Post-computation adjustments here
        newElo1 = Math.max(newElo1, 1);
        newElo2 = Math.max(newElo2, 1);
        if (rating1 >= 100) newElo1 = Math.max(newElo1, 100);
        if (rating2 >= 100) newElo2 = Math.max(newElo2, 100);
    
        if (rating1 < 100) newElo1 = Math.max(newElo1, rating1);
        if (rating2 < 100) newElo2 = Math.max(newElo2, rating2);
     
        return [Math.floor(newElo1), Math.floor(newElo2)];

    }
    
    const twoPlayerGames = gamesData.filter(game => ["1-2", "2-2"].includes(game["número de jogadores"]));
    // const schottenTottenGames = gamesData.filter(game => game.jogo === "Duelosaur Island");
    

    
    // Process each game for ELO ratings
    twoPlayerGames.forEach(game => {
        const gameName = game.jogo;
        const player1 = game.resultados[0].jogador;
        const player2 = game.resultados[1].jogador;

        if (!eloRatings[gameName]) {
            eloRatings[gameName] = {};
        }
        if (!gameCounts[gameName]) {
            gameCounts[gameName] = {};
        }

        gameCounts[gameName][player1] = (gameCounts[gameName][player1] || 0) + 1;
        gameCounts[gameName][player2] = (gameCounts[gameName][player2] || 0) + 1;

        if (!eloRatings[gameName][player1]) eloRatings[gameName][player1] = 0;
        if (!eloRatings[gameName][player2]) eloRatings[gameName][player2] = 0;

        const [newElo1, newElo2] = computeEloRating(
            eloRatings[gameName][player1],
            eloRatings[gameName][player2],
            game.resultados[0].colocação < game.resultados[1].colocação,
            player1,
            player2
        );

        eloRatings[gameName][player1] = newElo1;
        eloRatings[gameName][player2] = newElo2;
    });

    Object.keys(eloRatings).forEach(gameName => {
        delete eloRatings[gameName]["Coringa"];
        delete eloRatings[gameName]["Coringa 2"];
    });

    console.log(eloRatings);
}

document.getElementById("rankingEloButton").addEventListener("click", function() {
    document.getElementById("commonGamesList").innerHTML = '';
    
    populateEloGameList(eloRatings);

    // populateGeneralGameList(gamesData);
    document.getElementById("commonOverlay").style.display = "flex";
});


// 2. Populate Games in Dropdown
function populateEloGameList() {
    let commonGamesList = document.getElementById("commonGamesList");
    commonGamesList.innerHTML = ''; // This will clear the dropdown first
    // commonGamesList.innerHTML = '<select id="commonGamesList"></select>';
    
    // The loop below will populate the dropdown and log each game
    console.log('eloRatings:', eloRatings);

    Object.keys(eloRatings).sort().forEach(gameName => {
        console.log("Adding game:", gameName); 
        let option = document.createElement("option");
        option.value = gameName;
        commonGamesList.appendChild(option);
    });

    console.log(commonGamesList.innerHTML);

}


// 3. Event Listener for Game Selection
document.getElementById("submitCommonGameName").addEventListener("click", function() {
    let selectedGame = document.getElementById("commonGameInput").value;

    let table = document.getElementById('rankingTable');
    table.style.display = 'block';

    displayEloRankings(selectedGame);
    document.getElementById("commonOverlay").style.display = "none";
});


// 4. Populate ELO Rankings in Table
function displayEloRankings(gameName) {
    let rankingTable = document.getElementById("rankingTable").getElementsByTagName("tbody")[0];
    let table = document.getElementById('rankingTable');

    // Clear existing rows from the table
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    rankingTable.innerHTML = '';

    table.style.display = 'block'

    document.querySelector('#rankingTable th:nth-child(4)').style.display = 'block';
    document.querySelector('#rankingTable th:nth-child(3)').style.display = 'none';
    document.querySelector('#rankingTable th:nth-child(2)').style.display = 'none';

    // document.querySelector('#rankingTable th:nth-child(3)').style.opacity = '0';
    // document.querySelector('#rankingTable th:nth-child(2)').style.opacity = '0';


    document.getElementById("tableTitle").textContent = `Ranking - ${gameName}`;
    
    let sortedPlayers = Object.entries(eloRatings[gameName]).sort(([,a],[,b]) => b - a);

    sortedPlayers.forEach(([player, elo]) => {
        let row = rankingTable.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.textContent = player;
        cell2.textContent = elo;
    });
}
