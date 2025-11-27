const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// ---- CREDENTIALS EN DUR ----
const VALID_ID = "root";
const VALID_PASSWORD = "password";

// ---- Middleware de "session" simplifié ----
const session = {};
app.use((req, res, next) => {
    req.isLogged = session[req.ip] || false;
    next();
});

// ---- CONNEXION À POSTGRESQL ----
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

client.connect()
    .then(() => console.log("Connecté à PostgreSQL"))
    .catch(err => console.error("Erreur connexion:", err));

// ---- PAGE DE LOGIN ----
app.get("/login", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <title>Login</title>
        <style>
            body { display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif; background: linear-gradient(to right, #74ebd5, #ACB6E5); margin:0; }
            .login-container { background:white; padding:40px; border-radius:12px; box-shadow:0 8px 20px rgba(0,0,0,0.2); width:350px; text-align:center; }
            h2 { margin-bottom:20px; color:#333; }
            input { width:100%; padding:10px; margin:10px 0; border:1px solid #ccc; border-radius:6px; font-size:16px; }
            button { width:100%; padding:10px; margin-top:15px; background-color:#6C63FF; color:white; border:none; border-radius:6px; font-size:16px; cursor:pointer; transition:background 0.3s; }
            button:hover { background-color:#5751d1; }
            .error { color:red; margin-top:10px; }
        </style>
    </head>
    <body>
        <div class="login-container">
            <h2>Connexion</h2>
            <form method="POST" action="/login">
                <input name="id" placeholder="Identifiant" required />
                <input name="password" type="password" placeholder="Mot de passe" required />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    </body>
    </html>
    `);
});

// ---- TRAITEMENT LOGIN ----
app.post("/login", (req, res) => {
    const { id, password } = req.body;

    if (id === VALID_ID && password === VALID_PASSWORD) {
        session[req.ip] = true;
        return res.redirect("/dashboard");
    }

    res.send(`<p class="error">❌ Identifiants incorrects.</p><a href='/login'>Réessayer</a>`);
});

// ---- DASHBOARD ----
app.get("/dashboard", async (req, res) => {
    if (!session[req.ip]) return res.redirect("/login");

    // Table par défaut
    const tableName = req.query.table || "employee";
    const searchTerm = req.query.search || "";

    try {
        const query = `SELECT * FROM ${tableName}`;
        const result = await client.query(query);
        let rows = result.rows;

        // Filtrage en JS pour rechercher dans toutes les colonnes
        if (searchTerm) {
            rows = rows.filter(row => 
                Object.values(row).some(val =>
                    val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        let tableRows = rows.map(row => {
            return `<tr>${Object.values(row).map(val => `<td>${val}</td>`).join('')}</tr>`;
        }).join('');

        res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <title>Dashboard Annuaire</title>
            <style>
                body { font-family: Arial, sans-serif; background:#f4f4f9; margin:0; padding:0; }
                header { background:#6C63FF; color:white; padding:20px; text-align:center; font-size:24px; font-weight:bold; }
                .container { padding:20px; max-width:1200px; margin:auto; }
                .buttons { margin-bottom:15px; }
                .buttons a {
                    display:inline-block; margin-right:10px; text-decoration:none; padding:10px 20px; border-radius:6px; background:#6C63FF; color:white; transition:background 0.3s;
                }
                .buttons a:hover { background:#5751d1; }
                .search-container { margin-bottom:15px; }
                .search-container input { width:300px; padding:8px; border-radius:6px; border:1px solid #ccc; font-size:16px; }
                .search-container button { padding:8px 15px; border-radius:6px; border:none; background:#6C63FF; color:white; cursor:pointer; transition:0.3s; }
                .search-container button:hover { background:#5751d1; }
                table { border-collapse: collapse; width:100%; background:white; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1); }
                th, td { padding:12px 15px; border-bottom:1px solid #ddd; text-align:left; }
                th { background-color:#6C63FF; color:white; }
                tr:hover { background-color:#f1f1f1; }
                a.logout { display:inline-block; margin-top:20px; text-decoration:none; padding:10px 20px; background-color:#ff5c5c; color:white; border-radius:6px; transition:0.3s; }
                a.logout:hover { background-color:#e04848; }
            </style>
        </head>
        <body>
            <header>Dashboard Annuaire</header>
            <div class="container">
                <div class="buttons">
                    <a href="/dashboard?table=employee">Employee</a>
                    <a href="/dashboard?table=department">Department</a>
                    <a href="/dashboard?table=project">Project</a>
                </div>
                <div class="search-container">
                    <form method="GET" action="/dashboard">
                        <input type="hidden" name="table" value="${tableName}" />
                        <input type="text" name="search" placeholder="Rechercher..." value="${searchTerm}" />
                        <button type="submit">🔍</button>
                    </form>
                </div>
                <table>
                    <thead>
                        <tr>${Object.keys(rows[0] || {}).map(col => `<th>${col}</th>`).join('')}</tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
                <a class="logout" href="/logout">Se déconnecter</a>
            </div>
        </body>
        </html>
        `);
    } catch (err) {
        console.error(err);
        res.send("Erreur lors de la récupération des données de la base.");
    }
});

// ---- LOGOUT ----
app.get("/logout", (req, res) => {
    session[req.ip] = false;
    res.redirect("/login");
});

// ---- PAGE RACINE ----
app.get("/", (req, res) => {
    res.redirect("/login");
});

// ---- LANCEMENT DU SERVEUR ----
app.listen(port, () => console.log(`Serveur NodeJS démarré sur ${port}`));

