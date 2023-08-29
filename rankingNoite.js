function calculatePerformanceForSession(sessionDate) {
    // Extract all games for the provided session
    let gamesInSession = gamesData.filter(g => g.data === sessionDate);
    
    // Create a set to collect all unique players in the session
    let playersInSession = new Set();
    gamesInSession.forEach(game => {
        game.resultados.forEach(result => {
            playersInSession.add(result.jogador);
        });
    });

    // Now, calculate performance for each player in the session
    let sessionPerformance = [];
    playersInSession.forEach(playerName => {
        let performance = calculatePerformance(playerName);
        sessionPerformance.push({
            name: playerName,
            performance: performance
        });
    });

    // Sort them based on performance, highest to lowest
    sessionPerformance.sort((a, b) => b.performance - a.performance);

    return sessionPerformance;
}

// Usage
let sessionDate = "21/12/2014";  // or any date you want
let sessionPerformances = calculatePerformanceForSession(sessionDate);

console.log(sessionPerformances);
