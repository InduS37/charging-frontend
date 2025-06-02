<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await axios.post('/auth/login', {
          username: this.username,
          password: this.password
        });
        const token = res.data.token;
        localStorage.setItem('token', token);
        this.$router.push('/dashboard'); // Redirect to dashboard after login
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed';
      }
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: auto;
  padding: 20px;
}
input {
  display: block;
  margin: 10px 0;
  width: 100%;
  padding: 8px;
}
button {
  padding: 8px 16px;
}
</style>
