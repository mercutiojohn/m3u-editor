<template>
  <el-container>
    <el-header>
      <el-button type="primary">
        <label for="geojson-upload">
          选择 GeoJSON 文件
          <input type="file" id="geojson-upload" @change="handleGeoJSONUpload" style="display: none;" accept=".geojson,.json"/>
        </label>
      </el-button>
      <el-button type="primary" @click="handleHitMergeBtn">合并 GeoJSON</el-button>
      <el-button type="primary" @click="downloadMerged" :disabled="!mergedGeoJson">下载合并后的 GeoJSON</el-button>
    </el-header>
    <el-main>
      <div id="map" style="height: 500px;"></div>
      <!-- <el-input
          type="textarea"
          v-model="originalGeoJsonStr"
          readonly
        ></el-input>
      <el-input
          type="textarea"
          v-model="mergedGeoJsonStr"
          readonly
        ></el-input> -->

      <el-table v-if="currentGeoJson" :data="currentGeoJson.features" style="width: 100%">
        <!-- <el-table-column prop="type" label="类型"></el-table-column> -->
        <el-table-column label="type">
          <template slot-scope="scope">
            <span>{{ scope.row.geometry.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="name">
          <template slot-scope="scope">
            <span>{{ scope.row.properties.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="@id">
          <template slot-scope="scope">
            <span>{{ scope.row.properties['@id'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="ref">
          <template slot-scope="scope">
            <span>{{ scope.row.properties.ref }}</span>
          </template>
        </el-table-column>
        <el-table-column label="source">
          <template slot-scope="scope">
            <span>{{ scope.row.properties.source }}</span>
          </template>
        </el-table-column>
        <el-table-column label="layer">
          <template slot-scope="scope">
            <span>{{ scope.row.properties.layer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="bridge">
          <template slot-scope="scope">
            <span>{{ scope.row.properties.bridge }}</span>
          </template>
        </el-table-column>
        <el-table-column label="lanes">
          <template slot-scope="scope">
            <span>{{ scope.row.properties.lanes }}</span>
          </template>
        </el-table-column>
        <el-table-column label="length">
          <template slot-scope="scope">
            <span>{{ scope.row.geometry.coordinates.length }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="properties" label="属性" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ JSON.stringify(scope.row.properties) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>

<script>
import * as turf from '@turf/turf'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default {
  data() {
    return {
      file: null,
      originalGeoJson: null,
      currentGeoJson: null,
      mergedGeoJson: null,
      map: null,
      geojsonLayer: null,
    }
  },
  computed: {
    mergedGeoJsonStr () {
      return JSON.stringify(this.mergedGeoJson, null, 2) || ''
    },
    originalGeoJsonStr () {
      return JSON.stringify(this.originalGeoJson, null, 2) || ''
    }
  },
  watch: {
    currentGeoJson(newValue, oldValue) {
      if (this.map) {
        this.displayGeoJson(newValue)
      }
    }
  },
  mounted() {
    this.map = L.map('map').setView([0, 0], 2)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(this.map)
  },
  methods: {
    handleGeoJSONUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        this.originalGeoJson = data;
        this.currentGeoJson = data;
        // this.displayGeoJson(this.currentGeoJson);
      };

      reader.readAsText(file);
    },
    handleHitMergeBtn() {
      const data = this.mergeFeatures(this.originalGeoJson);
      this.mergedGeoJson = data;
      this.currentGeoJson = data;
      // this.displayGeoJson(this.currentGeoJson);
    },
    mergeFeatures(geoJson) {
    let mergedFeatures = {};
    let resultFeatures = [];

    geoJson.features.forEach(feature => {
      if (feature.type === "Feature" && feature.properties.name && feature.properties.ref) {
        const mergeKey = `${feature.properties.name}_${feature.properties.ref}`;
        if (mergedFeatures[mergeKey]) {
          // 合并逻辑：这里只是简单地合并了坐标，您可能需要根据实际情况调整
          mergedFeatures[mergeKey].geometry.coordinates.push(...feature.geometry.coordinates);
        } else {
          mergedFeatures[mergeKey] = JSON.parse(JSON.stringify(feature));
        }
      }
    });

    for (const key in mergedFeatures) {
      let feature = mergedFeatures[key];
      // 对坐标进行排序
      feature.geometry.coordinates.sort((a, b) => {
        // 按照经度或纬度排序，根据需要调整
        // return a[0] - b[0] || a[1] - b[1];
        // return a[0] - b[0];
        // return a[1] - b[1];
        return a[0] - b[0] && a[1] - b[1];
      });
      resultFeatures.push(feature);
    }

    return {
      "type": "FeatureCollection",
      "features": resultFeatures
    };
  },
    displayGeoJson(geoJson) {
      if (this.geojsonLayer) {
        this.map.removeLayer(this.geojsonLayer)
      }
      this.geojsonLayer = L.geoJSON(geoJson).addTo(this.map)
      this.map.fitBounds(this.geojsonLayer.getBounds())
    },
    downloadMerged() {
      if (!this.mergedGeoJson) {
        this.$message.error('没有合并后的数据可下载')
    return
  }

  const dataStr = JSON.stringify(this.mergedGeoJson)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'merged_geojson.json')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
},
},
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>