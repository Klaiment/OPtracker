import {config} from "./config.ts";

Bun.serve({
    fetch(req: Request) {
        const url = new URL(req.url);  // Récupère l'URL de la requête

        // Route pour la page d'accueil
        if (url.pathname === "/" || url.pathname === "/home") {
            return new Response("Welcome to the Home page!", {
                headers: { 'Content-Type': 'text/plain' },
            });
        }

        // Route pour /torrent
        if (url.pathname.startsWith("/torrent/")) {
            const id = url.pathname.split("/")[2];
            return new Response(
                `This is the Torrent page with ID: ${id}`, {
                headers: { 'Content-Type': 'text/plain' },
            });
        }

        // Route pour /about

        if (url.pathname === "/about") {
            return new Response("This is the About page.", {
                headers: { 'Content-Type': 'text/plain' },
            });
        }

        // Route par défaut (404 Not Found)
        return new Response("Page not found", {
            status: 404,
            headers: { 'Content-Type': 'text/plain' },
        });
    },
    port: config.PORT, // Définit le port du serveur
});

console.log(
    `Server running on ${config.WEBSITE_URL}${config.ENVIRONNEMENT === 'dev' ? ':' + config.PORT : ''}`
);