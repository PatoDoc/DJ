document.addEventListener('DOMContentLoaded', function () {
    (function () {
        // Lista de jogadores - modifique de acordo com suas necessidades
        const players = ["Alexandre", "Calil", "Cid", "Marcondes", "Rafael", "Rodrigo", "Thayane"];

        // Função para embaralhar um array
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // Função para escolher um jogador inicial aleatório
        function chooseFirstPlayer(selectedPlayers) {
            return selectedPlayers[Math.floor(Math.random() * selectedPlayers.length)];
        }

        // Função para escolher o lado das tiles iniciais (A ou B) para cada uma das 10 tiles
        function chooseStartingTiles() {
            const tiles = [];
            for (let i = 1; i <= 10; i++) {
                const side = Math.random() < 0.5 ? 'A' : 'B';
                tiles.push(`${i}${side}`);
            }
            return tiles;
        }

        // Função para exibir os resultados em um modal
        function displayResultsInModal(firstPlayer, startingTiles) {
            const modalText = document.getElementById('modalText');
            modalText.innerHTML = ''; // Limpa o conteúdo anterior

            // Cria um parágrafo para o jogador inicial
            const firstPlayerInfo = document.createElement('p');
            firstPlayerInfo.textContent = `Primeiro jogador: ${firstPlayer}`;
            firstPlayerInfo.style.fontWeight = 'bold';
            modalText.appendChild(firstPlayerInfo);

            // Cria um parágrafo para as tiles iniciais
            const tilesInfo = document.createElement('p');
            tilesInfo.textContent = `Tiles iniciais: ${startingTiles.join(', ')}`;
            modalText.appendChild(tilesInfo);

            document.getElementById('resultModal').style.display = 'block'; // Mostra o modal
        }

        // Função para fechar o modal
        function closeModal() {
            document.getElementById('resultModal').style.display = 'none';
        }

        // Função a ser chamada quando o botão Great Western Trail é clicado
        function onGWTButtonClick(event) {
            event.preventDefault(); // Previne a ação padrão do link
            clearPlayerSelectionsGWT(); // Limpa os checkboxes

            // Mostra as caixas de seleção dos jogadores
            document.getElementById('playerSelectionGWT').style.display = 'block';
        }

        // Função a ser chamada quando o botão Enviar é clicado após selecionar jogadores
        function onSubmitPlayersGWTClick(event) {
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
            document.getElementById('playerSelectionGWT').style.display = 'none';

            // Escolhe o jogador inicial
            const firstPlayer = chooseFirstPlayer(selectedPlayers);

            // Escolhe os lados das tiles iniciais
            const startingTiles = chooseStartingTiles();

            // Exibe os resultados no modal
            displayResultsInModal(firstPlayer, startingTiles);
        }

        // Adicionando os listeners de eventos
        document.getElementById('gwtButton').addEventListener('click', onGWTButtonClick);
        document.getElementById('submitPlayersGWT').addEventListener('click', onSubmitPlayersGWTClick);
        document.querySelector('.close-button').addEventListener('click', closeModal);

        // Função para limpar as seleções dos jogadores
        function clearPlayerSelectionsGWT() {
            const checkboxes = document.querySelectorAll('#playerSelectionGWT input[name="player"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
        }
    })();
});
