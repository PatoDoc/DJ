function isTwoPlayerGame(gameName, djData) {
    const game = djData.find(entry => entry.nome === gameName);
    if (!game) return false; // Game not found

    return game["número de jogadores"] === "1-2" || game["número de jogadores"] === "2-2";
}

function calculateEloRatings(gamesData, djData) {

    const eloRatings = {};

    // Utility function to check for two-player games
    const isTwoPlayerGame = (gameName) => {
        const game = djData.find(entry => entry.nome === gameName);
        if (!game) return false;
        return game["número de jogadores"] === "1-2" || game["número de jogadores"] === "2-2";
    };

    // Function to calculate the probability of winning
    const probability = (rating2, rating1) => {
        return 1.0 / (1.0 + Math.pow(10, (rating2 - rating1) / 400));
    };

    const gameCounts = {};  // To track number of games played by each player

    const getKFactor = (gamesPlayed) => {
        if (gamesPlayed <= 10) return 60;
        if (gamesPlayed <= 20) return 40;
        return 20;
    };

    // Elo Rating calculation
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

    console.log("Rating / new rating before for", player1, ":", rating1, " ", newElo1);
    console.log("Rating / new rating before for", player2, ":", rating2, " ", newElo2);

    if (rating1 < 100) newElo1 = Math.max(newElo1, rating1);
    if (rating2 < 100) newElo2 = Math.max(newElo2, rating2);

    console.log("Rating / new rating after for", player1, ":", rating1, " ", newElo1);
    console.log("Rating / new rating after for", player2, ":", rating2, " ", newElo2);

    return [newElo1, newElo2];
}


gamesData.forEach(game => {
    if (!isTwoPlayerGame(game.jogo)) return;  // Skip if it's not a 2-player game

    const player1 = game.resultados[0].jogador;
    const player2 = game.resultados[1].jogador;

    // Initialize or increment game counts for players
    gameCounts[player1] = (gameCounts[player1] || 0) + 1;
    gameCounts[player2] = (gameCounts[player2] || 0) + 1;

    // Ensure both players have an initial ELO rating
    if (!eloRatings[player1]) eloRatings[player1] = 0;
    if (!eloRatings[player2]) eloRatings[player2] = 0;

    const [newElo1, newElo2] = computeEloRating(
        eloRatings[player1],
        eloRatings[player2],
        game.resultados[0].colocação < game.resultados[1].colocação,
        player1,
        player2
    );

    eloRatings[player1] = newElo1;
    eloRatings[player2] = newElo2;
});

console.log(eloRatings);
}