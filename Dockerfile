# Usa una imagen base de Node.js para construir el frontend
FROM node:20.12.2 as build

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Usa una imagen base de Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copia los archivos construidos al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto en el que corre Nginx
EXPOSE 80

# Define el comando por defecto para correr Nginx
CMD ["nginx", "-g", "daemon off;"]
