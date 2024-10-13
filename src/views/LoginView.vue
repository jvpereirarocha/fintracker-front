<script setup>
  import { ref, watch } from 'vue';
  const email = ref('');
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
    const { payload, statusCode } = await postToBackend("login", data)
    if (statusCode != 201) {
        alert(`Não foi possível realizar o login: ${payload.detail}`)
        return
    }
  }

</script>

<template>
  <div class="form-container">
    <h2>Login de usuário</h2>
    <form @submit.prevent="posting" method="post">
      <div class="input-container">
        <label for="email">Usuário:</label>
        <input type="email" id="email" v-model="email" name="email" placeholder="Digite seu usuário" required>
      </div>

      <div class="input-container">
        <label for="password">Senha:</label>
        <input :type="passwordTypeField" id="password" v-model="password" name="password" placeholder="Digite sua senha" required>
        <a href="" @click.prevent="changePasswordType">{{ passwordLabel }} senha</a>
      </div>

      <div class="input-container">
        <button class="button-submit" type="submit">Entrar</button>
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