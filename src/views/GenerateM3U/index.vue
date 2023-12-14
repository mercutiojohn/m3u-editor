<template>
  <div style="box-sizing: border-box; flex-direction: column; padding: 20px; overflow: hidden; display: flex; width: 100%; height:100%; gap: 10px;">
    <div class="header" style="flex-shrink:0; height: 40px">
      <el-tabs
          v-model="activeTab"
          type="card"
          class="tab-reset size-mini ios my-tabs"
          style="margin:0 auto; width: 100%; max-width: 800px"
        >
          <el-tab-pane label="M3U 编辑器" name="edit"> </el-tab-pane>
          <el-tab-pane label="设置" name="settings"> </el-tab-pane>
      </el-tabs>
    </div>
    <div v-if="activeTab === 'edit'" class="main" style="display: flex; width: 100%; gap: 10px; height: calc(100% - 40px - 10px)">
      <div class="table" style="display: flex; flex-direction: column; width: 100%; height: 100%; gap: 10px;">
        <div class="header">
          <el-button @click="addNewChannel(0)">
            <i class="i-fluent:add-16-regular font-size-16px" />
            添加新频道</el-button>
          <el-button type="primary">
              <label for="m3u-upload">
                <i class="i-fluent:arrow-upload-16-regular font-size-16px"/>
                <template v-if="autoM3UContent">覆盖</template>导入 M3U 文件
                <input type="file" id="m3u-upload" @change="handleM3UUpload" style="display: none;" accept=".m3u"/>
              </label>
          </el-button>
          <el-button v-if="autoM3UContent">
              <label for="m3u-upload-add">
                <i class="i-fluent:add-square-multiple-16-regular font-size-16px"/>
                追加 M3U 文件
                <input type="file" id="m3u-upload-add" @change="handleM3UUploadAttach" style="display: none;" accept=".m3u"/>
              </label>
          </el-button>
          <el-button @click="truncateChannels" type="danger" plain>
            <i class="i-fluent:delete-16-regular font-size-16px"/>
            清空
          </el-button>
        </div>
        <el-table ref="dragTable" :data="channels" height="100%" row-key="url" id="m3u-edit-table">
          <el-table-column prop="logo" label="" width="60" show-overflow-tooltip>
            <div slot-scope="props" style="display: flex; align-items:center; justify-content: center;">
              <!-- <div class="box" style="width: 40px;height: 40px; background: #efefef; border-radius: 10px; overflow: hidden">
                <img :src="props.row?.logo || 'vite.svg'" alt="" srcset="" style="width: 100%;height: 100%;object-fit:border-box" />
              </div> -->
              <!-- <el-avatar v-if="props.row.logo" shape="square" :src="props.row.logo" @error="logoErrorHandler"></el-avatar> -->
              <!-- v-if="props.row.logo" -->
              <!-- <div class="box" v-else style="width: 40px;height: 40px; overflow: hidden;display: flex; align-items: center; justify-content: center">
                无
              </div> -->
              <el-image 
                :src="props.row.logo"
                referer-policy="no-referrer"
                style="width: 40px; height: 40px"
                :preview-src-list="[props.row.logo]"
                scroll-container="#m3u-edit-table"
                lazy>
              </el-image>
            </div>
          </el-table-column>
          <el-table-column prop="name" label="频道名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="platform" label="平台" width="120" :formatter="genericFormatter" show-overflow-tooltip></el-table-column>
          <el-table-column prop="groupTitle" label="分类" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="url" label="URL" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column type="expand">
            <template slot-scope="props">
              <el-form :model="props.row" label-width="120px">
                <el-form-item label="平台">
                  <el-select v-model="props.row.platform" placeholder="请选择平台" @change="$forceUpdate()">
                    <el-option v-for="(platform, idx) in platforms" :label="platform.name" :value="platform.key" :key="idx"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="UID" v-if="fyPlatforms.includes(props.row.platform)">
                  <el-input v-model="props.row.uid"></el-input>
                </el-form-item>
                <el-form-item label="URL" v-if="['custom'].includes(props.row.platform)">
                  <el-input v-model="props.row.url"></el-input>
                </el-form-item>
                <el-form-item label="Logo URL">
                  <el-input v-model="props.row.logo"></el-input>
                </el-form-item>
                <el-form-item label="频道名">
                  <el-input v-model="props.row.name"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                  <el-input v-model="props.row.groupTitle"></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column> -->
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <!-- <el-button @click="playUrl(scope.row.url)" size="mini" class="button-reset ghost slim"><i class="i-fluent:play-16-regular font-size-16px"></i></el-button> -->
              <el-button @click="pushRedirectUrl(scope.row.url)" size="mini" class="button-reset ghost slim"><i class="i-fluent:play-16-regular font-size-16px"></i></el-button>
              <el-button @click="pushRedirectUrl(getRedirectUrl(scope.row))" v-if="getRedirectUrl(scope.row)" size="mini" class="button-reset ghost slim"><i class="i-fluent:open-16-regular font-size-16px"></i></el-button>
              <el-button @click="editChannel(scope.row, scope.$index)" size="mini" class="button-reset ghost slim"><i class="i-fluent:edit-16-regular font-size-16px"></i></el-button>
              <el-button @click="addNewChannel(scope.$index + 1)" size="mini" class="button-reset ghost slim"><i class="i-fluent:add-16-regular font-size-16px"></i></el-button>
              <el-button @click="deleteChannel(scope.$index)" type="danger" size="mini" class="button-reset ghost slim"><i class="i-fluent:delete-16-regular font-size-16px"/></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="footer">
          <el-button @click="addNewChannel">
            <i class="i-fluent:add-16-regular font-size-16px" />
            添加新频道
          </el-button>
        </div>
      </div>
      <!-- <el-button @click="generateM3U" v-if="channels.length">生成 M3U</el-button> -->
      <!-- v-if="autoM3UContent" -->
      <div class="preview" style="display: flex; flex-direction: column; width: 700px; height: 100%; gap: 10px;">
        <div class="header">
          <el-button @click="copyToClipboard">
            <i class="i-fluent:document-copy-16-regular font-size-16px"/>
            复制到剪贴板
          </el-button>
          <el-button @click="downloadM3U" type="primary">
            <i class="i-fluent:arrow-download-16-regular font-size-16px"/>
            下载 M3U
          </el-button>
          <el-button @click="backupChannelsJSON">
            <i class="i-fluent:archive-16-regular font-size-16px"/>
            导出工程
          </el-button>
          <el-button @click="restoreChannelsJSON">
            <label for="json-upload">
              <i class="i-fluent:archive-arrow-back-16-regular font-size-16px"/>
              导入工程
              <input type="file" id="json-upload" @change="restoreChannelsJSON" style="display: none;" accept=".json"/>
            </label>
          </el-button>
        </div>
        <el-input
          type="textarea"
          class="form-item-reset full-height"
          style="height: 100%"
          v-model="autoM3UContent"
          readonly
        ></el-input>
        <!-- <div class="video-player">
          <Video :src="videoSrc" />
        </div> -->
      </div>
    </div>
    <div v-if="activeTab === 'settings'" class="main" style="display: flex; width: 100%; gap: 10px; height: calc(100% - 40px - 10px)">
      <el-form :model="options" label-position="left" label-width="120px">
        <el-form-item label="默认 IP">
          <el-input v-model="options.ip"></el-input>
        </el-form-item>
        <el-form-item label="默认端口">
          <el-input v-model="options.port"></el-input>
        </el-form-item>
        <el-form-item label="默认时区" v-if="collapseActiveNames.includes('more')">
          <el-input v-model="options.timezone"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="编辑频道" :visible.sync="isEditDialogVisible">
      <el-form :model="dialogEditingChannel" label-width="120px">
        <el-form-item label="频道名">
          <el-input v-model="dialogEditingChannel.name"></el-input>
        </el-form-item>
        <el-form-item label="Logo URL">
          <el-input v-model="dialogEditingChannel.logo"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-input v-model="dialogEditingChannel.groupTitle"></el-input>
        </el-form-item>
        <el-form-item label="平台">
          <el-select v-model="dialogEditingChannel.platform" placeholder="请选择平台">
            <el-option v-for="(platform, idx) in platforms" :label="platform.name" :value="platform.key" :key="idx"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="UID" v-if="platformTypes['saveId'].includes(dialogEditingChannel.platform)">
          <el-input v-model="dialogEditingChannel.uid"></el-input>
        </el-form-item>
        <el-form-item label="URL" v-if="platformTypes['fullUrl'].includes(dialogEditingChannel.platform)">
          <el-input v-model="dialogEditingChannel.url"></el-input>
        </el-form-item>
        <el-collapse v-model="collapseActiveNames">
          <el-collapse-item title="更多设置" name="more">
            <el-form-item label="TVG简称">
              <el-input v-model="dialogEditingChannel.tvgName"></el-input>
            </el-form-item>
            <el-form-item label="国家">
              <el-input v-model="dialogEditingChannel.country"></el-input>
            </el-form-item>
            <el-form-item label="语言">
              <el-input v-model="dialogEditingChannel.language"></el-input>
            </el-form-item>
            <el-form-item label="Shift">
              <el-input v-model="dialogEditingChannel.tvgShift"></el-input>
            </el-form-item>
            <el-form-item label="EPG URL">
              <el-input v-model="dialogEditingChannel.epgUrl"></el-input>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
        
      </el-form>
      <div v-if="autoM3UItem" style="padding-top: 10px">
        <el-input
          type="textarea"
          :rows="5"
          v-model="autoM3UItem"
          readonly
        ></el-input>
        <el-button @click="copyToClipboard('item')">
          <i class="i-fluent:document-copy-16-regular font-size-16px"/>
          复制到剪贴板
          </el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取消</el-button>
        <el-button type="primary" @click="saveEdit">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Video from './components/video.vue';
import Sortable from 'sortablejs'

export default {
  name: 'GenerateM3U',
  components: {Video},
  data() {
    return {
      channelTemplate: {
        platform: '',
        uid: '',
        logo: '',
        name: '',
        groupTitle: '',
        url: '',
        tvgId: '',
        tvgName: '',
        country: '',
        language: '',
        tvgShift: '',
        epgUrl: ''
      },
      platforms: [
        {name: '斗鱼', key: 'douyu', platformFeatures: 'fy', redirectURL: 'https://www.douyu.com/{uid}'},
        {name: 'BiliBili', key: 'bilibili', platformFeatures: 'fy', redirectURL: 'https://live.bilibili.com/{uid}'},
        {name: '虎牙', key: 'huya', platformFeatures: 'fy', redirectURL: 'https://huya.com/{uid}'},
        {name: 'YY', key: 'yy', platformFeatures: 'fy', redirectURL: 'https://www.yy.com/{uid}'},
        {name: '抖音', key: 'douyin', platformFeatures: 'fy', redirectURL: 'https://live.douyin.com/{uid}'},
        {name: 'YouTube', key: 'youtube', platformFeatures: 'fy', redirectURL: 'https://www.youtube.com/watch?v={uid}'},
        {name: 'Look直播', key: 'look', platformFeatures: 'fullUrl,saveId', redirectURL: 'https://look.163.com/live?id={uid}'},
        {name: '自定义', key: 'custom', platformFeatures: 'fullUrl'},
      ],
      fyPlatforms: ['douyu', 'bilibili', 'huya', 'yy', 'douyin', 'youtube'],
      saveIdPlatforms: ['douyu', 'bilibili', 'huya', 'yy', 'douyin', 'youtube', 'look'],
      fullUrlPlatforms: ['custom', 'look'],
      platformTypes: {
        'fy': ['douyu', 'bilibili', 'huya', 'yy', 'douyin', 'youtube'],
        'saveId': ['douyu', 'bilibili', 'huya', 'yy', 'douyin', 'youtube', 'look'],
        'saveId': ['douyu', 'bilibili', 'huya', 'yy', 'douyin', 'youtube', 'look'],
        'fullUrl': ['custom', 'look'],
      },
      channels: [],
      options: {
        ip: 'localhost',
        timezone: 'GMT +08:00',
        port: '35455'
      },
      m3uContent: '',
      dialogEditingChannel: {},
      isEditDialogVisible: false,
      dialogEditingIndex: -1,
      collapseActiveNames: [],
      activeTab: 'edit',
      // playing: false,
      // showVideo: false,
      // videoSrc: 'http://sk.cri.cn/887.m3u8',
      // video: null,
      // hls: null,

    };
  },
  computed: {
    autoM3UContent() {
      return this.generateM3U()
    },
    autoM3UItem() {
      return this.generateM3UItem()
    }
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        this.setLocalStorageItem('m3u-options', newVal)
      },
      deep: true
    }
  },
  methods: {
    async handleM3UUpload(event, type = 'reload') {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      console.log('[handleM3UUpload] [type]', type)
      reader.onload = (e) => {
        const content = e.target.result;
        this.parseM3UContent(content, type);
      };

      reader.readAsText(file);
    },
    async handleM3UUploadAttach(event) {
      await this.handleM3UUpload(event, 'attach');
    },
    getRedirectUrl(row) {
      const platform = this.platforms.find(p => p.key === row.platform);
      return platform?.redirectURL?.replace('{uid}', row.uid)
    },
    parseM3UContent(content, type = 'reload') {
      const lines = content.split("\n");
      let channels = [];
      console.log('[parseM3UContent] [type]', type)
      if (type === 'attach') {
        channels = [...this.channels];
      }

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (line.startsWith("#EXTINF:")) {
          const nextLine = lines[i + 1];
          if (nextLine) {
            // console.log(nextLine.trim())
            // const logoMatch = line.match(/tvg-logo="([^"]+)"/);
            const logoMatch = this.extractValue(line, 'tvg-logo');
            // const nameMatch = line.match(/,(.+)$/);
            // const nameMatch = line.match(/\,(.+)$/);
            // const nameMatch = line.match(/#EXTINF:.*?tvg-logo="([^"]+)?".*?group-title="([^"]+)?".*?,(.*?)\s*\n(https?:\/\/[^\s]+)/g);
            // const nameMatch = (line.match(/,(.*)$/) || [,''])[1].trim();
            let a = line.split(',')
            a.splice(0, 1);
            // console.log(a.join(','))
            const nameMatch = a.join(',').trim();
            const tvgIdMatch = this.extractValue(line, 'tvg-id');
            const groupTitleMatch = this.extractValue(line, 'group-title');
            const tvgNameMatch = this.extractValue(line, 'tvg-name');
            const countryMatch = this.extractValue(line, 'tvg-country');
            const languageMatch = this.extractValue(line, 'tvg-language');
            const tvgShiftMatch = this.extractValue(line, 'tvg-shift');
            const epgUrlMatch = this.extractValue(line, 'tvg-url');
            const platformMatch = this.getUrlInfo(nextLine).platform
            const platformKey = this.platforms.find(p => p.key === platformMatch);
            const uidMatch = this.getUrlInfo(nextLine).uid

            // console.log(this.getUrlInfo(nextLine).platform, platformKey?.key)

            channels.push({
                logo: logoMatch,
                name: nameMatch,
                url: nextLine.trim(),
                platform: platformKey?.key || 'custom',
                uid: uidMatch,
                groupTitle: groupTitleMatch,
                tvgId: tvgIdMatch,
                tvgName: tvgNameMatch,
                country: countryMatch,
                language: languageMatch,
                tvgShift: tvgShiftMatch,
                epgUrl: epgUrlMatch
            });
            i++; 
          }
        }
      }

      this.channels = channels;
      this.saveM3UChannels();
    },
    getUrlInfo(content) {
      const regex = /(http[s]?:\/\/[^:]+:35455\/([^\/]+)\/([^\/\?]+))/g;
      let match = regex.exec(content);
      // console.log('【match】', match)
      let res = {}
      if (match !== null) {
        // console.log('【match】', match)
        res.platform = match[2];
        res.uid = match[3];
      } else {
        res.platform = 'custom'
        res.uid = ''
      }
      return res
    },
    extractValue(line, attribute) {
      const regex = new RegExp(`${attribute}="([^"]*)"`);
      const match = line.match(regex);
      return match ? match[1] : '';
    },
    genericFormatter(row, column, cellValue) {
      const platform = this.platforms.find(p => p.key === cellValue);
      return platform ? platform.name : cellValue;
    },
    addNewChannel(index = -1) {
      if (index === -1) {
        this.channels.push({ ...this.channelTemplate });
      } else {
        this.channels.splice(index, 0, { ...this.channelTemplate });
      }
      this.saveM3UChannels()
    },
    removeChannel(index) {
      this.channels.splice(index, 1)
      this.saveM3UChannels()
    },
    truncateChannels() {
      this.channels = []
      this.saveM3UChannels()
    },
    generateM3U(channels = this.channels, platformTypes = this.platformTypes, options = this.options) {
      if (channels.length) {
        let content = '#EXTM3U\n';
        for (const [index, channel] of channels.entries()) {
          content += this.generateM3UItem(index, channel)
        }
        return content
      } else {
        return ''
      }
    },
    generateM3UItem(index = this.dialogEditingIndex, channel = this.dialogEditingChannel, platformTypes = this.platformTypes, options = this.options) {
      if (channel){
      let url = '';
        if (platformTypes['fy'].includes(channel.platform)) {
          url = `http://${options.ip || '<ip>'}${options.port ? ':' + options.port : ''}/${channel.platform}/${channel.uid || '<uid>'}`
          channel.url = url
        } else {
          switch (channel.platform) {
            // 添加其他平台的 URL 生成逻辑
            case 'custom':
              // url = channel.url;
              break;
            default:
              break;
          }
        }
        const attributes = {
          'tvg-id': channel.name,
          'tvg-name': channel.tvgName,
          'group-title': channel.groupTitle,
          'tvg-country': channel.country,
          'tvg-language': channel.language,
          'tvg-shift': channel.tvgShift,
          'tvg-logo': channel.logo,
          'tvg-url': channel.epgUrl
        };

        let attributesStr = '';
        for (let [key, value] of Object.entries(attributes)) {
          if (value !== undefined && value !== null && value !== '') {
            attributesStr += ` ${key}="${value}"`;
          }
        }

        return `#EXTINF:-1${attributesStr},${channel.name || '<name>'}\n${channel.url || '<url>'}\n`;
      } else {
        return ''
      }
    },
    updateM3U() {
      this.m3uContent = this.generateM3U();
    },
    downloadM3U() {
      const blob = new Blob([this.autoM3UContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'playlist.m3u';
      link.click();
    },
    copyToClipboard(type = 'list') {
      const textarea = document.createElement('textarea');
      if (type === 'item') {
        textarea.value = this.autoM3UItem;
      } else {
        textarea.value = this.autoM3UContent;
      }
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.$message.success('已复制到剪贴板');
    },
    backupChannelsJSON() {
      const blob = new Blob([JSON.stringify(this.channels)], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `backup-${Date.now()}.json`;
      link.click();
    },
    restoreChannelsJSON(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      console.log('[restoreChannelsJSON]')
      reader.onload = (e) => {
        const content = e.target.result;
        this.channels = JSON.parse(content)
      };

      reader.readAsText(file);
    },
    logoErrorHandler() {
      return true
    },
    pushRedirectUrl(url) {
      window.open(url, '_blank');
      // this.$router.push(url)
    },
    // playUrl(url) {
    //   this.showVideo = true
    //   this.videoSrc = url
    //   this.playing = true
    // },
    editChannel(channel, index) {
      this.dialogEditingChannel = { ...channel } // 复制数据到临时变量
      this.dialogEditingIndex = index
      this.isEditDialogVisible = true // 显示编辑对话框
    },
    cancelEdit() {
      this.isEditDialogVisible = false
      setTimeout(() => this.dialogEditingChannel = { ...this.channelTemplate }, 150)
      // this.dialogEditingChannel = { ...this.channelTemplate }
    },
    saveEdit() {
      // 更新 channels 数组中的数据
      this.$set(this.channels, this.dialogEditingIndex,{ ...this.dialogEditingChannel })
      // this.channels[this.dialogEditingIndex] = { ...this.dialogEditingChannel }
      this.isEditDialogVisible = false // 关闭编辑对话框
      setTimeout(() => this.dialogEditingChannel = { ...this.channelTemplate }, 150)
      // this.dialogEditingChannel = { ...this.channelTemplate }
      this.saveM3UChannels()
    },
    deleteChannel(index) {
      this.channels.splice(index, 1)
      this.saveM3UChannels()
    },
    getLocalStorageItemIfExists(name, cb = (localStorageItem) => localStorageItem) {
      const localStorageItem = localStorage.getItem(name)
      if (localStorageItem) cb(JSON.parse(localStorageItem))
    },
    setLocalStorageItem(name, item) {
      localStorage.setItem(name, JSON.stringify(item))
    },
    saveM3UChannels(channels = this.channels) {
      this.setLocalStorageItem('m3u-channels', channels)
    },
  },
  mounted() {
    this.getLocalStorageItemIfExists('m3u-channels',(res) => {
      this.channels = res
    })
    this.getLocalStorageItemIfExists('m3u-options',(res) => {
      this.options = {
        ...this.options,
        ...res
      }
    })
    const el = this.$refs.dragTable.$el.querySelectorAll(".el-table__body-wrapper > table > tbody")[0];
    const sortable = Sortable.create(el, {
      handle: ".allowDrag",
      onEnd: evt => {
        const targetRow = this.columns.splice(evt.oldIndex, 1)[0];
        this.columns.splice(evt.newIndex, 0, targetRow);
        for (let index in this.columns) {
          this.columns[index].sort = parseInt(index) + 1;
        }
      }
    });
    // this.options = this.getLocalStorageItemIfExists('m3u-options')
  }
};
</script>
<style lang="scss" scoped>
.header, .footer {
  display: flex;
  gap: 10px;
  .el-button + .el-button {
    margin-left: 0;
  }
  .el-form--inline {
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>