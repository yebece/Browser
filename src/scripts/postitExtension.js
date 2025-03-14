var contentArea = document.querySelector('.contentarea');

// Create a postit container
const postitContainer = document.createElement('div');
postitContainer.className = 'postit-container';
contentArea.appendChild(postitContainer);

// Create a new note
function createNote(content, color, position) {
    const noteData = {
        content: content || '',
        color: color || 'yellow',
        position: position || { x: 100, y: 100 }
    };

    ipc.send('create-note', noteData);
}

contentArea.addEventListener('click', function(event) {
    createNote("Good Morning!", "yellow", { x: 100, y: 100 });
});
