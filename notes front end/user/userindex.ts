
const user = JSON.parse(localStorage.getItem('user') as string);
const userId = user._id.toString();
const usertoken = localStorage.getItem('jwt');


// document.addEventListener('DOMContentLoaded', );
document.addEventListener('DOMContentLoaded', async (event) => {
const createNoteButton = document.getElementById('createNotebtn');
const titleElement = document.getElementById('newTitle') as HTMLInputElement;
const descElement = document.getElementById('newDesc') as HTMLInputElement;
const usernotesContainer = document.getElementById('userNote');
fetchAndDisplayNotes(usernotesContainer);

if (createNoteButton) {
    createNoteButton.addEventListener('click', async (event) => {
        console.log('clicked');
        event.preventDefault();
        const title = titleElement.value;
        const content = descElement.value;
        
        const response = await fetch('http://localhost:5001/notes', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${usertoken}`,
                'user-id': userId,
                'Content-Type': 'application/json', //
            },
            body: JSON.stringify({ 
                content: content,
                title: title
            })
        });
        if (response.ok) {
            alert('Note Created Successfully'); 
            console.log('Note Created Successfully');
            titleElement.value = '';
            descElement.value = '';
            //add the note to the DOM
        }
        else {
            alert('Failed to create note');
            console.log('Error: ', response.status, response.statusText);
            console.log('Error: ', response.status, response.statusText);
        }
    });
};
});



async function fetchAndDisplayNotes(usernotesContainer: HTMLElement | null){
    const notesContainer=usernotesContainer as HTMLElement;
    const response = await fetch('http://localhost:5001/notes', {
        method: 'GET',
        headers:{
            'user-id': userId,
            'Authorization': `Bearer ${usertoken}`,
        }
});
    if (response.ok){
        const notes = await response.json();
        for (const note of notes){
            const card = document.createElement('div');
            card.className = 'card mx-2 my-4';
            card.style.width = '18rem';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';


            const title =document.createElement('h5');
            title.className = 'card-title';
            title.innerHTML= note.title;

            const content = document.createElement('p');
            content.className = 'card-text';
            content.innerHTML = note.content;

            const editButton = document.createElement('button');
            editButton.className = 'btn btn-primary';
            editButton.innerHTML = 'Edit';
            editButton.type='submit';
            editButton.dataset.noteId = note._id;
            editButton.addEventListener('click', editNote);

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger';
            deleteButton.innerHTML = 'Delete';
            deleteButton.type='submit';
            deleteButton.dataset.noteId = note._id;
            deleteButton.addEventListener('click', deleteUserNote);



            cardBody.appendChild(title);
            cardBody.appendChild(content);
            cardBody.appendChild(editButton);
            cardBody.appendChild(deleteButton);

            card.appendChild(cardBody);

            if (notesContainer) {
                notesContainer.appendChild(card);
            }
            else{
                console.log('no container');
            }

        }
        
    }
    else{
        alert('Failed to fetch notes');
        console.log('Error: ', response.status, response.statusText);
    }
}



async function editNote(event:Event){
    event.preventDefault();
    const editNoteButton = (event.target as HTMLButtonElement);
    const noteId = editNoteButton.dataset.noteId;

    const noteData = await fetch(`http://localhost:5001/notes/${noteId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usertoken}`,
            'user-id': userId,
        },

    });

    const note = await noteData.json();
    const modal =document.createElement('div');
    modal.className = 'modal';

    const form = document.createElement('form');
    form.innerHTML=`
    <label for="newTitle">Title</label>
    <input type="text" id="newTitle" class="form-control" value="${note.title}">
    <label for="newDesc">Description</label>
    <textarea id="newDesc" class="form-control">${note.content}</textarea>
    <button type="submit" class="btn btn-primary" id="saveEditNotebtn">Save</button>`;

    modal.appendChild(form);
    document.body.appendChild(modal);

    const saveButton= document.getElementById('saveEditNotebtn');
    if (saveButton){
        saveButton.addEventListener('click',async(event)=>{
            event.preventDefault();
            if (noteId) {
                saveEditedNote(noteId,form);
            }
        })
    }
}


async function saveEditedNote (noteId:string, form:HTMLFormElement){
    const titleElement = form.querySelector('#newTitle') as HTMLInputElement;
    const descElement = form.querySelector('#newDesc') as HTMLInputElement;
    if (!titleElement || !descElement){
        alert('Failed to get form data');
        return;
    }
    const title = titleElement.value;
    const content = descElement.value;
    const response = await fetch(`http://localhost:5001/notes/${noteId}`, {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
            'user-id': userId,
            'Authorization': `Bearer ${usertoken}`,
        },
        body: JSON.stringify({ 
            content: content,
            title: title
        })
    });
    if (response.ok){
        alert('Note Edited Successfully');
        console.log('Note Edited Successfully');
        window.location.reload();
    }
    else{
        alert('Failed to edit note');
        console.log('Error: ', response.status, response.statusText);
    }
}





async function deleteUserNote (event:Event){
    event.preventDefault();
    const deleteNoteButton = (event.target as HTMLButtonElement);
    const noteId = deleteNoteButton.dataset.noteId;
    const response = await fetch(`http://localhost:5001/notes/${noteId}`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'user-id': userId,
            'Authorization': `Bearer ${usertoken}`,
        }
    });
    if (response.ok){
        alert('Note Deleted Successfully');
        console.log('Note Deleted Successfully');
        window.location.reload();
    }
    else{
        alert('Failed to delete note');
        console.log('Error: ', response.status, response.statusText);
    }
}

