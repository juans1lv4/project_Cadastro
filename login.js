document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    
    const validUsername = 'admin';
    const validPassword = 'admin';

    if (username === validUsername && password === validPassword) {
        message.textContent = 'Login bem-sucedido!';
        message.style.color = 'green';

        
        localStorage.setItem('loggedIn', 'true');

        
        setTimeout(() => {
            window.location.href = 'index2.html';
        }, 1000);
    } else {
        message.textContent = 'Usuário ou senha inválidos!';
        message.style.color = 'red';
    }
});


function togglePassword() {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('togglePassword');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.classList.remove('bi-eye');
        eyeIcon.classList.add('bi-eye-slash');
    } else {
        passwordField.type = 'password';
        eyeIcon.classList.remove('bi-eye-slash');
        eyeIcon.classList.add('bi-eye');
    }
}