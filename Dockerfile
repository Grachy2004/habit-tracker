FROM node:18

WORKDIR /app

# Copiamos los archivos de backend
COPY backend/package*.json ./
RUN npm install

COPY backend/ .

EXPOSE 8080
CMD ["node", "index.js"]
