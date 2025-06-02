<template>
  <div class="map-container">
    <LMap :zoom="6" :center="[defaultLat, defaultLng]" style="height: 500px; width: 100%;">
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LMarker
        v-for="station in stations"
        :key="station._id"
        :lat-lng="[station.location.lat, station.location.lng]"
      >
        <LPopup>
          <strong>{{ station.name }}</strong><br />
          Power: {{ station.powerOutput }} kW<br />
          Connector: {{ station.connectorType }}<br />
          Status: {{ station.status }}
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import axios from '../axios';

export default {
  name: 'MapView',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data() {
    return {
      stations: [],
      defaultLat: 20.5937, // Center of India
      defaultLng: 78.9629
    };
  },
  async mounted() {
  try {
    const res = await axios.get('/stations');
    this.stations = res.data;
  } catch (err) {
    console.error('Failed to load stations for map:', err);
  }
}
};
</script>

<style scoped>
.map-container {
  margin-top: 20px;
}
</style>
