# 📘 Wiki del Proyecto

> Última actualización: 21 de mayo de 2025

---

## Índice

1. [Planificación y Seguimiento](#1-planificación-y-seguimiento)
2. [Bitácora de Incidencias y Soluciones](#2-bitácora-de-incidencias-y-soluciones)

---

## 1. Planificación y Seguimiento

### 📅 Enero 22 – Enero 29

Configuración inicial del proyecto:

- Definición y configuración del árbol de contenedores Docker
- Creación de migraciones y modelos en Laravel
- Añadidos seeders iniciales
- Configuración de `docker-compose.yml` y múltiples `Dockerfile`

---

### 📅 Enero 29 – Febrero 5

Desarrollo del backend:

- Creación de controladores, requests y middleware en Laravel
- Inicio de la API REST
- Inicio del panel de administración

---

### 📅 Febrero 5 – Febrero 27

Consolidación del backend y comienzo del diseño:

- Finalización del panel de administración
- Finalización de la API REST
- Avance en el diseño de alta fidelidad
- Inicio del proyecto React

---

### 📅 Febrero 27 – Marzo 15

Configuración del frontend:

- Configuración del proyecto React
- Configuración de las llamadas a la API con Axios
- Implementación del login
- Implementación del contexto de usuario (`useUser`)

---

### 📅 Marzo 15 – Abril

Maquetación y desarrollo del juego:

- Maquetación general con Tailwind CSS
- Inicio del desarrollo del juego

---

### 📅 Abril – Mayo 21

Funcionalidades avanzadas:

- Sistema de logros (`Logros`, `Progreso`)
- Paginación en la vista de logros
- Componente `CardLogro` con estado bloqueado/desbloqueado
- Slider de pasos animado con interacción manual por clic
- Resolución de incidencias de autenticación y rutas (ver sección 2)

---

## 2. Bitácora de Incidencias y Soluciones

### 🐛 [21/05] `auth()->user()` devuelve `null` en `misLogros`

**Síntoma:** El método `misLogros` del `UserController` devolvía un error al intentar llamar a `->logros()` sobre `null`.

**Causa:** La ruta no estaba protegida por el middleware `auth:sanctum`, o el token JWT/Sanctum no se enviaba correctamente en la cabecera `Authorization`.

**Solución aplicada:** Se cambió la estrategia para no depender de `auth()->user()`. En su lugar, se pasa el `id` del usuario como parámetro en la URL, obteniéndolo desde el contexto de React (`useUser`):

```php
// routes/api.php
Route::get('mis-logros/{id}', [UserController::class, 'misLogros']);

// UserController.php
public function misLogros($id)
{
    $user = User::findOrFail($id);
    $logros = $user->logros()->get();
    return response()->json($logros);
}
```

```js
// Logros.jsx
api.get(`/mis-logros/${user.id}`)
```

---

### 🐛 [21/05] `404 Not Found` en `GET /api/mis-logros/1`

**Síntoma:** La petición llegaba al backend pero devolvía 404.

**Causa probable:** La ruta no estaba registrada en `api.php`, o existía un prefijo de grupo que alteraba la URL final, o había caché de rutas desactualizada.

**Solución:** Verificar con `php artisan route:list | grep logros` y limpiar caché:

```bash
php artisan route:clear
php artisan cache:clear
```

---

### 🐛 [21/05] Slider animado — el clic no activa el paso correcto

**Síntoma:** Al hacer clic en un `<h3>` del slider, el paso no se mostraba o los estilos del modo manual no se aplicaban.

**Causas encontradas:**

1. **Especificidad CSS:** `.slider-steps.manual .step p` tenía la misma especificidad que `.slider-steps.manual .step.activo p`, ganando la primera por orden de aparición.
2. **Timing del DOM:** El script se ejecutaba antes de que el HTML estuviera disponible.

**Solución:**

- Añadir `!important` en todos los valores del bloque `.manual` y `.activo`
- Envolver el JS en `DOMContentLoaded`

```js
document.addEventListener('DOMContentLoaded', function() {
    var slider = document.querySelector('.slider-steps');
    // ...
});
```

---

### 🐛 [21/05] Texto del `<p>` cortado en el slider

**Síntoma:** El texto de los pasos del slider se veía truncado.

**Causa:** `max-height` en `@keyframes texto` y en `.step.activo p` estaba fijado a `120px` / `200px`, insuficiente para textos largos.

**Solución:** Subir el valor a `500px` en ambos sitios:

```css
@keyframes texto {
    10%  { max-height: 500px; opacity: 1; }
    30%  { max-height: 500px; opacity: 1; }
}

.slider-steps.manual .step.activo p {
    max-height: 500px !important;
}
```
