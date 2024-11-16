<script setup>
  import { ref, watch } from 'vue';
  const username = ref('');
  const password = ref('');
  const passwordTypeField = ref('password');
  const passwordLabel = ref('Mostrar');
  const passwordIsHidden = ref(true);
  import { useAuthStore } from '@/stores/auth'
  import { useRouter } from 'vue-router';

  const router = useRouter()
  
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
    const authStore = useAuthStore()
    const data = {
      username: username.value,
      password: password.value
    }
    const { payload, statusCode } = await authStore.login(data.username, data.password)
    if (statusCode !== 200) {
      alert(`Erro ao fazer login: ${payload.hasOwnProperty('detail') ? payload.detail : 'tente novamente'}`)
      return
    }
    alert('Usuario logado! Você será redirecionado para a página inicial!')
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }

</script>

<template>
  <div class="form-container">
    <h2>Login de usuário</h2>
    <form @submit.prevent="posting" method="post">
      <div class="input-container">
        <label for="username">Usuário:</label>
        <input type="text" id="username" v-model="username" name="username" placeholder="Digite seu usuário" required>
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