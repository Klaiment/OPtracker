#!/bin/bash

# Demande des informations à l'utilisateur
read -p "Entrez l'URL de votre site (ex: http://localhost) : " WEBSITE_URL
read -p "Entrez le type de serveur (dev/prod) : " ENVIRONMENT
read -p "Entrez l'utilisateur de la base de données : " DB_USER
read -p "Entrez le mot de passe de la base de données : " DB_PASSWORD
echo
read -p "Entrez le nom de la base de données : " DB_NAME

# Création du fichier .env
cat <<EOL > .env
BUN_ENV=development
HOST=0.0.0.0
PORT=1337
APP_KEYS=uYFeBM3KC3NNFR8jB6G17g==,qWrP+nmUfwks2mS4bCAe7w==,KNScYpF3eHGffATPaIUc4g==,qG4R5HrfQ6+GddSyeYXzbg==
API_TOKEN_SALT=xPP38uEGYlb9Wpq9qGhMGQ==
ADMIN_JWT_SECRET=WrFr4TrZhq4yL8S8L+KYJw==
TRANSFER_TOKEN_SALT=rR0hjHxqrNlLMtf/h7sGFg==
DATABASE_CLIENT=postgres
DATABASE_HOST=OPTracker_database
DATABASE_PORT=5432
DATABASE_NAME=${DB_NAME}
DATABASE_USERNAME=${DB_USER}
DATABASE_PASSWORD=${DB_PASSWORD}
POSTGRES_USER:${DB_USER}
POSTGRES_PASSWORD:${DB_PASSWORD}
POSTGRES_DB:${DB_NAME}
PGTZ:Europe/Paris
DATABASE_SSL=false
JWT_SECRET=iEDM7A1fte3G3cNZPgl3QQ==
EOL

echo "Fichier .env créé dans le dossier OPTracker_API."

# Création du fichier config.ts
cat <<EOL > config.test.ts
export const config = {
  WEBSITE_URL: '${WEBSITE_URL}',
  PORT: '3000',
  ENVIRONNEMENT: '${ENVIRONMENT}', // dev, prod
  HYBRID_TRACKER: 'private', // public, private
  DATABASE_USER: '${DB_USER}',
  DATABASE_PASSWORD: '${DB_PASSWORD}',
  DATABASE_HOST: 'localhost',
  DATABASE_PORT: '5432',
  DATABASE_NAME: '${DB_NAME}',
};
EOL

echo "Fichier config.ts créé à la racine du projet."

# Exécution des commandes dans le dossier OPTracker_API
cd OPTracker_API || { echo "Dossier OPTracker_API introuvable. Vérifiez l'arborescence du projet."; exit 1; }

echo "Installation des dépendances..."
npm install

if [ $? -ne 0 ]; then
  echo "Erreur lors de l'installation des dépendances."
  exit 1
fi

echo "Import des données..."
npm run strapi import -- -f OPTracker_API/export_20241116182135.tar.gz

if [ $? -ne 0 ]; then
  echo "Erreur lors de l'import des données."
  exit 1
fi

echo "Configuration terminée avec succès !"
