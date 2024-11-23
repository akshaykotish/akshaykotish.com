 // JSON variable containing icons and text
 const divData = [
    { iconUrl: 'https://carteapps.com/static/media/Logo.0ba23fc20d3ba3e8e799.png', text: 'Carte Apps' },
];

// Function to add clickable divs to the header
function addClickableDiv(iconUrl, displayText) {
    const header = document.getElementById('header');

    // Create clickable div
    const clickableDiv = document.createElement('div');
    clickableDiv.className = 'clickable-div';

    // Add icon (as a sub-div with a background image)
    const iconDiv = document.createElement('div');
    iconDiv.className = 'icon';
    iconDiv.style.backgroundImage = `url(${iconUrl})`; // Set the background image from JSON
    clickableDiv.appendChild(iconDiv);

    // Add text
    const text = document.createElement('span');
    text.textContent = displayText;
    clickableDiv.appendChild(text);

    // Make the div clickable
    clickableDiv.addEventListener('click', function() {
        alert('You clicked on ' + displayText);
    });

    // Append the clickable div to the header
    header.appendChild(clickableDiv);
}

// Add clickable divs from JSON data
divData.forEach(item => {
    addClickableDiv(item.iconUrl, item.text);
});