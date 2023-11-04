<template>
  <div> 
    <el-button>
        <label for="m3u-upload">
          导入 M3U 文件
          <input type="file" id="m3u-upload" @change="handleM3UUpload" style="display: none;" accept=".m3u"/>
        </label>
    </el-button>
    <el-button @click="addNewChannel">添加新频道</el-button>

    <el-form :model="options" label-width="120px">
      <el-form-item label="自定义 IP">
        <el-input v-model="options.ip"></el-input>
      </el-form-item>
    </el-form>
    <el-table :data="channels">
      <el-table-column prop="logo" label="Logo" width="80">
        <template slot-scope="props">
          <!-- <div class="box" style="width: 100px;height: 100px; background: #efefef; border-radius: 10px; overflow: hidden">
            <img :src="props.row?.logo || 'vite.svg'" alt="" srcset="" style="width: 100%;height: 100%;object-fit:border-box" />
          </div> -->
          <el-avatar shape="square" :size="50" :src="props.row.logo || 'vite.svg'"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="频道名"></el-table-column>
      <el-table-column prop="platform" label="平台" :formatter="genericFormatter"></el-table-column>
      <el-table-column prop="category" label="分类"></el-table-column>
      <el-table-column prop="url" label="URL"></el-table-column>
      <!-- <el-table-column type="expand">
        <template slot-scope="props">
          <el-form :model="props.row" label-width="120px">
            <el-form-item label="平台">
              <el-select v-model="props.row.platform" placeholder="请选择平台" @change="$forceUpdate()">
                <el-option v-for="(platform, idx) in platforms" :label="platform.name" :value="platform.key" :key="idx"></el-option>
                <el-option label="自定义" value="custom"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="UID" v-if="useIdPlatforms.includes(props.row.platform)">
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
              <el-input v-model="props.row.category"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="editChannel(scope.row, scope.$index)" size="mini" class="button-reset ghost">编辑</el-button>
          <el-button @click="deleteChannel(scope.$index)" type="danger" size="mini" class="button-reset ghost">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="addNewChannel">添加新频道</el-button>
    <!-- <el-button @click="generateM3U" v-if="channels.length">生成 M3U</el-button> -->
    <el-button @click="downloadM3U" v-if="m3uContent">下载 M3U</el-button>
    <div v-if="autoM3uContent">
      <el-input
        type="textarea"
        :rows="10"
        v-model="autoM3uContent"
        readonly
      ></el-input>
      <el-button @click="copyToClipboard">复制到剪贴板</el-button>
    </div>
    <el-dialog title="编辑频道" :visible.sync="isEditDialogVisible">
      <el-form :model="dialogEditingChannel" label-width="120px">
        <el-form-item label="平台">
          <el-select v-model="dialogEditingChannel.platform" placeholder="请选择平台">
            <el-option v-for="(platform, idx) in platforms" :label="platform.name" :value="platform.key" :key="idx"></el-option>
            <el-option label="自定义" value="custom"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="UID" v-if="useIdPlatforms.includes(dialogEditingChannel.platform)">
          <el-input v-model="dialogEditingChannel.uid"></el-input>
        </el-form-item>
        <el-form-item label="URL" v-if="[...fullUrlPlatforms, 'custom'].includes(dialogEditingChannel.platform)">
          <el-input v-model="dialogEditingChannel.url"></el-input>
        </el-form-item>
        <el-form-item label="Logo URL">
          <el-input v-model="dialogEditingChannel.logo"></el-input>
        </el-form-item>
        <el-form-item label="频道名">
          <el-input v-model="dialogEditingChannel.name"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-input v-model="dialogEditingChannel.category"></el-input>
        </el-form-item>
      </el-form>
      <div v-if="autoM3UItem">
        <el-input
          type="textarea"
          :rows="2"
          v-model="autoM3UItem"
          readonly
        ></el-input>
        <el-button @click="copyToClipboard">复制到剪贴板</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取消</el-button>
        <el-button type="primary" @click="saveEdit">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      channelTemplate: {
        platform: '',
        uid: '',
        logo: '',
        name: '',
        category: ''
      },
      platforms: [
        {name: '斗鱼', key: 'douyu', platformFeatures: 'useId'},
        {name: 'BiliBili', key: 'bilibili', platformFeatures: 'useId'},
        {name: '虎牙', key: 'huya', platformFeatures: 'useId'},
        {name: 'YY', key: 'yy', platformFeatures: 'useId'},
        {name: '抖音', key: 'douyin', platformFeatures: 'useId'},
      ],
      useIdPlatforms: ['douyu', 'bilibili', 'huya', 'yy', 'douyin'],
      fullUrlPlatforms: [],
      channels: [],
      options: {
        ip: 'localhost',
      },
      m3uContent: '',
      dialogEditingChannel: {},
      isEditDialogVisible: false,
      currentEditIndex: -1
    };
  },
  computed: {
    autoM3uContent() {
      return this.generateM3U()
    },
    autoM3UItem() {
      return this.generateM3UItemPreview()
    }
  },
  methods: {
    async handleM3UUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        this.parseM3UContent(content);
      };

      reader.readAsText(file);
    },
    // parseM3UContent(content) {
    //   const lines = content.split("\n");
    //   const channels = [];

    //   for (let i = 0; i < lines.length; i++) {
    //     if (lines[i].startsWith("#EXTINF:")) {
    //         const nextLine = lines[i + 1];
    //         if (nextLine) {
    //             const logoMatch = lines[i].match(/tvg-logo="([^"]+)"/);
    //             const groupNameMatch = lines[i].match(/group-name="([^"]+)"/);
    //             // const nameMatch = lines[i].match(/,(.+)$/);
    //             const nameMatch = lines[i].match(/\,(.+)$/);
    //             console.log(nameMatch)
    //             channels.push({
    //                 logo: logoMatch ? logoMatch[1] : '',
    //                 name: nameMatch ? nameMatch[1] : '',
    //                 url: nextLine.trim(),
    //                 platform: 'custom',
    //                 category: groupNameMatch ? groupNameMatch[1] : ''
    //             });
    //             i++; // 跳过下一行，因为我们已经读取了它
    //         }
    //     }
    //   }

    //   this.channels = channels;
    //   this.saveM3UChannels();
    // },
    parseM3UContent(content) {
        const channels = [];
        // 定义一个正则表达式，它匹配所有需要的部分
        // const regex = /#EXTINF:.*?tvg-logo="([^"]+)?".*?group-title="([^"]+)?".*?,(.*?)\s*\n(https?:\/\/[^\s]+)/g;
        const regex = /#EXTINF:.*?(?:tvg-logo="([^"]+)")?.*?(?:group-title="([^"]+)")?.*?,(.*?)\s*\n(https?:\/\/[^\s]+)/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            channels.push({
                logo: match[1] ? match[1] : '',
                name: match[3] ? match[3].trim() : '',
                url: match[4] ? match[4].trim() : '',
                platform: 'custom',
                category: match[2] ? match[2] : '',
                uid: ''
            });
        }
        this.channels = channels;
        this.saveM3UChannels();
    },
    genericFormatter(row, column, cellValue) {
      const platform = this.platforms.find(p => p.key === cellValue);
      return platform ? platform.name : cellValue;
    },
    addNewChannel() {
      this.channels.push({ ...this.channelTemplate });
      this.saveM3UChannels()
    },
    removeChannel(index) {
      this.channels.splice(index, 1);
      this.saveM3UChannels()
    },
    generateM3U(channels = this.channels, useIdPlatforms = this.useIdPlatforms, options = this.options) {
      let content = '#EXTM3U\n';
      for (const channel of channels) {
        let url = '';
        if (useIdPlatforms.includes(channel.platform)) {
          url = `http://${options.ip || '<ip>'}:35455/${channel.platform}/${channel.uid || '<uid>'}`
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
        content += `#EXTINF:-1 tvg-logo="${channel.logo || '<logo>'}" group-title="${channel.category || '<category>'}",${channel.name || '<name>'}\n${url || '<url>'}\n`
      }
      return content
    },
    generateM3UItemPreview(channel = this.dialogEditingChannel, useIdPlatforms = this.useIdPlatforms, options = this.options) {
      let url = '';
      if (useIdPlatforms.includes(channel.platform)) {
        url = `http://${options.ip || '<ip>'}:35455/${channel.platform}/${channel.uid || '<uid>'}`
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
      return `#EXTINF:-1 tvg-logo="${channel.logo || '<logo>'}" group-title="${channel.category || '<category>'}",${channel.name || '<name>'}\n${url || '<url>'}`
    },
    updateM3U() {
      this.m3uContent = this.generateM3U();
    },
    downloadM3U() {
      const blob = new Blob([this.m3uContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'playlist.m3u';
      link.click();
    },
    copyToClipboard() {
      const textarea = document.createElement('textarea');
      textarea.value = this.m3uContent;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.$message.success('已复制到剪贴板');
    },
    editChannel(channel, index) {
      this.dialogEditingChannel = { ...channel } // 复制数据到临时变量
      this.currentEditIndex = index
      this.isEditDialogVisible = true // 显示编辑对话框
    },
    cancelEdit() {
      this.dialogEditingChannel = { ...this.channelTemplate }
      isEditDialogVisible = false
    },
    saveEdit() {
      // 更新 channels 数组中的数据
      this.$set(this.channels, this.currentEditIndex,{ ...this.dialogEditingChannel })
      // this.channels[this.currentEditIndex] = { ...this.dialogEditingChannel }
      this.dialogEditingChannel = { ...this.channelTemplate }
      this.saveM3UChannels()
      this.isEditDialogVisible = false // 关闭编辑对话框
    },
    deleteChannel(index) {
      this.channels.splice(index, 1)
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
    }
  },
  mounted() {
    this.getLocalStorageItemIfExists('m3u-channels',(res) => {
      this.channels = res
    })
  }
};
</script>
