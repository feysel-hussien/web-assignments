window.onload = fetchAllUsersWithNotes;
const token = localStorage.getItem('jwt');

async function fetchAllUsersWithNotes(){

    if (!token){
        console.log('No token found');
        //get the user to login

    }
    const response = await fetch('http://localhost:5001/admin/allwithnotes',{
        method: 'GET',
        headers:{
        'Authorization': `Bearer ${token}`,
        'Conetnt-Type': 'application/json'
        }
});
    if (response.ok){
        alert('Success');
        const data = await response.json();
        const mainContainer = document.querySelector('.main.container');
        if (!mainContainer){
        console.log('No main container found')
        return;}


        for (const userId in data) {
            const userResponse = await fetch(`http://localhost:5001/users/profile/${userId}`,{
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!userResponse.ok){
                console.log('Error: ', userResponse.status, userResponse.statusText);
                return;
            }
            const user = await userResponse.json();


            const notes = data[userId];
            const userContainer = document.createElement('div');
            userContainer.className = 'user container border border-primary rounded p-4 my-4';
            userContainer.style.width = '80%';
            userContainer.style.backgroundColor = '#e6e6e6';

            const userName = document.createElement('h2');
            userName.className = 'mt-4';
            userName.textContent =`User: ${user.name}`;
            userContainer.appendChild(userName);

            const deleteUserButton = document.createElement('button');
            deleteUserButton.type = 'submit';
            deleteUserButton.className = 'btn btn-primary delete-user-button';
            deleteUserButton.textContent = 'Delete User';
            deleteUserButton.dataset.userId=userId;
            deleteUserButton.addEventListener('click', deleteUser);
            userContainer.appendChild(deleteUserButton);

            const notesTitle = document.createElement('h4');
            notesTitle.className = 'mt-4';
            notesTitle.textContent = 'Notes';
            userContainer.appendChild(notesTitle);

            const userNotes = document.createElement('div');
            userNotes.className = 'usernotes row';
            notes.forEach((note: any) => {
                const noteCard = document.createElement('div');
                noteCard.className = 'card mx-2 my-4';
                noteCard.style.width = '18rem';

                const noteCardBody = document.createElement('div');
                noteCardBody.className = 'card-body';

                const noteTitle = document.createElement('h5');
                noteTitle.className = 'card-title';
                noteTitle.textContent = note.title;
                noteCardBody.appendChild(noteTitle);

                const noteContent = document.createElement('p');
                noteContent.className = 'card-text';
                noteContent.textContent = note.content;
                noteCardBody.appendChild(noteContent);

                const deleteNoteButton = document.createElement('button');
                deleteNoteButton.type = 'submit';
                deleteNoteButton.className = 'btn btn-primary mr-2 delete-note-button';
                deleteNoteButton.textContent = 'Delete Note';
                deleteNoteButton.dataset.noteId=note.id;
                noteCardBody.appendChild(deleteNoteButton);

                noteCard.appendChild(noteCardBody);
                userNotes.appendChild(noteCard);
                userContainer.appendChild(userNotes);
            });
            mainContainer.appendChild(userContainer);
        }
    }
    else{
        alert('Failed')
        console.log('Error: ', response.status, response.statusText);
    }
}


async function deleteUser(event: Event) {
    event.preventDefault();
    const deleteUserButton = event.target as HTMLButtonElement;
    const userId = deleteUserButton.dataset.userId;
        await fetch(`http://localhost:5001/admin/user/${userId}`,{
            method:'DELETE',
            headers:{
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'

            }
        });
}




// if (deleteNote) {
//     deleteNoteButton.addEventListener('click', async (event) => {
//         event.preventDefault();
//         const deleteNoteButton = event.target as HTMLButtonElement;
//         const noteId = deleteNoteButton.dataset.noteId;

//         // Delete the note with this ID
//     });
// }