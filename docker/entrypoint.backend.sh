#!/bin/sh
set -e

echo "🚀 Arrancando Laravel..."


# Permisos
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache
# Crear tabla de cache si usamos CACHE_STORE=database
if [ "$(php -r "echo getenv('CACHE_STORE');")" = "database" ]; then
  php artisan cache:table || true
fi

echo "Instalando dependencias de laravel"

if [ ! -d "vendor" ]; then
    echo "Carpeta 'vendor' no encontrada, ejecutando composer install..."
    composer install
else
    echo "Carpeta 'vendor' ya existe, continuando con el script..."
fi

echo "⚠️ Ejecutando migrate"
php artisan migrate --force || exit 1
echo "✅ migrate terminado"

echo "⚠️ Ejecutando db:seed"
php artisan tinker --execute="if (!Schema::hasTable('users')) exit(1)"

if [ $? -eq 0 ]; then
  php artisan db:seed --force || exit 1
fi
echo "✅ db:seed terminado"


# Limpiar cache
php artisan optimize:clear

echo "✅ Laravel listo"

exec "$@"
