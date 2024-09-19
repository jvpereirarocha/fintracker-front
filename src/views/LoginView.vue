<template>
  <div class="login-container">
    <h1>Login</h1>
    <form action="#" method="post">
      <label for="username">Usuário:</label>
      <input type="text" id="username" name="username" placeholder="Digite seu usuário" required>

      <label for="password">Senha:</label>
      <input type="password" id="password" name="password" placeholder="Digite sua senha" required>

      <div class="button-container">
        <button type="submit">Entrar</button>
      </div>

      <div class="links">
        <RouterLink to="/forgot-password">Esqueceu a senha?</RouterLink>
        <RouterLink to="/register">Registrar-se</RouterLink>
      </div>
    </form>
  </div>
</template>
<style scoped>
  body {
    font-family: Arial, sans-serif;
    background: linear-gradient(to right, #2c003e, #a23982);
    margin: 0;
    padding: 0;
  }
  .login-container {
    width: 30%;
    margin: 50px auto;
    background-color: white;
    padding: 50px;
    border-radius: 10px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
</style>