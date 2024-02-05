// List of players - modify this according to your needs
const players = ["Alexandre", "Calil", "Cid", "Marcondes", "Rafael", "Rodrigo"];

// Function to generate two unique random numbers for each player
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

// Function to display the numbers in a table beside each player's name
function displayResultsInTable(playerNumbers) {
    const resultsTableBody = document.getElementById('resultsTableBody');
    resultsTableBody.innerHTML = ''; // Clear previous results

    for (const player in playerNumbers) {
        const numbers = playerNumbers[player].join(' and ');
        const row = resultsTableBody.insertRow();
        const playerNameCell = row.insertCell(0);
        const numbersCell = row.insertCell(1);

        playerNameCell.textContent = player;
        numbersCell.textContent = numbers;
    }
}

// Function to be called when the Ark Nova button is clicked
function onArkNovaButtonClick(event) {
    event.preventDefault(); // Prevents the default action of the link
    const playerNumbers = assignRandomNumbers();
    displayResultsInTable(playerNumbers);
}

// Attaching the event listener to the Ark Nova button
document.getElementById('arkNovaButton').addEventListener('click', onArkNovaButtonClick);
