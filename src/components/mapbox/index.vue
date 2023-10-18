<template>
  <div class="mapbox">
    <!-- {{lineGeojson}} -->
    <div id="map"></div>
  </div>
</template>

<script setup>
import mapboxgl from "mapbox-gl";
import maplibregl from "maplibre-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import proj4 from "proj4";

import { gcj02towgs84 } from "@/utils/gls";

const MY_KEY = "88f3c1aa7e87a1daa0176fe655a92030";

export default {
  data() {
    return {
      map: null,

      lineGeojson: {},

      EARTHRADIUS: 6370996.81,
      MCBAND: [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
      LLBAND: [86, 60, 45, 30, 15, 0],
      MC2LL: [
        [
          1.410526172116255e-8,
          898305509648872e-20,
          -1.9939833816331,
          200.9824383106796,
          -187.2403703815547,
          91.6087516669843,
          -23.38765649603339,
          2.57121317296198,
          -0.03801003308653,
          17337981.2,
        ],
        [
          -7.435856389565537e-9,
          8983055097726239e-21,
          -0.78625201886289,
          96.32687599759846,
          -1.85204757529826,
          -59.36935905485877,
          47.40033549296737,
          -16.50741931063887,
          2.28786674699375,
          10260144.86,
        ],
        [
          -3.030883460898826e-8,
          898305509983578e-20,
          0.30071316287616,
          59.74293618442277,
          7.357984074871,
          -25.38371002664745,
          13.45380521110908,
          -3.29883767235584,
          0.32710905363475,
          6856817.37,
        ],
        [
          -1.981981304930552e-8,
          8983055099779535e-21,
          0.03278182852591,
          40.31678527705744,
          0.65659298677277,
          -4.44255534477492,
          0.85341911805263,
          0.12923347998204,
          -0.04625736007561,
          4482777.06,
        ],
        [
          3.09191371068437e-9,
          8983055096812155e-21,
          6995724062e-14,
          23.10934304144901,
          -0.00023663490511,
          -0.6321817810242,
          -0.00663494467273,
          0.03430082397953,
          -0.00466043876332,
          2555164.4,
        ],
        [
          2.890871144776878e-9,
          8983055095805407e-21,
          -3.068298e-8,
          7.47137025468032,
          -353937994e-14,
          -0.02145144861037,
          -1234426596e-14,
          0.00010322952773,
          -323890364e-14,
          826088.5,
        ],
      ],
      LL2MC: [
        [
          -0.0015702102444,
          111320.7020616939,
          0x60e374c3105a3,
          -0x24bb4115e2e164,
          0x5cc55543bb0ae8,
          -0x7ce070193f3784,
          0x5e7ca61ddf8150,
          -0x261a578d8b24d0,
          0x665d60f3742ca,
          82.5,
        ],
        [
          0.0008277824516172526,
          111320.7020463578,
          647795574.6671607,
          -4082003173.641316,
          10774905663.51142,
          -15171875531.51559,
          12053065338.62167,
          -5124939663.577472,
          913311935.9512032,
          67.5,
        ],
        [
          0.00337398766765,
          111320.7020202162,
          4481351.045890365,
          -23393751.19931662,
          79682215.47186455,
          -115964993.2797253,
          97236711.15602145,
          -43661946.33752821,
          8477230.501135234,
          52.5,
        ],
        [
          0.00220636496208,
          111320.7020209128,
          51751.86112841131,
          3796837.749470245,
          992013.7397791013,
          -1221952.21711287,
          1340652.697009075,
          -620943.6990984312,
          144416.9293806241,
          37.5,
        ],
        [
          -0.0003441963504368392,
          111320.7020576856,
          278.2353980772752,
          2485758.690035394,
          6070.750963243378,
          54821.18345352118,
          9540.606633304236,
          -2710.55326746645,
          1405.483844121726,
          22.5,
        ],
        [
          -0.0003218135878613132,
          111320.7020701615,
          0.00369383431289,
          823725.6402795718,
          0.46104986909093,
          2351.343141331292,
          1.58060784298199,
          8.77738589078284,
          0.37238884252424,
          7.45,
        ],
      ],

      MY_KEY: "88f3c1aa7e87a1daa0176fe655a92030",
      customStyle: {
        version: 8,
        id: "43f36e14-e3f5-43c1-84c0-50a9c80dc5c7",
        sources: {
          "tdt-vec": {
            type: "raster",
            tiles: [
              `https://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${MY_KEY}`,
            ],
            tileSize: 256,
          },
          "tdt-cva": {
            type: "raster",
            tiles: [
              `https://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=${MY_KEY}`,
            ],
            tileSize: 256,
          },
        },
        light: {
          anchor: "map",
          color: "red",
          intensity: 1,
        },
        layers: [
          {
            id: "tdt-tiles-layer",
            type: "raster",
            source: "tdt-vec",
            paint: {
              // "raster-brightness-max": 0.2,
              // "raster-brightness-min": 0.7,
              // "raster-hue-rotate": 120,
              // "raster-saturation": 0,
            },
          },
          {
            id: "tdt-cva-layer",
            type: "raster",
            source: "tdt-cva",
          },
        ],
        glyphs: "/fonts/mapbox/{fontstack}/{range}.pbf",
      },
    };
  },
  methods: {
    point(lng, lat) {
      // console.log(lng, lat)
      return { lng, lat };
    },
    pointLatLng(lat, lng) {
      // console.log(lat, lng)
      return { lat, lng };
    },
    cq(t) {
      return (t * Math.PI) / 180;
    },
    dL(t, e, i) {
      return e > t ? (t = e) : t > i && (t = i), t;
    },
    parseGeo(e) {
      if ("string" == typeof e) {
        var t = e.split("|"),
          n = parseInt(t[0]),
          r = t[1],
          i = t[2],
          a = i.split(";");
        if (4 === n) {
          for (var o = [], s = 0; s < a.length - 1; s++) {
            var u = s + 1 + "-";
            0 === a[s].indexOf(u) &&
              o.push(a[s].substr(u.length, a[s].length - 2));
          }
          (a = o), a.push("");
        }
        var l = [];
        switch (n) {
          case 1:
            l.push(a[0]);
            break;
          case 2:
          case 3:
          case 4:
            for (var s = 0; s < a.length - 1; s++) {
              var c = a[s];
              if (c.length > 100)
                (c = c.replace(
                  /(-?[1-9]\d*\.\d*|-?0\.\d*[1-9]\d*|-?0?\.0+|0|-?[1-9]\d*),(-?[1-9]\d*\.\d*|-?0\.\d*[1-9]\d*|-?0?\.0+|0|-?[1-9]\d*)(,)/g,
                  "$1,$2;"
                )),
                  l.push(c);
              else {
                for (
                  var d = [], f = c.split(","), h = 0;
                  h < f.length;
                  h += 2
                ) {
                  var m = f[h],
                    p = f[h + 1];
                  d.push(m + "," + p);
                }
                l.push(d.join(";"));
              }
            }
        }
        return (
          l.length <= 1 && (l = l.toString()),
          {
            type: n,
            bound: r,
            points: l,
          }
        );
      }
    },
    getDistanceByMC: function (t, e) {
      if (!t || !e) return 0;
      var i, n, o, a;
      return (t = this.convertMC2LL(t))
        ? ((i = this.cq(t.lng)),
          (n = this.cq(t.lat)),
          (e = this.convertMC2LL(e))
            ? ((o = this.cq(e.lng)),
              (a = this.cq(e.lat)),
              this.getDistance(i, o, n, a))
            : 0)
        : 0;
    },
    getDistanceByLL: function (t, e) {
      if (!t || !e) return 0;
      (t.lng = this.getLoop(t.lng, -180, 180)),
        (t.lat = this.getRange(t.lat, -80, 84)),
        (e.lng = this.getLoop(e.lng, -180, 180)),
        (e.lat = this.getRange(e.lat, -80, 84));
      var i, n, o, a;
      return (
        (i = this.cq(t.lng)),
        (o = this.cq(t.lat)),
        (n = this.cq(e.lng)),
        (a = this.cq(e.lat)),
        this.getDistance(i, n, o, a)
      );
    },
    convertMC2LL(t) {
      if (null === t) return t;
      if (!t) return this.point(0, 0);
      var e, i;
      e = this.point(Math.abs(t.lng), Math.abs(t.lat));
      for (var n = 0; n < this.MCBAND.length; n++)
        if (e.lat >= this.MCBAND[n]) {
          i = this.MC2LL[n];
          break;
        }
      var o = this.convertor(t, i);
      return this.pointLatLng(o.lat, o.lng);
    },
    convertLL2MC(t) {
      if (!t) return this.point(0, 0);
      var e = t.lat,
        i = t.lng;
      (i = this.getLoop(t.lng, -180, 180)), (e = this.dL(e, -85, 85));
      for (var n, o = 0; o < this.LLBAND.length; o++)
        if (e >= this.LLBAND[o]) {
          n = this.LL2MC[o];
          break;
        }
      if (!n)
        for (o = 0; o < this.LLBAND.length; o++)
          if (e <= -this.LLBAND[o]) {
            n = this.LL2MC[o];
            break;
          }
      var a = this.point(i, e),
        r = this.convertor(a, n),
        s = this.point(r.lng, r.lat);
      s.latLng = t.clone();
      return s;
    },
    convertor: function (t, e) {
      if (t && e) {
        var i = e[0] + e[1] * Math.abs(t.lng),
          n = Math.abs(t.lat) / e[9],
          o =
            e[2] +
            e[3] * n +
            e[4] * n * n +
            e[5] * n * n * n +
            e[6] * n * n * n * n +
            e[7] * n * n * n * n * n +
            e[8] * n * n * n * n * n * n;
        i *= t.lng < 0 ? -1 : 1;
        o *= t.lat < 0 ? -1 : 1;
        return this.point(i, o);
      }
    },
    getDistance: function (t, e, i, n) {
      return (
        this.EARTHRADIUS *
        Math.acos(
          Math.sin(i) * Math.sin(n) +
            Math.cos(i) * Math.cos(n) * Math.cos(e - t)
        )
      );
    },
    getRange: function (t, e, i) {
      return (
        null != e && (t = Math.max(t, e)), null != i && (t = Math.min(t, i)), t
      );
    },
    getLoop: function (t, e, i) {
      for (; t > i; ) t -= i - e;
      for (; e > t; ) t += i - e;
      return t;
    },
    lineBaiduToCoords(lineData) {
      let res = this.baiduGeoToCoordArr(lineData.content[0].geo);
      return res;
    },
    scatterBaiduToMeta(lineData) {
      let stations = lineData.content[0].stations;
      // console.log('[scatterBaiduToMeta]', stations)
      const scatterGeoJsonFC = this.getGeoJsonTemplate("scatter");
      const scatterGeoJsonF = this.deepClone(scatterGeoJsonFC.features[0]);
      let res = scatterGeoJsonFC;
      res.features = [];

      stations.forEach((item) => {
        let coordArr = this.baiduGeoToCoordArr(item.geo);
        // console.log(coordArr, coordArr[0])

        let parsedFeature = this.deepClone(scatterGeoJsonF);
        parsedFeature.properties = {
          ...item,
          name: item.name,
          id: item.uid,
        };
        parsedFeature.geometry.coordinates = coordArr[0];
        res.features.push(parsedFeature);
      });
      return res;
    },
    baiduGeoToCoordArr(geoStr) {
      let res = [];
      this.parseGeo(geoStr)
        .points.split(";")
        .forEach((element) => {
          const coord = this.convertMC2LL({
            lng: element.split(",")[0],
            lat: element.split(",")[1],
          });
          // res.push([coord.lng, coord.lat]);
          res.push(gcj02towgs84(coord.lng, coord.lat));
        });
      return res;
    },
    lineAmapToCoords(lineData) {
      const line_list = lineData.data.busline_list[0];
      // console.log(line_list)
      let xs = line_list.xs.split(",");
      let ys = line_list.ys.split(",");
      // console.log(line_list.xs.split(','), line_list.ys.split(','))
      let res = [];
      for (let i = 0; i < xs.length; i++) {
        // console.log(ys[i], xs[i])
        res.push([
          gcj02towgs84(ys[i], xs[i])[1],
          gcj02towgs84(ys[i], xs[i])[0],
        ]);
      }
      return res;
    },
    scatterAmapToMeta(lineData) {
      const line_list = lineData.data.busline_list[0];
      // console.log(line_list)
      let stations = line_list.stations;
      // console.log(line_list.xs.split(','), line_list.ys.split(','))
      const scatterGeoJsonFC = this.getGeoJsonTemplate("scatter");
      const scatterGeoJsonF = this.deepClone(scatterGeoJsonFC.features[0]);
      let res = scatterGeoJsonFC;
      res.features = [];

      stations.forEach((item) => {
        let parsedFeature = this.deepClone(scatterGeoJsonF);
        parsedFeature.properties = {
          ...item,
          name: item.name,
          id: item.station_id,
        };
        parsedFeature.geometry.coordinates = item.poiid2_xy.split(";");
        res.features.push(parsedFeature);
      });

      return res;
    },
    getGeoJsonTemplate(type) {
      let lineGeoJson = {};
      switch (type) {
        case "line":
          lineGeoJson = require("@/assets/geojson-template/lineTemplate.json");
          break;
        case "scatter":
          lineGeoJson = require("@/assets/geojson-template/scatterTemplate.json");
          break;
        default:
          lineGeoJson = {};
      }
      return lineGeoJson;
    },
    deepClone(item) {
      return JSON.parse(JSON.stringify(item));
    },
    renderGeoJson(id, file, type) {
      switch (type) {
        case "lines":
          this.map.addSource(`${id}_line_src`, {
            type: "geojson",
            data: file,
            generateId: true,
          });
          this.map.addLayer({
            id: `${id}_line`,
            type: "line",
            source: `${id}_line_src`,
            layout: {},
            paint: {
              "line-color": "#000",
              "line-width": 3,
            },
          });
          break;
        case "scatter":
          this.map.addSource(`${id}_scatter_src`, {
            type: "geojson",
            data: file,
            generateId: true,
          });
          this.map.addLayer({
            id: `${id}_scatter`,
            type: "circle",
            source: `${id}_scatter_src`,
            paint: {
              "circle-radius": 4,
              "circle-stroke-width": 2,
              "circle-color": "red",
              "circle-stroke-color": "white",
            },
          });
          break;
        default:
          break;
      }
    },
    renderMetro(id, metroGeoMeta, type) {
      let lineCoords = [];
      let scatterMeta = [];
      switch (type) {
        case "baidu":
          lineCoords = this.lineBaiduToCoords(metroGeoMeta);
          scatterMeta = this.scatterBaiduToMeta(metroGeoMeta);
          break;
        case "amap":
          lineCoords = this.lineAmapToCoords(metroGeoMeta);
          scatterMeta = this.scatterAmapToMeta(metroGeoMeta);
          break;
        default:
          lineCoords = [];
          scatterMeta = {};
      }
      if (lineCoords) {
        let lineGeoJson = this.getGeoJsonTemplate("line");
        console.log("[lineCoords]", lineCoords);
        lineGeoJson.features[0].geometry.coordinates = lineCoords;

        this.map.addSource(`${id}_line_src`, {
          type: "geojson",
          data: lineGeoJson,
          generateId: true,
        });
        this.map.addLayer({
          id: `${id}_line`,
          type: "line",
          source: `${id}_line_src`,
          layout: {},
          paint: {
            "line-color": "#000",
            "line-width": 3,
          },
        });
      }
      if (scatterMeta) {
        let scatterGeoJson = scatterMeta;
        console.log("[scatterMeta]", scatterGeoJson);

        this.map.addSource(`${id}_scatter_src`, {
          type: "geojson",
          data: scatterGeoJson,
          generateId: true,
        });
        this.map.addLayer({
          id: `${id}_scatter`,
          type: "circle",
          source: `${id}_scatter_src`,
          paint: {
            "circle-radius": 4,
            "circle-stroke-width": 2,
            "circle-color": "red",
            "circle-stroke-color": "white",
          },
        });
      }
    },
    initMap() {
      // mapboxgl.setRTLTextPlugin(
      //   "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js"
      // );
      mapboxgl.accessToken =
        "pk.eyJ1IjoiaHVhbmdsaWkiLCJhIjoiY2pzNHBtendwMDZ2ZDQzbnVmZXdtMDlvdiJ9.GSija86yNNR4ssBtFFpx0g";
      this.map = new mapboxgl.Map({
        // const map = new maplibregl.Map({
        container: "map", // container ID
        // style: "mapbox://styles/mapbox/streets-v11", // style URL
        // style: "mapbox://styles/mapbox/navigation-night-v1", // style URL
        style: "mapbox://styles/mapbox/light-v11", // style URL
        // style: customStyle,
        center: [117.044702, 36.642555], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
      this.map.addControl(
        new MapboxLanguage({
          defaultLanguage: "zh-Hans",
        })
      );
    },
  },

  mounted() {
    this.initMap();

    var wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs  ";
    var cgcs2000 =
      "+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs";

    //将cgcs2000坐标转换成wgs84坐标
    console.log("changeProj4", proj4(cgcs2000, wgs84, [447954.62, 4419421.83]));
    console.log(
      proj4(wgs84, cgcs2000, [116.39134911955472, 39.90737453304378])
    );

    this.map.on("load", () => {
      // let line3_2 = require("@/assets/subway-lines/jinan/3-2-c.json");
      // let line3 = require("@/assets/subway-lines/jinan/3.json");
      // let line2 = require("@/assets/subway-lines/jinan/2.json");
      // let line1 = require("@/assets/subway-lines/jinan/1.json");
      let lines = require("@/assets/osm_jinan_subway_lines_constructing.json");
      let brtLines = require("@/assets/brt.json");
      let stations = require("@/assets/osm_jinan_subway_stations_constructing.json");
      let brtStations = require("@/assets/brt.json");
      // this.renderMetro("jinan-subway-line3-2", line3_2, "baidu");
      // this.renderMetro("jinan-subway-line3", line3, "amap");
      // this.renderMetro("jinan-subway-line2", line2, "amap");
      // this.renderMetro("jinan-subway-line1", line1, "amap");
      this.renderGeoJson("jinan-subway-lines", lines, "lines");
      this.renderGeoJson("jinan-subway-stations", stations, "scatter");
      // this.renderGeoJson("jinan-brt-lines", brtLines, "lines");
      // this.renderGeoJson("jinan-brt-stations", brtStations, "scatter");
    });
  },
};
</script>

<style scoped>
.mapbox {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* position: absolute; */
  /* top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
}
#map {
  width: 100%;
  height: 100%;
}
</style>
