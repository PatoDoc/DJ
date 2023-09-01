document.getElementById('rankingJogoButton').addEventListener('click', function() {
    document.getElementById('gameSelectionOverlay').style.display = 'flex';
});

document.getElementById('submitGameName').addEventListener('click', function() {
    let gameName = document.getElementById('gameInput').value;
    let minMatches = parseInt(prompt("Insira o número mínimo de partidas que um jogador deve ter disputado:", "1")) || 0;
    if (gameName) {
        let gamePerformance = getPerformance(gamesData, gameName, minMatches);
        document.getElementById('tableTitle').innerText = `Ranking - ${gameName}`;
        let table = document.getElementById('rankingTable');
        table.style.display = 'block';

        displayPerformanceInTable(gamePerformance, minMatches);
        
        document.getElementById('gameSelectionOverlay').style.display = 'none';
    }
});

function getPerformance(data, gameName, minMatches) {
    let performance = {};

    data.forEach(match => {
        if (match.jogo === gameName) {
            let lastPlace = Math.max(...match.resultados.map(r => parseInt(r.colocação)));

            match.resultados.forEach(player => {
                let playerName = player.jogador;
                let playerPlacement = parseInt(player.colocação);
                let playerPoints = parseInt(player.pontuação);

                let miniMatches = lastPlace - 1;
                let miniVictories = playerPlacement === 1 ? miniMatches : (lastPlace - playerPlacement);

                if (!performance[playerName]) {
                    performance[playerName] = {
                        miniVictories: 0,
                        miniMatches: 0,
                        percentage: 0,
                        matchesPlayed: 0,
                        highestPoints: 0
                    };
                }

                performance[playerName].miniVictories += miniVictories;
                performance[playerName].miniMatches += miniMatches;
                performance[playerName].matchesPlayed++;

                if (playerPoints > performance[playerName].highestPoints) {
                    performance[playerName].highestPoints = playerPoints;
                }
            });
        }
    });

    for (let player in performance) {
        if (performance[player].miniMatches > 0) {
            performance[player].percentage = ((performance[player].miniVictories / performance[player].miniMatches) * 100).toFixed(2);
        }
    }

    return performance;
}

function displayPerformanceInTable(gamePerformance, minMatches) {
    let tableBody = document.getElementById('rankingTable').querySelector('tbody');
    let table = document.getElementById('rankingTable');
    
    // Clear existing rows from the table
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Filter, map and sort players
    let sortedPlayers = Object.keys(gamePerformance)
    .filter(playerName => playerName !== 'Coringa' && playerName !== 'Coringa 2')
    .filter(playerName => gamePerformance[playerName].matchesPlayed >= minMatches)
    .map(playerName => {
        return {
            name: playerName,
            ...gamePerformance[playerName]
        };
    }).sort((a, b) => b.percentage - a.percentage);

    sortedPlayers.forEach(player => {
        let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.textContent = player.name;
        cell2.textContent = player.percentage + "%";
        cell3.textContent = player.highestPoints === 0 ? "-" : player.highestPoints;  // Display highest points here
    });
}
