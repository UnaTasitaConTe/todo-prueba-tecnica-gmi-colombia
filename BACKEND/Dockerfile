FROM php:8.2.20-fpm-alpine

# Instalar las extensiones de PHP y dependencias
RUN docker-php-ext-install pdo pdo_mysql
COPY --from=composer /usr/bin/composer /usr/bin/composer
# RUN apk add --no-cache nodejs npm supervisor

# Crear el directorio de trabajo
WORKDIR /app/

# Copiar los archivos de Composer y la aplicación
COPY composer.* ./
COPY . .
RUN composer install --no-interaction --no-dev --prefer-dist --optimize-autoloader
# Cambiar propietario del directorio de la aplicación a www-data
RUN chown -R www-data:www-data /app/storage
RUN chmod 777 -R /app/storage

RUN php artisan storage:link

# Crear directorios para supervisord
# RUN mkdir -p /var/log/supervisor

# Copiar el archivo de configuración de supervisord
# COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 8000

# Ejecutar supervisord
# CMD ["/usr/bin/supervisord"]
CMD [ "php","artisan","serve","--host","0.0.0.0"]
# CMD [ "php artisan server --host 0.0.0.0" ]
