<template>
  <div class="navbar">
    <div class="logo">
      <a href="#">Calcs</a>
    </div>
    <div class="menu">
      <!-- <a href="#">Página inicial</a> -->
      <RouterLink to="/">Página Inicial</RouterLink>
      <RouterLink to="/dashboard">Dashboards</RouterLink>
      <RouterLink to="/transactions">Transações</RouterLink>
    </div>
    <div class="login">
      <RouterLink to="/login">Login</RouterLink>
    </div>
  </div>
</template>