/*


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

*/

// Lista de jogadores - modifique de acordo com suas necessidades
const players = ["Alexandre", "Calil", "Cid", "Marcondes", "Rafael", "Rodrigo", "Thayane"];

const mapNames = ["Torre de Observação (1)", "Área Externa (2)", "Mapa 3", "Porto Comercial (4)", "Restaurante (5)", "Instituto de Pesquisa (6)",
    "Salões de Sorvete (7)", "Montanhas de Hollywood (8)"];

function clearPlayerSelections() {
    const checkboxes = document.querySelectorAll('input[name="player"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}
        

// Função para embaralhar um array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para obter a lista de mapas atualizada
function getMapNames() {
    // Verifica se o checkbox está marcado
    const includePromo = document.getElementById('includePromoMaps').checked;
    // Cria uma cópia da lista de mapas
    let currentMapNames = [...mapNames];
    // Se o checkbox estiver marcado, adiciona mapas promocionais
    if (includePromo) {
        currentMapNames.push("Promo Map 1", "Promo Map 2"); // Adicione seus mapas promocionais aqui
    }
    return currentMapNames;
}

// Função para atribuir dois nomes de mapas únicos a cada jogador
function assignMapNames() {
    // Usa a nova função para obter a lista atualizada de mapas
    let shuffledMapNames = shuffle(getMapNames());

    const assignedMaps = {};
    players.forEach(player => {
        // Atribui dois nomes de mapas únicos a cada jogador do array embaralhado
        assignedMaps[player] = [shuffledMapNames.pop(), shuffledMapNames.pop()];
    });

    return assignedMaps;
}

// Função para exibir os resultados em um modal
function displayResultsInModal(playerMaps) {
    const modalText = document.getElementById('modalText');
    modalText.innerHTML = ''; // Limpa o conteúdo anterior

    // Escolhe um primeiro jogador aleatório
    const playerNames = Object.keys(playerMaps);
    const firstPlayer = playerNames[Math.floor(Math.random() * playerNames.length)];

    for (const player in playerMaps) {
        const maps = playerMaps[player].join(' e ');
        const playerInfo = document.createElement('p'); // Cria um novo parágrafo para cada jogador
        playerInfo.textContent = `${player}: ${maps}`;
        
        // Se este jogador for o primeiro jogador, adiciona a nota
        if (player === firstPlayer) {
            const firstPlayerNote = document.createElement('span');
            firstPlayerNote.textContent = ' - First Player';
            firstPlayerNote.style.fontWeight = 'bold';
            playerInfo.appendChild(firstPlayerNote);
        }

        modalText.appendChild(playerInfo); // Adiciona o parágrafo ao conteúdo do modal
    }

    document.getElementById('resultModal').style.display = 'block'; // Mostra o modal
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('resultModal').style.display = 'none';
}

// Adicionando o listener de evento ao botão de fechar do modal
document.querySelector('.close-button').addEventListener('click', closeModal);

// Função a ser chamada quando o botão Ark Nova é clicado
function onArkNovaButtonClick(event) {
    event.preventDefault(); // Previne a ação padrão do link
    clearPlayerSelections(); // Limpa os checkboxes

    // Mostra as caixas de seleção dos jogadores
    document.getElementById('playerSelection').style.display = 'block';
}

// Função a ser chamada quando o botão Enviar é clicado após selecionar jogadores
function onSubmitPlayersClick(event) {
    const checkboxes = document.querySelectorAll('input[name="player"]:checked');
    let selectedPlayers = [];

    checkboxes.forEach((checkbox) => {
        selectedPlayers.push(checkbox.value);
    });

    // Assegura que há no máximo 4 jogadores
    if (selectedPlayers.length > 4) {
        alert("Por favor, selecione no máximo 4 jogadores.");
        return;
    }

    // Assegura que alguns jogadores foram selecionados
    if (selectedPlayers.length === 0) {
        alert("Por favor, selecione pelo menos um jogador.");
        return;
    }

    // Esconde as caixas de seleção dos jogadores
    document.getElementById('playerSelection').style.display = 'none';

    // Gera nomes de mapas aleatórios para os jogadores selecionados
    const playerMaps = assignMapNamesForSelectedPlayers(selectedPlayers);
    displayResultsInModal(playerMaps);
}

// Função para atribuir nomes de mapas aleatórios aos jogadores selecionados
function assignMapNamesForSelectedPlayers(selectedPlayers) {
    // Usa a nova função para obter a lista atualizada de mapas
    let shuffledMapNames = shuffle(getMapNames());

    const assignedMaps = {};
    selectedPlayers.forEach(player => {
        // Atribui dois nomes de mapas únicos ao jogador selecionado do array embaralhado
        assignedMaps[player] = [shuffledMapNames.pop(), shuffledMapNames.pop()];
    });

    return assignedMaps;
}

// Adicionando os listeners de eventos
document.getElementById('arkNovaButton').addEventListener('click', onArkNovaButtonClick);
document.getElementById('submitPlayers').addEventListener('click', onSubmitPlayersClick);
document.querySelector('.close-button').addEventListener('click', closeModal);
