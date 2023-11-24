<template>
  <div id="app">
    <div id="map" style="height: 500px;"></div>
    <button @click="downloadTiles">下载瓦片</button>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import L from 'leaflet';
import 'leaflet-draw';

export default {
  name: 'TileDownload',
  data() {
    return {
      map: null,
      selectedArea: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([39.9042, 116.4074], 13); // 北京的坐标

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // 初始化框选工具
      const drawnItems = new L.FeatureGroup();
      this.map.addLayer(drawnItems);

      const drawControl = new L.Control.Draw({
        draw: {
          polygon: true,
          polyline: false,
          rectangle: true,
          circle: false,
          marker: false
        },
        edit: {
          featureGroup: drawnItems
        }
      });

      this.map.addControl(drawControl);

      this.map.on(L.Draw.Event.CREATED, (event) => {
        const { layer } = event;
        drawnItems.addLayer(layer);
        this.selectedArea = layer.getBounds();
      });
    },
    downloadTiles() {
      if (!this.selectedArea) {
        alert('请先选择一个区域');
        return;
      }
      // 在此添加下载逻辑
      console.log('下载瓦片', this.selectedArea);
    },
  },
};
</script>

<style>
#map {
  width: 100%;
}
</style>
