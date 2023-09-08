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
    
    let gamesData;
    let DJ;

    // Function to fetch games data
    const fetchGamesData = () => {
        return fetch('jogatina.json')
            .then(response => response.json());
    };

    // Function to fetch DJ data
    const fetchDJ = () => {
        return fetch('DJ.json')
            .then(response => response.json());
    };

    // Use Promise.all to ensure both datasets are loaded before processing
    Promise.all([fetchGamesData(), fetchDJ()])
        .then(data => {
            gamesData = data[0];  // Assigning the first fetched data
            DJ = data[1];        // Assigning the second fetched data

            console.log('Data loaded into gamesData and DJ!');
            setLatestDateAsDefault();
            populateGameList(gamesData);
        })
        .catch(error => console.error('Error fetching the data:', error));
}


function populateGameList(data) {
    let gamesList = document.getElementById('gamesList');

    // Clear the current options
    while (gamesList.firstChild) {
        gamesList.removeChild(gamesList.firstChild);
    }

    let uniqueGames = [...new Set(data.map(match => match.jogo))];

    // Sort the games alphabetically
    uniqueGames.sort();

    uniqueGames.forEach(gameName => {
        let option = document.createElement('option');
        option.value = gameName;
        gamesList.appendChild(option);
    });
}
