function calculateSessionPerformance(date) {
    // Step 1: Filter games from the given session
    let sessionGames = gamesData.filter(game => game.data === date);

    // An object to hold mini-victories and mini-matches for each player
    let playersStats = {};

    // Step 2: Calculate mini-victories and mini-matches for each player
    for (let game of sessionGames) {
        let highestPlacement = Math.max(...game.resultados.map(r => Number(r.colocação)));
        let gameWeight = game.peso || 1;  // We assume a default weight of 1 if not provided
    
        for (let result of game.resultados) {
            let playerName = result.jogador;
            let playerPlacement = Number(result.colocação);
    
            if (!playersStats[playerName]) {
                playersStats[playerName] = { miniVictories: 0, miniMatches: 0 };
            }
    
            // Update mini-matches and apply game weight
            playersStats[playerName].miniMatches += (highestPlacement - 1) * (gameWeight - 1);
    
            // Update mini-victories and apply game weight
            playersStats[playerName].miniVictories += (highestPlacement - playerPlacement) * (gameWeight - 1);
        }
    }

    // Step 3 & 4: Sum up and calculate the performance percentage
    let performance = [];
    for (let playerName in playersStats) {
        let stats = playersStats[playerName];
        let percentage = (stats.miniVictories / stats.miniMatches) * 100;
        performance.push({
            name: playerName,
            performance: percentage
        });
    }

    // Sort by performance percentage (highest to lowest)
    performance.sort((a, b) => b.performance - a.performance);

    // Step 5: Return the results
    return performance;
}

function hideThirdColumn() {
    document.querySelector('#rankingTable th:nth-child(3)').style.display = 'none';
}

function populateNightTable(performances) {

    hideThirdColumn();
    document.querySelector('#rankingTable th:nth-child(4)').style.display = 'none';
    let table = document.getElementById('rankingTable');
    // table.querySelector('tbody').innerHTML = '';
    // var tableHeaderRowCount = 1;
    // var rowCount = table.rows.length;
    // for (var i = tableHeaderRowCount; i < rowCount; i++) {
    // table.deleteRow(tableHeaderRowCount);

    performances.forEach(player => {
        let row = table.insertRow();
        let nameCell = row.insertCell(0);
        let performanceCell = row.insertCell(1);
        performanceCell.className = "performance";

        nameCell.textContent = player.name;
        performanceCell.textContent = player.performance.toFixed(2) + '%';
    });
}

function setNightTableTitle(date) {
    document.getElementById('tableTitle').innerText = `Ranking - ${date}`;
}


document.getElementById('rankingNoiteButton').addEventListener('click', function() {
    document.getElementById('dateOverlay').style.display = 'flex';
});




document.getElementById('generateTableBtn').addEventListener('click', function() {
    console.log("Button clicked!");

    let table = document.getElementById('rankingTable');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    let rawDate = document.getElementById('datePicker').value;
    console.log("Raw date value: ", rawDate);
    if (rawDate) {
        let date = convertDate(rawDate);
        let results = calculateSessionPerformance(date);
        
        table.style.display = 'block' // Display the table
        
        setNightTableTitle(date);  // Set table title for the night session
        
        populateNightTable(results);  // Populate table with results
        
        document.getElementById('dateOverlay').style.display = 'none';  // Hide the overlay
    } else {
        console.log("No date selected, dude. Try again!");
    }

    document.getElementById('dateOverlay').style.display = 'none';

});




function convertDate(inputDate) {
    let parts = inputDate.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}