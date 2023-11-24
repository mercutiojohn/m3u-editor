import fieldTemplate from '../utils/init/fieldTemplate'

export default {
  data() {
    return {
      fieldTemplate
    }
  },
  methods: {
    addField() {
      this.coreData.fieldList.push({
        ...this.fieldTemplate,
        name:  `${this.fieldTemplate.name}_${Date.now()}`,
        field: `${this.fieldTemplate.field}_${Date.now()}`,
        id: Date.now()
      });
    },

    moveUp(index) {
      if (index > 0) {
        const temp = this.coreData.fieldList[index];
        this.coreData.fieldList.splice(index, 1);
        this.coreData.fieldList.splice(index - 1, 0, temp);
      }
    },

    moveDown(index) {
      if (index < this.coreData.fieldList.length - 1) {
        const temp = this.coreData.fieldList[index];
        this.coreData.fieldList.splice(index, 1);
        this.coreData.fieldList.splice(index + 1, 0, temp);
      }
    },

    deleteField(index) {
      this.coreData.fieldList.splice(index, 1);
    }
  }
}