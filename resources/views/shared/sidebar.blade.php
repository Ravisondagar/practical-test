<aside class="main-sidebar sidebar-dark-primary elevation-4">
  <!-- Brand Logo -->
  <a href="{{ route('dashboard') }}" class="brand-link">
    <img src="{!! asset('dist/img/AdminLTELogo.png') !!}" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
    <span class="brand-text font-weight-light">AdminLTE 3</span>
  </a>

  <!-- Sidebar -->
  <div class="sidebar">
    <!-- Sidebar user panel (optional) -->
    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
      <div class="image">
        @if (Auth::user()->profile_photo_path)
          <img src="{!! asset('storage/'.Auth::user()->profile_photo_path) !!}" class="img-circle elevation-2" alt="{{ Auth::user()->name }}">
        @else
          <img src="{!! Auth::user()->profile_photo_url !!}" class="img-circle elevation-2" alt="{{ Auth::user()->name }}">
        @endif
      </div>
      <div class="info">
        <a href="{{ route('profile.show') }}" class="d-block">{!! Auth::user()->name !!}</a>
      </div>
    </div>

    <!-- Sidebar Menu -->
    <nav class="mt-2">
      <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        @if(Auth::user()->role == 'admin')
        <li class="nav-item">
          <a href="{!! route('users.index') !!}" class="nav-link">
            <i class="far fa-user nav-icon"></i>
            <p>Users</p>
          </a>
        </li>
        @endif
        <form method="POST" action="{{ route('logout') }}">
            @csrf

            <x-jet-responsive-nav-link href="{{ route('logout') }}"
                           onclick="event.preventDefault();
                            this.closest('form').submit();">
                {{ __('Log Out') }}
            </x-jet-responsive-nav-link>
        </form>
      </ul>
    </nav>
    <!-- /.sidebar-menu -->
  </div>
  <!-- /.sidebar -->
</aside>