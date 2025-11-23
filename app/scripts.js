// Données utilisateurs stockées en mémoire
let users = {};
let currentUser = null;

// Afficher le formulaire de connexion
function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('loginMessage').innerHTML = '';
}

// Afficher le formulaire d'inscription
function showSignup() {
    document.getElementById('signupForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupMessage').innerHTML = '';
}

// Afficher un message
function showMessage(elementId, message, type) {
    const messageDiv = document.getElementById(elementId);
    messageDiv.innerHTML = `<div class="message ${type}">${message}</div>`;
    setTimeout(() => {
        messageDiv.innerHTML = '';
    }, 3000);
}

// Gérer l'inscription
function handleSignup(e) {
    e.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;

    // Vérifier si l'email existe déjà
    if (users[email]) {
        showMessage('signupMessage', 'Cet email est déjà utilisé', 'error');
        return;
    }

    // Vérifier si les mots de passe correspondent
    if (password !== passwordConfirm) {
        showMessage('signupMessage', 'Les mots de passe ne correspondent pas', 'error');
        return;
    }

    // Créer le nouvel utilisateur
    users[email] = {
        name: name,
        email: email,
        password: password
    };

    showMessage('signupMessage', 'Compte créé avec succès !', 'success');

    // Réinitialiser le formulaire et rediriger vers la connexion
    setTimeout(() => {
        document.getElementById('signupName').value = '';
        document.getElementById('signupEmail').value = '';
        document.getElementById('signupPassword').value = '';
        document.getElementById('signupPasswordConfirm').value = '';
        showLogin();
    }, 1500);
}

// Gérer la connexion
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Vérifier si l'utilisateur existe
    if (!users[email]) {
        showMessage('loginMessage', 'Email ou mot de passe incorrect', 'error');
        return;
    }

    // Vérifier le mot de passe
    if (users[email].password !== password) {
        showMessage('loginMessage', 'Email ou mot de passe incorrect', 'error');
        return;
    }

    // Connexion réussie
    currentUser = users[email];
    showDashboard();
}

// Afficher le dashboard
function showDashboard() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('welcomePage').classList.remove('hidden');

    document.getElementsByClassName('container')[0].style.display = 'none';

    document.getElementById('welcomeUserName').textContent = currentUser.name;
    document.getElementById('userNameDisplay').textContent = currentUser.name;
    document.getElementById('userEmailDisplay').textContent = currentUser.email;
}

// Gérer la déconnexion
function handleLogout() {
    currentUser = null;
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('welcomePage').classList.add('hidden');
    document.getElementsByClassName('container')[0].style.display = 'block';
    showLogin();
}