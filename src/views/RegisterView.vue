<script setup>
  import { ref, watch } from 'vue';
  const name = ref('');
  const email = ref('');
  const confirmPassword = ref('');
  const passwordTypeField = ref('password');
  const confirmPasswordTypeField = ref('password');
  const passwordLabel = ref('Mostrar');
  const confirmPasswordLabel = ref('Mostrar');
  const passwordIsHidden = ref(true);
  const confirmPasswordIsHidden = ref(true);
  import postToBackend from '@/services/loginUser';

  const changePasswordType = () => {
    passwordIsHidden.value = !passwordIsHidden.value;
  }

  const changeConfirmPasswordType = () => {
    confirmPasswordIsHidden.value = !confirmPasswordIsHidden.value;
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
  
  watch(confirmPasswordIsHidden, (newValue) => {
    if (newValue === false) {
      confirmPasswordTypeField.value = 'text'
      confirmPasswordLabel.value = 'Ocultar'
    } else {
      confirmPasswordTypeField.value = 'password'
      confirmPasswordLabel.value = 'Mostrar'
    }
    return confirmPasswordIsHidden
  })

  async function posting() {
    const data = {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
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
    <h2>Registro de Usuário</h2>
    <!-- Mensagem de erro -->
    <div id="error-message" class="error"></div>

    <form method="POST" @submit.prevent="posting">
      <div class="input-container">
        <label for="name">Nome</label>
        <input type="text" id="name" v-model="name" name="name" required />
      </div>

      <div class="input-container">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" name="email" required />
      </div>

      <div class="input-container">
        <label for="password">Senha:</label>
        <input
          :type="passwordTypeField"
          id="password"
          name="password"
          v-model="password"
          placeholder="Digite sua senha"
          required>
        <a href="" @click.prevent="changePasswordType">{{ passwordLabel }} senha</a>
      </div>

      <div class="input-container">
        <label for="password">Senha:</label>
        <input
          :type="confirmPasswordTypeField"
          id="confirmPassword"
          name="confirmPassword"
          v-model="confirmPassword"
          placeholder="Digite sua confirmação de senha"
          required>
        <a href="" @click.prevent="changeConfirmPasswordType">{{ confirmPasswordLabel }} senha</a>
      </div>

      <div class="input-container">
        <input class="button-submit" type="submit" value="Registrar" />
      </div>
    </form>
  </div>
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