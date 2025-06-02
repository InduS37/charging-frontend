<template>
  <div class="form-container">
    <h3>Add Charging Station</h3>
    <form @submit.prevent="handleSubmit">
      <input v-model="station.name" type="text" placeholder="Station Name" required />
      <input v-model.number="station.location.lat" type="number" placeholder="Latitude" required />
      <input v-model.number="station.location.lng" type="number" placeholder="Longitude" required />
      
      <select v-model="station.status">
  <option value="active">active</option>
  <option value="inactive">inactive</option>
</select>


      <input v-model.number="station.powerOutput" type="number" placeholder="Power Output (kW)" required />
      <input v-model="station.connectorType" type="text" placeholder="Connector Type" required />

      <button type="submit">Add Station</button>
    </form>

    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'StationForm',
  data() {
    return {
      station: {
        name: '',
        location: {
          lat: null,
          lng: null
        },
        status: 'active',
        powerOutput: null,
        connectorType: ''
      },
      message: '',
      error: ''
    };
  },
  methods: {
    async handleSubmit() {
  try {
    await axios.post('/stations', this.station); // ✅ no unused variable
    this.message = 'Station added successfully!';
    this.error = '';
    this.resetForm();
    this.$emit('station-added'); // 👈 refresh list in dashboard
  } catch (err) {
    this.message = '';
    this.error = err.response?.data?.message || 'Failed to add station';
  }
},

    resetForm() {
      this.station = {
        name: '',
        location: {
          lat: null,
          lng: null
        },
        status: 'active',
        powerOutput: null,
        connectorType: ''
      };
    }
  }
};
</script>

<style scoped>
.form-container {
  border: 1px solid #ccc;
  padding: 16px;
  max-width: 400px;
  margin: 20px auto;
}
input, select {
  display: block;
  width: 100%;
  margin: 8px 0;
  padding: 8px;
}
button {
  padding: 8px 16px;
}
.success {
  color: green;
}
.error {
  color: red;
}
</style>