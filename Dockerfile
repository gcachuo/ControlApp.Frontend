FROM php:8.3-apache

RUN a2enmod rewrite

# XDebug
RUN yes | pecl install xdebug \
        && echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/xdebug.ini \
      && echo "xdebug.remote_autostart=off" >> /usr/local/etc/php/conf.d/xdebug.ini \
      && echo "xdebug.client_host = host.docker.internal" >> /usr/local/etc/php/conf.d/xdebug.ini \
      && docker-php-ext-enable xdebug

RUN service apache2 restart
