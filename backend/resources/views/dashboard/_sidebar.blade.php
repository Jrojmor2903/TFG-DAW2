<aside class="bg-dark text-white p-3" style="width: 260px; min-height: 100vh;">
    <h5 class="mb-4">🛠 Admin DB</h5>

    <ul class="nav flex-column gap-1">
        <li class="nav-item">
            <a class="nav-link text-white" href="{{ route('dashboard') }}">📊 Dashboard</a>
        </li>

        <li class="nav-item text-muted mt-3">GESTIÓN</li>

        <li><a class="nav-link text-white" href="{{ route('users.index') }}">👤 Usuarios</a></li>
        <li><a class="nav-link text-white" href="{{ route('roles.index') }}">🧩 Roles</a></li>
        <li><a class="nav-link text-white" href="{{ route('permisos.index') }}">🔐 Permisos</a></li>

        <li class="nav-item text-muted mt-3">CONTENIDO</li>

        <li><a class="nav-link text-white" href="{{ route('niveles.index') }}">📈 Niveles</a></li>
        <li><a class="nav-link text-white" href="{{ route('ranking.index') }}">🏆 Ranking</a></li>
        <li><a class="nav-link text-white" href="{{ route('enemigos.index') }}">👾 Enemigos</a></li>
        <li><a class="nav-link text-white" href="{{ route('flotas.index') }}">🚀 Flotas</a></li>

        <li class="nav-item text-muted mt-3">SISTEMA</li>

        <li class="mt-4">
            <form action="{{ route('logout') }}" method="POST">
                @csrf
                <button class="btn btn-danger w-100 btn-sm">Cerrar sesión</button>
            </form>
        </li>
    </ul>
</aside>
