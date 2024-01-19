document.getElementById('loginButton')?.addEventListener('click', async function(event) {
    event.preventDefault();
  
    const email = (document.getElementById('useremail') as HTMLInputElement)?.value;
    const password = (document.getElementById('userpassword') as HTMLInputElement)?.value;

        const response =  await fetch('http://localhost:5001/users/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        });

        if (response.ok) {
            const data = await response.json();
            const {user,access_token}=data;
            localStorage.setItem('jwt',access_token);
            localStorage.setItem('user',JSON.stringify(user));
            if (user.role === 'admin'){
                window.location.href = 'admin/adminindex.html';
            } else {
                window.location.href = 'user/userindex.html';
            }

        } else {
            console.log('error', response.status, response.statusText);
        }

});
