let gamesData = [];

document.getElementById('homeButton').addEventListener('click', function() {
    location.reload();
});

// Fetch data right away when the page loads
window.onload = function() {
    fetch('jogatina.json')
        .then(response => response.json())
        .then(data => {
            gamesData = data;
        })
        .catch(error => console.error('Error fetching the data:', error));
}
