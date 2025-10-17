document.addEventListener('DOMContentLoaded', () => {
    // DOM element references
    const noteInput = document.getElementById('noteInput');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const notesList = document.getElementById('notesList');

    // Array to store note objects: [{ id: number, text: string }]
    let notes = [];

    /**
     * Loads notes from localStorage and initializes the notes array.
     * If no notes are found, initializes an empty array.
     */
    const loadNotes = () => {
        const storedNotes = localStorage.getItem('notesApp');
        notes = storedNotes ? JSON.parse(storedNotes) : [];
    };

    /**
     * Saves the current notes array to localStorage.
     */
    const saveNotes = () => {
        localStorage.setItem('notesApp', JSON.stringify(notes));
    };

    /**
     * Renders all notes from the 'notes' array into the UI.
     * Clears existing notes and rebuilds the list.
     */
    const renderNotes = () => {
        notesList.innerHTML = ''; // Clear existing notes

        if (notes.length === 0) {
            // Display a message if no notes are present
            notesList.innerHTML = '<li class="list-group-item text-muted">No notes yet. Add one above!</li>';
            return;
        }

        notes.forEach(note => {
            // Create list item for the note
            const li = document.createElement('li');
            // Apply Bootstrap classes for styling: list item, flexbox for alignment, shadow, rounded corners
            li.className = 'list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm rounded';
            li.setAttribute('data-id', note.id);

            // Create a span for the note text
            const noteTextSpan = document.createElement('span');
            noteTextSpan.textContent = note.text;
            noteTextSpan.classList.add('flex-grow-1', 'me-3'); // Allow text to grow and add right margin

            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-sm'; // Bootstrap button classes
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteNote(note.id));

            // Append text and button to list item
            li.appendChild(noteTextSpan);
            li.appendChild(deleteBtn);

            // Append list item to the notes list
            notesList.appendChild(li);
        });
    };

    /**
     * Adds a new note to the array, saves it, and updates the UI.
     * Triggered by the 'Add Note' button.
     */
    const addNote = () => {
        const noteText = noteInput.value.trim();

        if (noteText) {
            const newNote = {
                id: Date.now(), // Generate a unique ID using the current timestamp
                text: noteText
            };
            notes.push(newNote);
            saveNotes(); // Save to localStorage
            renderNotes(); // Update UI
            noteInput.value = ''; // Clear the input field
        } else {
            alert('Note cannot be empty!'); // Basic validation feedback
        }
    };

    /**
     * Deletes a note by its ID from the array, saves changes, and updates the UI.
     * Triggered by individual 'Delete' buttons.
     * @param {number} id - The unique ID of the note to delete.
     */
    const deleteNote = (id) => {
        // Filter out the note with the matching ID
        notes = notes.filter(note => note.id !== id);
        saveNotes(); // Save to localStorage
        renderNotes(); // Update UI
    };

    /**
     * Clears all notes from the array, localStorage, and updates the UI.
     * Triggered by the 'Clear All Notes' button.
     */
    const clearAllNotes = () => {
        // Ask for user confirmation before clearing all notes
        if (confirm('Are you sure you want to clear all notes? This action cannot be undone.')) {
            notes = []; // Empty the notes array
            saveNotes(); // Save empty array to localStorage
            renderNotes(); // Update UI to show empty list
        }
    };

    // Event Listeners
    addNoteBtn.addEventListener('click', addNote);
    clearAllBtn.addEventListener('click', clearAllNotes);

    // Initial load and render of notes when the page loads
    loadNotes();
    renderNotes();
});