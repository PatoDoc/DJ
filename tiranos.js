(function () {
    // Lista de jogadores - modifique de acordo com suas necessidades
    const players = ["Alexandre", "Calil", "Cid", "Marcondes", "Rafael", "Rodrigo", "Thayane"];
    
    // Lista de facções disponíveis no jogo
    const factions = ["Drow", "Dragões", "Elemental", "Demônios", "Aberrações", "Mortos-vivos"];
    
    // Função para embaralhar um array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Função para escolher duas facções aleatórias
    function chooseFactions() {
        let shuffledFactions = shuffle([...factions]);
        return [shuffledFactions.pop(), shuffledFactions.pop()];
    }
    
    // Função para escolher um jogador inicial aleatório
    function chooseFirstPlayer(selectedPlayers) {
        return selectedPlayers[Math.floor(Math.random() * selectedPlayers.length)];
    }
    
    // Função para escolher qual lado da área será eliminado (esquerda ou direita) quando houver 3 jogadores
    function chooseEliminatedArea() {
        return Math.random() < 0.5 ? 'esquerda' : 'direita';
    }
    
    // Função para exibir os resultados em um modal
    function displayResultsInModal(chosenFactions, firstPlayer, eliminatedArea = null) {
        const modalText = document.getElementById('modalText');
        modalText.innerHTML = ''; // Limpa o conteúdo anterior
    
        // Cria um parágrafo para as facções escolhidas
        const factionsInfo = document.createElement('p');
        factionsInfo.textContent = `Facções escolhidas: ${chosenFactions.join(' e ')}`;
        modalText.appendChild(factionsInfo);
    
        // Cria um parágrafo para o jogador inicial
        const firstPlayerInfo = document.createElement('p');
        firstPlayerInfo.textContent = `Primeiro jogador: ${firstPlayer}`;
        firstPlayerInfo.style.fontWeight = 'bold';
        modalText.appendChild(firstPlayerInfo);
    
        // Se houver 3 jogadores, exibe a área eliminada
        if (eliminatedArea) {
            const eliminatedAreaInfo = document.createElement('p');
            eliminatedAreaInfo.textContent = `Área eliminada: ${eliminatedArea}`;
            eliminatedAreaInfo.style.fontStyle = 'italic';
            modalText.appendChild(eliminatedAreaInfo);
        }
    
        document.getElementById('resultModal').style.display = 'block'; // Mostra o modal
    }
    
    // Função para fechar o modal
    function closeModal() {
        document.getElementById('resultModal').style.display = 'none';
    }
    
    // Função a ser chamada quando o botão Tiranos de Umbreterna é clicado
    function ontiranosButtonClick(event) {
        event.preventDefault(); // Previne a ação padrão do link
        clearPlayerSelections(); // Limpa os checkboxes
    
        // Mostra as caixas de seleção dos jogadores
        document.getElementById('playerSelectionGen').style.display = 'block';
    }
    
    // Função a ser chamada quando o botão Enviar é clicado após selecionar jogadores
    function onSubmitPlayersClick(event) {
        const checkboxes = document.querySelectorAll('input[name="player"]:checked');
        let selectedPlayers = [];
    
        checkboxes.forEach((checkbox) => {
            selectedPlayers.push(checkbox.value);
        });
    
        // Assegura que há no mínimo dois jogadores selecionados
        if (selectedPlayers.length < 2) {
            alert("Por favor, selecione pelo menos dois jogadores.");
            return;
        }
    
        // Esconde as caixas de seleção dos jogadores
        document.getElementById('playerSelectionGen').style.display = 'none';
    
        // Escolhe as facções e o jogador inicial
        const chosenFactions = chooseFactions();
        const firstPlayer = chooseFirstPlayer(selectedPlayers);
    
        // Se houver 3 jogadores, decide qual área será eliminada
        let eliminatedArea = null;
        if (selectedPlayers.length === 3) {
            eliminatedArea = chooseEliminatedArea();
        }
    
        // Exibe os resultados no modal
        displayResultsInModal(chosenFactions, firstPlayer, eliminatedArea);
    }
    
    // Adicionando os listeners de eventos
    document.getElementById('tiranosButton').addEventListener('click', ontiranosButtonClick);
    document.getElementById('submitPlayersGen').addEventListener('click', onSubmitPlayersClick);
    document.querySelector('.close-button').addEventListener('click', closeModal);
    
    // Função para limpar as seleções dos jogadores
    function clearPlayerSelections() {
        const checkboxes = document.querySelectorAll('input[name="player"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
    })();
    
