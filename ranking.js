function countConsecutiveAbsences(playerName) {
    let absentCount = 0;

    // Extract the unique dates (game sessions) and reverse them to start with the most recent
    let uniqueSessions = [...new Set(gamesData.map(game => game.data))].reverse();
    
    console.log(`Checking absences for player: ${playerName}`);
    console.log(`Total unique sessions: ${uniqueSessions.length}`);

    // Considering only the last 10 sessions
    for (let i = 0; i < Math.min(11, uniqueSessions.length); i++) {
        let session = uniqueSessions[i];

        // Get all games for the current session
        let gamesInSession = gamesData.filter(g => g.data === session);
        
        console.log(`Checking session: ${session}. Total games in this session: ${gamesInSession.length}`);
        
        // Check if the player participated in any game during this session
        let playerWasPresent = gamesInSession.some(game => game.resultados.some(r => r.jogador === playerName));

        if (playerWasPresent) {
            console.log(`Player ${playerName} was present in session: ${session}`);
            break;
        } else {
            absentCount++;
            console.log(`Player ${playerName} was absent in session: ${session}`);
        }
    }
    
    console.log(`Total absences for player ${playerName} in the last 10 sessions: ${absentCount}`);
    
    return absentCount;
}

function calculatePerformance(playerName) {
    let weightedPlayerVictories = 0;
    let weightedTotalMiniMatches = 0;
    let gamesCounted = 0;
    
    // We'll go through gamesData in reverse to prioritize recent games
    for (let i = gamesData.length - 1; i >= 0 && gamesCounted < 40; i--) {
        let game = gamesData[i];
        let playerResult = game.resultados.find(r => r.jogador === playerName);
        
        if (!playerResult) continue;

        gamesCounted++;

        let highestPlacement = Math.max(...game.resultados.map(r => Number(r.colocação)));
        let miniMatches = highestPlacement - 1;
        weightedTotalMiniMatches += miniMatches * (game.peso - 1);
        let victories = highestPlacement - Number(playerResult.colocação);
        weightedPlayerVictories += victories * (game.peso - 1);
    }
    
    return (weightedPlayerVictories / weightedTotalMiniMatches) * 100;
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

    // Array to store each player's performance
    let playersPerformance = [];

    // For each unique player, calculate performance
    allPlayers.forEach(player => {
        let consecutiveAbsences = countConsecutiveAbsences(player);
        if (consecutiveAbsences <= 10) {
            let performance = calculatePerformance(player);
            playersPerformance.push({ name: player, performance: performance });
        }
    });

    // Sort players based on performance, highest to lowest
    playersPerformance.sort((a, b) => b.performance - a.performance);



    // Populate the table using the sorted data
    let table = document.getElementById('rankingTable');
    table.querySelector('tbody').innerHTML = ''; // Clear existing rows
    table.style.display = 'block';  // <-- This line makes sure the table is displayed
    playersPerformance.forEach(playerData => {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = playerData.name;
        cell2.innerHTML = playerData.performance.toFixed(2) + '%';
        cell2.classList.add('performance');
    });
}


function populateTable(performances) {
    let tableBody = document.getElementById('rankingTable').querySelector('tbody');
    performances.forEach(player => {
        let row = tableBody.insertRow();
        let nameCell = row.insertCell(0);
        let performanceCell = row.insertCell(1);
        performanceCell.className = "performance";

        nameCell.textContent = player.name;
        performanceCell.textContent = player.performance.toFixed(2) + '%';
    });
}

function setTableTitle() {
    let gameSessions = new Set(gamesData.map(game => game.data));
    let totalGameSessions = gameSessions.size;
    document.getElementById('tableTitle').innerText = `Ranking da Jogatina nº ${totalGameSessions}`;
}

// Your event listener for the 'showRanking' button
document.getElementById('showRanking').addEventListener('click', function() {
    let table = document.getElementById('rankingTable');
    
    if (table.style.display === 'none' || table.style.display === '') {
        if (gamesData.length === 0) {
            console.error('Data is not yet loaded. Please try again in a few seconds.');
            return;
        }
        calculatePerformanceForAllPlayers();
    }
});