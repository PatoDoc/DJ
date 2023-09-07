function fetchData() {
    const url = document.getElementById('urlInput').value;

    fetch('/fetchDataFromUrl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Display the fetched data on your website or do other stuff.
    });
}
