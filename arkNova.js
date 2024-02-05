// List of players - modify this according to your needs
const players = ["Alexandre", "Calil", "Cid", "Marcondes", "Rafael", "Rodrigo"];

// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/* Function to generate two unique random numbers for each player
function assignRandomNumbers() {
    const assignedNumbers = {};

    players.forEach(player => {
        let numbers = [];
        while (numbers.length < 2) {
            let randomNumber = Math.floor(Math.random() * 9) + 1;
            if (!numbers.includes(randomNumber)) {
                numbers.push(randomNumber);
            }
        }
        assignedNumbers[player] = numbers;
    });

    return assignedNumbers;
}
*/

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
    let textContent = '';

    for (const player in playerNumbers) {
        const numbers = playerNumbers[player].join(' and ');
        textContent += `${player}: ${numbers}\n`;
    }

    modalText.textContent = textContent;
    document.getElementById('resultModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
    document.getElementById('resultModal').style.display = 'none';
}

// Attaching event listener to the close button of the modal
document.querySelector('.close-button').addEventListener('click', closeModal);

// Function to be called when the Ark Nova button is clicked
// function onArkNovaButtonClick(event) {
//    event.preventDefault(); // Prevents the default action of the link
//    const playerNumbers = assignRandomNumbers();
//    displayResultsInModal(playerNumbers);
//}

// Function to be called when the Ark Nova button is clicked
function onArkNovaButtonClick(event) {
    event.preventDefault(); // Prevents the default action of the link

    // Ask for the number of players participating
    let numOfPlayers = prompt("How many players are participating? (Max 4)", "4");
    numOfPlayers = Math.min(parseInt(numOfPlayers, 10), 4);

    // Check if the input is a number and within the valid range
    if (isNaN(numOfPlayers) || numOfPlayers <= 0) {
        alert("Please enter a valid number of players.");
        return;
    }

    // Ask for the names of the players participating
    let selectedPlayers = [];
    for (let i = 1; i <= numOfPlayers; i++) {
        let playerName = prompt(`Enter name for player ${i}:`);
        if (playerName) {
            selectedPlayers.push(playerName);
        } else {
            alert("Please enter a valid name for all players.");
            return;
        }
    }

    // Generate random numbers for the selected players
    const playerNumbers = assignRandomNumbersForSelectedPlayers(selectedPlayers);
    displayResultsInModal(playerNumbers);
}

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


// Attaching the event listener to the Ark Nova button
document.getElementById('arkNovaButton').addEventListener('click', onArkNovaButtonClick);
