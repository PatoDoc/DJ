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

function populateNightTable(performances) {
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

// function setLatestDateAsDefault() {
//     // Extract all dates from the gamesData
//     let allDates = gamesData.map(game => game.data);

//     // Convert them to Date objects for comparison
//     let dateObjects = allDates.map(dateStr => {
//         let parts = dateStr.split('/');
//         return new Date(parts[2], parts[1] - 1, parts[0]);  // YYYY, MM, DD format
//     });

//     // Get the latest date
//     let latestDate = new Date(Math.max.apply(null, dateObjects));

//     // Convert the latest date back to the format needed for the input value
//     let yyyy = latestDate.getFullYear();
//     let mm = String(latestDate.getMonth() + 1).padStart(2, '0');  // January is 0!
//     let dd = String(latestDate.getDate()).padStart(2, '0');
    
//     let formattedLatestDate = `${yyyy}-${mm}-${dd}`;

//     document.getElementById('datePicker').value = formattedLatestDate;
// }


document.getElementById('rankingNoiteButton').addEventListener('click', function() {
    document.getElementById('dateContainer').style.display = 'block'; // This will show the date picker
    document.getElementById('datePicker').style.display = 'block';
});

document.getElementById('generateTableBtn').addEventListener('click', function() {
    let table = document.getElementById('rankingTable');

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    let rawDate = document.getElementById('datePicker').value;
    if (rawDate) {
        let date = convertDate(rawDate);
        let results = calculateSessionPerformance(date);

        // Display the table
        table.style.display = 'block'

        // Set table title for the night session
        setNightTableTitle(date);

        // Populate table with results
        populateNightTable(results);

        // Hide the dateContainer
        document.getElementById('dateContainer').style.display = 'none';
    } else {
        console.log("No date provided, dude. Try again!");
    }
});



function convertDate(inputDate) {
    let parts = inputDate.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

