let gamesData = [];

fetch('jogatina.json')
    .then(response => response.json())
    .then(data => {
        gamesData = data;
        calculatePerformanceForAllPlayers();
    })
    .catch(error => console.error('Error fetching the data:', error));

function calculatePerformance(playerName) {
    let playerVictories = 0;
    let totalMiniMatches = 0;
    let gamesCounted = 0;
    
    // We'll go through gamesData in reverse to prioritize recent games
    for (let i = gamesData.length - 1; i >= 0 && gamesCounted < 40; i--) {
        let game = gamesData[i];
        let playerResult = game.resultados.find(r => r.jogador === playerName);
        
        // If the player didn't participate in this game, skip to the next iteration
        if (!playerResult) continue;

        gamesCounted++;

        // Determine the highest placement in this game
        let highestPlacement = Math.max(...game.resultados.map(r => Number(r.colocação)));

        // Mini-matches for any player in this game
        let miniMatches = highestPlacement - 1;
        totalMiniMatches += miniMatches;

        // Victories for this player in this game
        let victories = highestPlacement - Number(playerResult.colocação);
        playerVictories += victories;
    }
    
    let performancePercentage = (playerVictories / totalMiniMatches) * 100;
    console.log(`${playerName}'s performance over the last 40 games is: ${performancePercentage.toFixed(2)}%`);
}

function calculatePerformanceForAllPlayers() {
    // Get a list of all unique players
    let allPlayers = [];
    gamesData.forEach(game => {
        game.resultados.forEach(result => {
            if (!allPlayers.includes(result.jogador)) {
                allPlayers.push(result.jogador);
            }
        });
    });

    // For each unique player, calculate performance
    allPlayers.forEach(player => {
        calculatePerformance(player);
    });
}

     