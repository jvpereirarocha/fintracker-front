<script setup>
  import { ref, watch } from 'vue';
  const username = ref('');
  const password = ref('');
  const passwordTypeField = ref('password');
  const passwordLabel = ref('Mostrar');
  const passwordIsHidden = ref(true);
  import postToBackend from '@/services/loginUser';

  const changePasswordType = () => {
    passwordIsHidden.value = !passwordIsHidden.value;
  }

  watch(passwordIsHidden, (newValue) => {
    if (newValue === false) {
      passwordTypeField.value = 'text'
      passwordLabel.value = 'Ocultar'
    } else {
      passwordTypeField.value = 'password'
      passwordLabel.value = 'Mostrar'
    }
    return passwordIsHidden
  })

  async function posting() {
    const data = {
      username: username.value,
      password: password.value
    } 
    const response = await postToBackend("login", data, {})
    alert(`Response is: ${response}`)
  }

</script>

<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="posting" method="post">
      <div class="input-container">
        <label for="username">Usuário:</label>
        <input type="text" id="username" name="username" placeholder="Digite seu usuário" v-model="username" required>
      </div>

      <div class="input-container">
        <label for="password">Senha:</label>
        <input :type="passwordTypeField" id="password" name="password" placeholder="Digite sua senha" v-model="password" required>
        <a href="" @click.prevent="changePasswordType">{{ passwordLabel }} senha</a>
      </div>

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