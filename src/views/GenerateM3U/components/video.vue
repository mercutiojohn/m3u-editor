<template>
  <div>
    {{src}}
    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
// import '@videojs/http-streaming';
import 'videojs-flvjs';

export default {
  name: 'VideoPlayer',
  props: {
    src: {
      type: String,
      default: 'http://sk.cri.cn/887.m3u8'
    }
  },
  methods: {
    getOptions(src) {
      return {
        // techOrder: ['html5', 'flvjs'],
        // flvjs: {
        //     mediaDataSource: {
        //         isLive: false,
        //         cors: true,
        //         withCredentials: false,
        //     },
        // },
        sources: [{
            src: src,
            // type: 'video/mp4'
        }],
        controls: true,
        preload: "none"
      }
    }
  },
  watch: {
    src(newVal, oldVal) {
      console.log(newVal)
      this.player.src({
        src: newVal,
        // type: 'video/x-flv'
      });

      this.player.play();
      // this.player.dispose();
      // this.playerDom = null;
      // this.playerDom = this.$refs.videoPlayer;
      // this.$nextTick(() => {
      //   this.player = videojs(this.playerDom, this.getOptions(newVal), () => {
      //     this.player.log('onPlayerReady', this);
      //     this.player.play();
      //   });
      // })

      // if (Hls.isSupported()) {
      //   this.hls = new Hls();
      //   // 监听Hls.js的错误事件
      //   this.hls.on(Hls.Events.ERROR, (event, data) => {
      //     if (data.fatal) {
      //       switch(data.type) {
      //         case Hls.ErrorTypes.NETWORK_ERROR:
      //           // 这可能是由于CORS问题或其他网络问题引起的
      //           if (data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR ||
      //               data.details === Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT) {
      //               console.error("播放错误，可能是由于CORS政策问题。");
      //               this.$message.warning("播放错误，请尝试从其他来源播放。");
      //               // 这里你可以提示用户跳转到其他页面进行播放
      //           }
      //           break;
      //         // 这里你可以处理其他错误类型
      //       }
      //     }
      //   });
      // }
    }
  },
  data() {
    return {
      player: null,
      playerDom: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.player = videojs(this.$refs.videoPlayer, this.getOptions(this.src), () => {
        this.player.log('onPlayerReady', this);
      });
    })
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
</script>