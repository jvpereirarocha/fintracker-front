<script setup>
  import { useAuthStore } from '@/stores/auth';
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter()
  const authStore = useAuthStore()
  
  function logout() {
    authStore.logout()
    router.push('/login')
  }

  onMounted(async () => {
    return authStore.isLogged
  })
</script>

<template>
  <div class="navbar">
    <div class="logo">
      <a href="#">Calcs</a>
    </div>
    <div v-if="authStore.isLogged" class="menu">
      <RouterLink to="/">Página Inicial</RouterLink>
      <RouterLink to="/dashboard">Dashboards</RouterLink>
      <RouterLink to="/transactions">Transações</RouterLink>
      <div class="login">
        <button @click.prevent="logout">Logout</button>
      </div>
    </div>
  </div>
</template>