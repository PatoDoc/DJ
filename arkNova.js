// List of players - modify this according to your needs
const players = ["Alexandre", "Calil", "Cid", "Marcondes", "Rafael", "Rodrigo"];

// Function to generate two unique random numbers for each player
function assignRandomNumbers() {
    const assignedNumbers = {};

    players.forEach(player => {
        let numbers = [];
        while (numbers.length < 2) {
            let randomNumber = Math.floor(Math.random() * 8) + 1;
            if (!numbers.includes(randomNumber)) {
                numbers.push(randomNumber);
            }
        }
        assignedNumbers[player] = numbers;
    });

    return assignedNumbers;
}

// Function to display the numbers beside each player's name
function displayResults(playerNumbers) {
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = ''; // Clear previous results

    for (const player in playerNumbers) {
        const numbers = playerNumbers[player].join(' and ');
        const playerElement = document.createElement('div');
        playerElement.textContent = `${player}: ${numbers}`;
        resultsElement.appendChild(playerElement);
    }
}

// Function to be called when the Ark Nova button is clicked
function onArkNovaButtonClick(event) {
    event.preventDefault(); // Prevents the default action of the link
    const playerNumbers = assignRandomNumbers();
    displayResults(playerNumbers);
}

// Attaching the event listener to the Ark Nova button
document.getElementById('arkNovaButton').addEventListener('click', onArkNovaButtonClick);
