# Usa una imagen ligera de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Compila el código TypeScript a JavaScript en la carpeta dist
RUN npm run build

# Expone el puerto de la aplicación
EXPOSE 4000

# Comando para iniciar la aplicación (en producción se recomienda usar npm start)
CMD ["npm", "start"]
