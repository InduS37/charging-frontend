<template>
  <div class="dashboard">
    <h2>Charging Stations</h2>

    <!-- ➕ Add station -->
    <StationForm @station-added="fetchStations" />

    <!-- 📋 Station List -->
    <ul>
      <li v-for="station in stations" :key="station._id">
        <div v-if="editId === station._id">
          <!-- ✏️ Edit form -->
          <input v-model="editedStation.name" placeholder="Name" />
          <input v-model.number="editedStation.location.lat" placeholder="Latitude" />
          <input v-model.number="editedStation.location.lng" placeholder="Longitude" />
          <select v-model="editedStation.status">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <input v-model.number="editedStation.powerOutput" placeholder="Power Output (kW)" />
          <input v-model="editedStation.connectorType" placeholder="Connector Type" />
          <button @click="updateStation(station._id)">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>

        <div v-else>
          <strong>{{ station.name }}</strong><br />
          Lat: {{ station.location.lat }}, Lng: {{ station.location.lng }}<br />
          Status: {{ station.status }}<br />
          Power Output: {{ station.powerOutput }} kW<br />
          Connector Type: {{ station.connectorType }}<br />
          <button @click="enableEdit(station)">Edit</button>
          <button @click="deleteStation(station._id)">Delete</button>
        </div>
      </li>
    </ul>

    <h3>Map View</h3>
    <MapView />

    <div v-if="error" class="error">{{ error }}</div>
  </div>
  <!-- 🔓 Logout button at the bottom -->
<div class="logout-bottom">
  <button @click="logout" class="logout-btn">Logout</button>
</div>

</template>

<script>
import axios from '../axios';
import StationForm from '../components/StationForm.vue';
import MapView from '../components/MapView.vue';

export default {
  name: 'DashboardValue',
  components: {
    StationForm,
    MapView
  },
  data() {
    return {
      stations: [],
      error: '',
      editId: null,
      editedStation: {
        name: '',
        location: { lat: null, lng: null },
        status: '',
        powerOutput: null,
        connectorType: ''
      }
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    },
    async fetchStations() {
      try {
        const res = await axios.get('/stations');
        this.stations = res.data;
      } catch (err) {
        this.error = 'Failed to fetch stations';
      }
    },
    async deleteStation(id) {
      if (!confirm('Are you sure you want to delete this station?')) return;
      try {
        await axios.delete(`/stations/${id}`);
        this.fetchStations();
      } catch (err) {
        this.error = 'Failed to delete station';
      }
    },
    enableEdit(station) {
      this.editId = station._id;
      this.editedStation = JSON.parse(JSON.stringify(station));
    },
    cancelEdit() {
      this.editId = null;
      this.resetEditedStation();
    },
    resetEditedStation() {
      this.editedStation = {
        name: '',
        location: { lat: null, lng: null },
        status: '',
        powerOutput: null,
        connectorType: ''
      };
    },
    async updateStation(id) {
      try {
        await axios.put(`/stations/${id}`, this.editedStation);
        this.editId = null;
        this.resetEditedStation();
        this.fetchStations();
      } catch (err) {
        this.error = 'Failed to update station';
      }
    }
  },
  mounted() {
    this.fetchStations();
  }
};
</script>

<style scoped>
.dashboard {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
input,
select {
  margin: 5px 0;
  padding: 6px;
  width: 100%;
}
button {
  margin: 5px 5px 10px 0;
  padding: 6px 12px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}
.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}
.error {
  color: red;
  font-weight: bold;
}
.logout-bottom {
  text-align: center;
  margin-top: 30px;
}
.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 16px;
  cursor: pointer;
}

</style>
