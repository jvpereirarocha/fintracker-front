<script setup>
  import { ref, watch } from 'vue';
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  
  const passwordTypeField = ref('password');
  const confirmPasswordTypeField = ref('password');
  const passwordLabel = ref('Mostrar');
  const confirmPasswordLabel = ref('Mostrar');
  const passwordIsHidden = ref(true);
  const confirmPasswordIsHidden = ref(true);
  
  import { useAuthStore } from '@/stores/auth'
  import { useRouter } from 'vue-router';

  const router = useRouter()
  const authStore = useAuthStore()

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
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    }
    const { payload, statusCode } = await authStore.register(data.username, data.email, data.password, data.confirmPassword)
    if (statusCode !== 201) {
      alert(`Erro ao cadastrar usuário: ${payload.hasOwnProperty('detail') ? payload.detail : 'tente novamente'}`)
      return
    }
    alert('Usuario cadastrado! Você será redirecionado para a página de login!')
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  }

</script>

<template>
  <div class="form-container">
    <h2>Registro de Usuário</h2>
    <!-- Mensagem de erro -->
    <div id="error-message" class="error"></div>

    <form method="POST" @submit.prevent="posting">
      <div class="input-container">
        <label for="username">Nome de usuário</label>
        <input type="text" id="username" v-model="username" name="username" required />
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
      <div class="links">
        <span>Já possui uma conta? <RouterLink to="/login">Fazer login</RouterLink></span>
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