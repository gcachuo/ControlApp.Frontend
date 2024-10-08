FROM php:8.3-apache

RUN a2enmod rewrite

# Instalar Zip, Unzip y cURL
RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    libzip-dev \
    curl \
    && docker-php-ext-install zip

# XDebug
RUN yes | pecl install xdebug \
        && echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/xdebug.ini \
      && echo "xdebug.remote_autostart=off" >> /usr/local/etc/php/conf.d/xdebug.ini \
      && echo "xdebug.client_host = host.docker.internal" >> /usr/local/etc/php/conf.d/xdebug.ini \
      && docker-php-ext-enable xdebug

#Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
COPY composer.json ./
RUN composer install

RUN service apache2 restart
