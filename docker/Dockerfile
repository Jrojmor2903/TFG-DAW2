FROM php:8.2-apache

# Instalar herramientas y extensiones necesarias
RUN apt-get update && apt-get install -y unzip git libzip-dev zip \
    && docker-php-ext-install pdo pdo_mysql zip \
    && docker-php-ext-enable pdo_mysql

# Habilitar mod_rewrite de Apache
RUN a2enmod rewrite

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establecer directorio de trabajo
WORKDIR /var/www/html

# Copiar archivos necesarios (en caso de que quieras copiar código directamente)
# COPY ./backend /var/www/html

# Cambiar permisos para el directorio storage y bootstrap/cache (importante en Laravel)
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Exponer puerto 80
EXPOSE 80
