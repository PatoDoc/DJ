/*
// List of players - modify this according to your needs
const players = ["Alexandre", "Calil", "Cid", "Marcondes", "Rafael", "Rodrigo", "Thayane"];

// List of map names - replace these with actual map names you want to use
const mapNames = ["Torre de Observação (1)", "Área Externa (2)", "Mapa 3", "Porto Comercial (4)", "Restaurante (5)", "Instituto de Pesquisa (6)", "Salões de Sorvete (7)", "Montanhas de Hollywood (8)"];

// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// Function to generate two unique random numbers for each player
function assignRandomNumbers() {
    // Create an array with numbers 1 to 9
    let numbers = shuffle([...Array(8).keys()].map(x => x + 1));

    const assignedNumbers = {};
    players.forEach(player => {
        // Assign two unique numbers to each player from the shuffled array
        assignedNumbers[player] = [numbers.pop(), numbers.pop()];
    });

    return assignedNumbers;
}

// Function to display results in a modal
function displayResultsInModal(playerNumbers) {
    const modalText = document.getElementById('modalText');
    modalText.innerHTML = ''; // Clear previous content

    // Choose a random first player
    const playerNames = Object.keys(playerNumbers);
    const firstPlayer = playerNames[Math.floor(Math.random() * playerNames.length)];

    for (const player in playerNumbers) {
        const numbers = playerNumbers[player].join(' e ');
        const playerInfo = document.createElement('p'); // Create a new paragraph for each player
        playerInfo.textContent = `${player}: ${numbers}`;
        
        // If this player is the first player, append the note
        if (player === firstPlayer) {
            const firstPlayerNote = document.createElement('span');
            firstPlayerNote.textContent = ' - First Player';
            firstPlayerNote.style.fontWeight = 'bold';
            playerInfo.appendChild(firstPlayerNote);
        }

        modalText.appendChild(playerInfo); // Append the paragraph to the modal content
    }

    document.getElementById('resultModal').style.display = 'block'; // Show the modal
}


// Function to close the modal
function closeModal() {
    document.getElementById('resultModal').style.display = 'none';
}

// Attaching event listener to the close button of the modal
document.querySelector('.close-button').addEventListener('click', closeModal);


// Function to be called when the Ark Nova button is clicked
function onArkNovaButtonClick(event) {
    event.preventDefault(); // Prevents the default action of the link

    // Show the player selection checkboxes
    document.getElementById('playerSelection').style.display = 'block';
}

// Function to be called when the Submit button is clicked after selecting players
function onSubmitPlayersClick(event) {
    const checkboxes = document.querySelectorAll('input[name="player"]:checked');
    let selectedPlayers = [];

    checkboxes.forEach((checkbox) => {
        selectedPlayers.push(checkbox.value);
    });

    // Ensure there are at most 4 players
    if (selectedPlayers.length > 4) {
        alert("Please select no more than 4 players.");
        return;
    }

    // Ensure that some players are selected
    if (selectedPlayers.length === 0) {
        alert("Please select at least one player.");
        return;
    }

    // Hide the player selection checkboxes
    document.getElementById('playerSelection').style.display = 'none';

    // Generate random numbers for the selected players
    const playerNumbers = assignRandomNumbersForSelectedPlayers(selectedPlayers);
    displayResultsInModal(playerNumbers);
}

// Function to close the modal
function closeModal() {
    document.getElementById('resultModal').style.display = 'none';
}

// Attaching the event listener to the Submit button
document.getElementById('submitPlayers').addEventListener('click', onSubmitPlayersClick);


// New function to assign random numbers to selected players
function assignRandomNumbersForSelectedPlayers(selectedPlayers) {
    // Create an array with numbers 1 to 9
    let numbers = shuffle([...Array(8).keys()].map(x => x + 1));

    const assignedNumbers = {};
    selectedPlayers.forEach(player => {
        // Assign two unique numbers to the selected player from the shuffled array
        assignedNumbers[player] = [numbers.pop(), numbers.pop()];
    });

    return assignedNumbers;
}

// Attaching the event listeners
document.getElementById('arkNovaButton').addEventListener('click', onArkNovaButtonClick);
document.getElementById('submitPlayers').addEventListener('click', onSubmitPlayersClick);
document.querySelector('.close-button').addEventListener('click', closeModal);
*/

// List of players - modify this according to your needs
const players = ["Alexandre", "Calil", "Cid", "Marcondes", "Rafael", "Rodrigo", "Thayane"];

// List of map names
const mapNames = ["Torre de Observação (1)", "Área Externa (2)", "Mapa 3", "Porto Comercial (4)", "Restaurante (5)", "Instituto de Pesquisa (6)",
    "Salões de Sorvete (7)", "Montanhas de Hollywood (8)"];

// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to assign two unique map names to each player
function assignMapNames() {
    // Shuffle the map names
    let shuffledMapNames = shuffle([...mapNames]);

    const assignedMaps = {};
    players.forEach(player => {
        // Assign two unique map names to each player from the shuffled array
        assignedMaps[player] = [shuffledMapNames.pop(), shuffledMapNames.pop()];
    });

    return assignedMaps;
}

// Function to display results in a modal
function displayResultsInModal(playerMaps) {
    const modalText = document.getElementById('modalText');
    modalText.innerHTML = ''; // Clear previous content

    // Choose a random first player
    const playerNames = Object.keys(playerMaps);
    const firstPlayer = playerNames[Math.floor(Math.random() * playerNames.length)];

    for (const player in playerMaps) {
        const maps = playerMaps[player].join(' e ');
        const playerInfo = document.createElement('p'); // Create a new paragraph for each player
        playerInfo.textContent = `${player}: ${maps}`;
        
        // If this player is the first player, append the note
        if (player === firstPlayer) {
            const firstPlayerNote = document.createElement('span');
            firstPlayerNote.textContent = ' - First Player';
            firstPlayerNote.style.fontWeight = 'bold';
            playerInfo.appendChild(firstPlayerNote);
        }

        modalText.appendChild(playerInfo); // Append the paragraph to the modal content
    }

    document.getElementById('resultModal').style.display = 'block'; // Show the modal
}

// Function to close the modal
function closeModal() {
    document.getElementById('resultModal').style.display = 'none';
}

// Attaching event listener to the close button of the modal
document.querySelector('.close-button').addEventListener('click', closeModal);

// Function to be called when the Ark Nova button is clicked
function onArkNovaButtonClick(event) {
    event.preventDefault(); // Prevents the default action of the link

    // Show the player selection checkboxes
    document.getElementById('playerSelection').style.display = 'block';
}

// Function to be called when the Submit button is clicked after selecting players
function onSubmitPlayersClick(event) {
    const checkboxes = document.querySelectorAll('input[name="player"]:checked');
    let selectedPlayers = [];

    checkboxes.forEach((checkbox) => {
        selectedPlayers.push(checkbox.value);
    });

    // Ensure there are at most 4 players
    if (selectedPlayers.length > 4) {
        alert("Please select no more than 4 players.");
        return;
    }

    // Ensure that some players are selected
    if (selectedPlayers.length === 0) {
        alert("Please select at least one player.");
        return;
    }

    // Hide the player selection checkboxes
    document.getElementById('playerSelection').style.display = 'none';

    // Generate random map names for the selected players
    const playerMaps = assignMapNamesForSelectedPlayers(selectedPlayers);
    displayResultsInModal(playerMaps);
}

// New function to assign random map names to selected players
function assignMapNamesForSelectedPlayers(selectedPlayers) {
    // Shuffle the map names
    let shuffledMapNames = shuffle([...mapNames]);

    const assignedMaps = {};
    selectedPlayers.forEach(player => {
        // Assign two unique map names to the selected player from the shuffled array
        assignedMaps[player] = [shuffledMapNames.pop(), shuffledMapNames.pop()];
    });

    return assignedMaps;
}

// Attaching the event listeners
document.getElementById('arkNovaButton').addEventListener('click', onArkNovaButtonClick);
document.getElementById('submitPlayers').addEventListener('click', onSubmitPlayersClick);
document.querySelector('.close-button').addEventListener('click', closeModal);
