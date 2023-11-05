<template>
  <div>
    <textarea v-model="icalInput" placeholder="Paste iCal content here"></textarea>
    <button @click="convertToEPG">Convert to EPG</button>
    <textarea v-model="epgOutput" readonly></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icalInput: '',
      epgOutput: ''
    };
  },
  methods: {
    convertToEPG() {
      // 这里是一个简化的 iCal 到 EPG 的转换，实际应用中可能需要更复杂的解析和处理
      const lines = this.icalInput.split('\n');
      let eventId, start, end, summary;

      lines.forEach(line => {
        if (line.startsWith('UID:')) {
          eventId = line.split('UID:')[1].trim();
        } else if (line.startsWith('DTSTART:')) {
          start = line.split('DTSTART:')[1].trim();
        } else if (line.startsWith('DTEND:')) {
          end = line.split('DTEND:')[1].trim();
        } else if (line.startsWith('SUMMARY:')) {
          summary = line.split('SUMMARY:')[1].trim();
        }
      });

      this.epgOutput = `<tv>
  <channel id="${eventId}">
    <display-name>${summary}</display-name>
  </channel>
  <programme start="${start}" stop="${end}" channel="${eventId}">
    <title>${summary}</title>
  </programme>
</tv>`;
    }
  }
};
</script>

<style scoped>
/* 样式可以根据需要进行调整 */
textarea {
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
}
</style>
