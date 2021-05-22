@extends('layouts.authentication')
@section('content')
<div class="register-logo">
  <a href="#"><b>Admin</b>LTE</a>
</div>

<div class="card">
  <div class="card-body login-card-body">
    <p class="login-box-msg">You are only one step a way from your new password, recover your password now.</p>
    <x-jet-validation-errors class="mb-4" />

    <form method="POST" action="{{ route('password.update') }}">
      @csrf

      <input type="hidden" name="token" value="{{ $request->route('token') }}">
      <div class="input-group mb-3">
        <input type="email" class="form-control" placeholder="Email" name="email" value="{!! old('email', $request->email) !!}" required autofocus>
        <div class="input-group-append">
          <div class="input-group-text">
            <span class="fas fa-envelope"></span>
          </div>
        </div>
      </div>
      <div class="input-group mb-3">
        <input type="password" class="form-control" placeholder="Password" name="password" required autocomplete="new-password">
        <div class="input-group-append">
          <div class="input-group-text">
            <span class="fas fa-lock"></span>
          </div>
        </div>
      </div>
      <div class="input-group mb-3">
        <input type="password" class="form-control" placeholder="Confirm Password" name="password_confirmation" required autocomplete="new-password">
        <div class="input-group-append">
          <div class="input-group-text">
            <span class="fas fa-lock"></span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <button type="submit" class="btn btn-primary btn-block">Change password</button>
        </div>
        <!-- /.col -->
      </div>
    </form>

    <p class="mt-3 mb-1">
      <a href="{!! route('login') !!}">Login</a>
    </p>
  </div>
</div>
@endsection