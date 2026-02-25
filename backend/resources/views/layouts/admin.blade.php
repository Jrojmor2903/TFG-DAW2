<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Admin Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="icon" type="image/webp" href="{{ asset('spaceinvaders.webp') }}">
</head>

<body class="bg-light">

    <div class="d-flex">
        @include('layouts._sidebar')

        <main class="flex-fill p-4">
            @yield('content')
        </main>
    </div>

</body>

<script>
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img.avatar').forEach(img => {
        img.onerror = () => {
            img.src = 'https://i.pinimg.com/736x/d9/d8/8e/d9d88e3d1f74e2b8ced3df051cecb81d.jpg';
        };
    });
});
</script>

</html>