document.getElementById('registerbtn')?.addEventListener('click', async function(event) {
    event.preventDefault();
  
    const name = (document.getElementById('username') as HTMLInputElement)?.value;
    const password = (document.getElementById('password') as HTMLInputElement)?.value;
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const best_friend = (document.getElementById('friend') as HTMLInputElement)?.value;

    const response =  await fetch('http://localhost:5001/users/register/',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'},
        body:JSON.stringify({name,email, password, best_friend})
    });

    if (response.ok) {
        const data = await response.json();
        window.location.href = './index.html';
    } else {
        alert('error');
        console.log('error', response.statusText);
    }
});