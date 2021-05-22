@extends('layouts.authentication')
@section('content')
<div class="register-logo">
  <a href="#"><b>Admin</b>LTE</a>
</div>

    <div class="card">
        <div class="card-body login-card-body">
            <p class="login-box-msg">Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</p>

            @if (session('status'))
                <div class="mb-4 font-medium text-sm text-green-600">
                    {{ session('status') }}
                </div>
            @endif

            <x-jet-validation-errors class="mb-4" />

            <form method="POST" action="{{ route('password.email') }}">
                @csrf
              <div class="input-group mb-3">
                <input type="email" class="form-control" placeholder="Email" name="email" value="{!! old('email') !!}" required autofocus>
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <button type="submit" class="btn btn-primary btn-block">Request new password</button>
                </div>
                <!-- /.col -->
              </div>
            </form>

            <p class="mt-3 mb-1">
              <a href="{!! route('login') !!}">Login</a>
            </p>
            <p class="mb-0">
              <a href="{!! route('register') !!}" class="text-center">Register a new membership</a>
            </p>
        </div>
    </div>
@endsection
