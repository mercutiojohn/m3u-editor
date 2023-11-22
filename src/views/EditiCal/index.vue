<template>
  <div>
    <el-button type="primary">
      <label for="ics-upload">
        选择 iCal 文件
        <input type="file" id="ics-upload" @change="handleICSUpload" style="display: none;" accept=".ics"/>
      </label>
    </el-button>

    <el-table :data="events" style="width: 100%">
      <el-table-column prop="summary" label="事件标题"></el-table-column>
      <el-table-column prop="start" label="开始时间"></el-table-column>
      <el-table-column prop="end" label="结束时间"></el-table-column>
      <el-table-column prop="event" label="event" show-overflow-tooltip>
        <template slot-scope="scope">
            <code>{{ JSON.stringify(scope.row.event, null, 2) }}</code>
          </template>
      </el-table-column>
        <template slot-scope="scope">
            <code>{{ JSON.stringify(scope.row.e, null, 2) }}</code>
          </template>
      </el-table-column>
      <el-table-column
        label="操作"
        @click.native.prevent="editEvent(scope.row)">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ical from 'ical.js';

export default {
  data() {
    return {
      events: []
    };
  },
  methods: {
    handleICSUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        this.icalData = data;
        this.parseIcalData(data);
      };

      reader.readAsText(file);
    },
    parseIcalData(data) {
      // 使用 ical.js 解析 iCal 数据
      const jcalData = ical.parse(data);
      const comp = new ical.Component(jcalData);
      const events = comp.getAllSubcomponents('vevent');

      this.events = events.map(event => {
        const e = new ical.Event(event)
        const res = {
          summary: e.summary,
          start: e.startDate.toJSDate(),
          end: e.endDate.toJSDate(),
          event: event,
          e: e
        }
        console.log(event, e, res)
        return res
      });
    },
    editEvent(event) {
      // 编辑事件的逻辑
      console.log('编辑事件: ', event);
    }
  }
};
</script>
