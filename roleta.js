document.getElementById('roletaButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action of the link

    var roletaDeJogosDiv = document.getElementById('roletaDeJogos');
    if (roletaDeJogosDiv.style.display === 'none' || roletaDeJogosDiv.style.display === '') {
        roletaDeJogosDiv.style.display = 'block'; // Show the section
    } else {
        roletaDeJogosDiv.style.display = 'none'; // Hide the section
    }
});
