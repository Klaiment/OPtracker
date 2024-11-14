FROM node:18-bullseye-slim

# Installer les dépendances nécessaires pour sharp et les autres modules natifs
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    bash \
    git \
    && rm -rf /var/lib/apt/lists/*

# Définir l'environnement Node
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Configurer le répertoire de travail
WORKDIR /opt/

# Copier les fichiers de configuration de npm
COPY package.json package-lock.json ./

# Forcer npm à installer sharp et augmenter le timeout en cas de lenteurs réseau
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g
RUN npm install

# Ajouter le chemin npm aux PATH de l'environnement
ENV PATH=/opt/node_modules/.bin:$PATH

# Copier les fichiers de l'application dans le conteneur
WORKDIR /opt/app
COPY . .

# Changer les permissions des fichiers pour l'utilisateur node
RUN chown -R node:node /opt/app
USER node

# Construire l'application
RUN ["npm", "run", "build"]

# Exposer le port par défaut de Strapi
EXPOSE 1337

# Lancer l'application en mode développement
CMD ["npm", "run", "develop"]
