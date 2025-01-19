# Dockerfile
FROM php:8.2-fpm-alpine

#Set working directory
WORKDIR /var/www

#install dependencies
RUN apk add --no-cache \
    bash \
    mysql-client \
    openssh \
    git \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    oniguruma-dev \
    libxml2-dev \
    zip \
    unzip 

# clear cache
RUN docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

#install composer
COPY --from=composer:2.0 /usr/bin/composer /usr/bin/composer

#copy the application code
COPY . .

#Set permissions
RUN chown -R www-data:www-data /var/www

#Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]