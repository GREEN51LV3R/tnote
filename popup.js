document.addEventListener('DOMContentLoaded', () => {
    const noteTextarea = document.getElementById('note-textarea');
    const copyButton = document.getElementById('copy-button');
    const saveButton = document.getElementById('save-button');
    const clearButton = document.getElementById('clear-button');

    if (noteTextarea && copyButton && saveButton && clearButton) {
        copyButton.addEventListener('click', copyNote);
        saveButton.addEventListener('click', saveNote);
        clearButton.addEventListener('click', clearNote);
    }

    function copyNote() {
        noteTextarea.select();
        document.execCommand('copy');
    }


    function saveNote() {
        const noteText = noteTextarea.value;
        chrome.storage.sync.set({ notepadNote: noteText }, () => {
            alert('Note saved!');
        });
    }



    function clearNote() {
        chrome.storage.sync.remove('notepadNote', () => {
            noteTextarea.value = '';
            alert('Note cleared!');
        });
    }

    chrome.storage.sync.get(['notepadNote'], (result) => {
        const savedNote = result.notepadNote;
        if (savedNote) {
            noteTextarea.value = savedNote;
        }
    });
});