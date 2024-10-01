# Etapa 1: Construcción
FROM node:18 AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa 2: Servidor
FROM nginx:stable-alpine AS production-stage

# Copiamos los archivos construidos desde la etapa anterior a la carpeta pública de Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copiamos la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80 para servir la aplicación
EXPOSE 80

# Arrancamos Nginx cuando se ejecuta el contenedor
CMD ["nginx", "-g", "daemon off;"]
