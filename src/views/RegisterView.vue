<template>
  <body>
    <div class="form-container">
      <h2>Registro de Usuário</h2>
      <!-- Mensagem de erro -->
      <div id="error-message" class="error"></div>

      <form id="registerForm">
        <label for="name">Nome</label>
        <input type="text" id="name" name="name" required />

        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label for="password">Senha</label>
        <input type="password" id="password" name="password" required />

        <label for="confirm-password">Confirmação de Senha</label>
        <input type="password" id="confirm-password" name="confirm-password" required />

        <input type="submit" value="Registrar" />
      </form>
    </div>
  </body>
</template>

<style scoped>
  body {
    font-family: Arial, sans-serif;
    background: linear-gradient(to right, #2c003e, #a23982);
    color: #fff;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>