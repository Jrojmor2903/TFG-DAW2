<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Admin Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="d-flex">
    @include('dashboard._sidebar')

    <main class="flex-fill p-4">
        @yield('content')
    </main>
</div>

</body>
</html>
