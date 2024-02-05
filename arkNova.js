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

/* Function to display results in a modal
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

*/

// Function to display results in a modal
function displayResultsInModal(playerNumbers) {
    const modalText = document.getElementById('modalText');
    modalText.innerHTML = ''; // Clear previous content

    for (const player in playerNumbers) {
        const numbers = playerNumbers[player].join(' e ');
        modalText.innerHTML += `${player}: ${numbers}<br>`; // Using <br> for line breaks
    }
}


// Function to close the modal
function closeModal() {
    document.getElementById('resultModal').style.display = 'none';
}

// Attaching event listener to the close button of the modal
document.querySelector('.close-button').addEventListener('click', closeModal);

// Function to be called when the Ark Nova button is clicked
function onArkNovaButtonClick(event) {
    console.log("Button clicked");
    event.preventDefault(); // Prevents the default action of the link
    const playerNumbers = assignRandomNumbers();
    displayResultsInModal(playerNumbers);
}

// Attaching the event listener to the Ark Nova button
document.getElementById('arkNovaButton').addEventListener('click', onArkNovaButtonClick);
