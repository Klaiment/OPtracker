FROM node:20.15.0

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3100
CMD npm run build
CMD npm run dev