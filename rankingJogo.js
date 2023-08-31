document.getElementById('rankingJogoButton').addEventListener('click', function() {
    document.getElementById('gameSelectionOverlay').style.display = 'flex';
});

document.getElementById('submitGameName').addEventListener('click', function() {
    let gameName = document.getElementById('gameInput').value;
    if (gameName) {
        let gamePerformance = getPerformance(gamesData, gameName);
        let table = document.getElementById('rankingTable');
        table.style.display = 'block';

        console.log("About to call displayPerformanceInTable");
        displayPerformanceInTable(gamePerformance);
        
        // Hide the overlay after the game is selected
        document.getElementById('gameSelectionOverlay').style.display = 'none';
    }
});


function getPerformance(data, gameName) {
    let performance = {};

    data.forEach(match => {
        if (match.jogo === gameName) {
            let lastPlace = Math.max(...match.resultados.map(r => parseInt(r.colocação)));
            console.log(`Match for ${gameName}: Last place is ${lastPlace}`);

            match.resultados.forEach(player => {
                let playerName = player.jogador;
                let playerPlacement = parseInt(player.colocação);

                let miniMatches = lastPlace - 1;
                let miniVictories = playerPlacement === 1 ? miniMatches : (lastPlace - playerPlacement);

                

                if (!performance[playerName]) {
                    performance[playerName] = {
                        miniVictories: 0,
                        miniMatches: 0,
                        percentage: 0
                    };
                }

                performance[playerName].miniVictories += miniVictories;
                performance[playerName].miniMatches += miniMatches;
            });
        }
    });

    for (let player in performance) {
        if(performance[player].miniMatches > 0) {
            performance[player].percentage = ((performance[player].miniVictories / performance[player].miniMatches) * 100).toFixed(2);
        }
    }

    

    return performance;
}


function displayPerformanceInTable(gamePerformance) {
    let tableBody = document.getElementById('rankingTable').querySelector('tbody');
    
    // Clear existing rows from the table
    let table = document.getElementById('rankingTable');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    console.log("About to populate table with:", gamePerformance);

    // Convert the gamePerformance object to an array, filter out 'Coringa' and 'Coringa 2', then sort it
    let sortedPlayers = Object.keys(gamePerformance)
    .filter(playerName => playerName !== 'Coringa' && playerName !== 'Coringa 2')
    .map(playerName => {
        return {
            name: playerName,
            ...gamePerformance[playerName]
        };
    }).sort((a, b) => b.percentage - a.percentage);  // sort in descending order

    // Use the sortedPlayers array to populate the table
    sortedPlayers.forEach(player => {
        let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.textContent = player.name;
        cell2.textContent = player.percentage + "%";
    });
}
