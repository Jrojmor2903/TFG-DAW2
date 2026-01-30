<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login | Admin DB</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-dark d-flex align-items-center justify-content-center" style="min-height:100vh;">

<div class="card shadow-lg" style="width: 380px;">
    <div class="card-header bg-dark text-white text-center">
        <h5 class="mb-0">🛠 Admin DB</h5>
        <small>Panel de Administración</small>
    </div>

    <div class="card-body">

        @if ($errors->any())
            <div class="alert alert-danger py-2">
                {{ $errors->first() }}
            </div>
        @endif

        <form method="POST" action="{{ route('login') }}">
            @csrf

            <div class="mb-3">
                <label class="form-label">Email</label>
                <input
                    type="email"
                    name="email"
                    class="form-control"
                    value="{{ old('email') }}"
                    required
                    autofocus
                >
            </div>

            <div class="mb-3">
                <label class="form-label">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    class="form-control"
                    required
                >
            </div>

            <button class="btn btn-dark w-100">
                🔐 Iniciar sesión
            </button>
        </form>

    </div>

    <div class="card-footer text-center text-muted small">
        Laravel Admin Panel
    </div>
</div>

</body>
</html>