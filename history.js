function populateHistoricoTable() {
    let rankingTable = document.getElementById('rankingTable');
    rankingTable.style.display = 'none';  // Hide the ranking table
    
    let table = document.getElementById('historicoTable');
    let thead = table.querySelector('thead');
    let tbody = table.querySelector('tbody');

    // Clear existing headers and rows
    thead.innerHTML = '';
    tbody.innerHTML = '';

    // Populate headers
    let headers = ["ID da Partida", "Data", "Jogo", "Peso"];
    let allPlayers = [...new Set(gamesData.flatMap(game => game.resultados.map(r => r.jogador)))];

    allPlayers.forEach(player => {
        headers.push(player + " (Colocação)", player + " (Pontuação)");
    });

    let headerRow = thead.insertRow();
    headers.forEach(headerText => {
        let th = document.createElement('th');
        th.innerText = headerText;
        headerRow.appendChild(th);
    });

    // Populate rows with data
    gamesData.forEach(game => {
        let row = tbody.insertRow();

        // Columns for ID, Data, Jogo, Peso
        [game._id, game.data, game.jogo, game.peso].forEach(text => {
            let cell = row.insertCell();
            cell.innerText = text;
        });

        // Columns for each player's colocação and pontuação
        allPlayers.forEach(player => {
            let playerResult = game.resultados.find(r => r.jogador === player);
            let colocacaoCell = row.insertCell();
            let pontuacaoCell = row.insertCell();
            if (playerResult) {
                colocacaoCell.innerText = playerResult.colocação;
                pontuacaoCell.innerText = playerResult.pontuação;
            } else {
                colocacaoCell.innerText = '-';
                pontuacaoCell.innerText = '-';
            }
        });
    });
}

document.getElementById('showHistory').addEventListener('click', populateHistoricoTable);