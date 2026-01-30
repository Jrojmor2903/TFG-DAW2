#!/bin/sh
set -e

echo "🚀 Arrancando Laravel..."

# Esperar a MySQL
while ! php -r "new PDO('mysql:host=' . getenv('DB_HOST') . ';dbname=' . getenv('DB_DATABASE'), getenv('DB_USERNAME'), getenv('DB_PASSWORD'));" >/dev/null 2>&1; do
  sleep 2
done

echo "✅ MySQL listo"

# Permisos
chown -R www-data:www-data storage bootstrap/cache

# Crear tabla de cache si usamos CACHE_STORE=database
if [ "$(php -r "echo getenv('CACHE_STORE');")" = "database" ]; then
  php artisan cache:table || true
fi

echo "⚠️ Ejecutando migrate"
php artisan migrate --seed --force || exit 1
echo "✅ migrate terminado"

# Limpiar cache
php artisan optimize:clear

echo "✅ Laravel listo"

exec "$@"
