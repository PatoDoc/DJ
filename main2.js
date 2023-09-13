let gamesData = [];

function setLatestDateAsDefault() {
    // Extract all dates from the gamesData
    let allDates = gamesData.map(game => game.data);

    // Convert them to Date objects for comparison
    let dateObjects = allDates.map(dateStr => {
        let parts = dateStr.split('/');
        return new Date(parts[2], parts[1] - 1, parts[0]);  // YYYY, MM, DD format
    });

    // Get the latest date
    let latestDate = new Date(Math.max.apply(null, dateObjects));

    // Convert the latest date back to the format needed for the input value
    let yyyy = latestDate.getFullYear();
    let mm = String(latestDate.getMonth() + 1).padStart(2, '0');  // January is 0!
    let dd = String(latestDate.getDate()).padStart(2, '0');
    
    let formattedLatestDate = `${yyyy}-${mm}-${dd}`;

    document.getElementById('datePicker').value = formattedLatestDate;
}

document.getElementById('homeButton').addEventListener('click', function() {
    location.reload();
});

// Fetch data right away when the page loads
window.onload = function() {
    fetch('jogatina.json')
        .then(response => response.json())
        .then(data => {
            gamesData = data;
            setLatestDateAsDefault();
            populateGeneralGameList(gamesData);
            populateEloGameList(eloRatings);
            calculateEloRatings();
        })
        .catch(error => console.error('Error fetching the data:', error));

}


function populateGeneralGameList(data) {
    let jogoGamesList = document.getElementById('jogoGamesList');

    // Clear the current options
    while (jogoGamesList.firstChild) {
        jogoGamesList.removeChild(jogoGamesList.firstChild);
    }

    let uniqueGames = [...new Set(data.map(match => match.jogo))];

    // Sort the games alphabetically
    uniqueGames.sort();

    uniqueGames.forEach(gameName => {
        let option = document.createElement('option');
        option.value = gameName;
        jogoGamesList.appendChild(option);
    });
}