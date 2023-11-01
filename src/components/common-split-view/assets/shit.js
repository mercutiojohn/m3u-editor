resizeViewItems(index, delta) {
    let totalSize = 0
    let totalSizePlusOne = 0
    this.containerWidth = this.$refs.container.clientWidth ? this.$refs.container.clientWidth : 0.001; // 获取 split-view-container 元素的宽度
    this.containerHeight = this.$refs.container.clientHeight ? this.$refs.container.clientHeight : 0.001; // 获取 split-view-container 元素的宽度
    switch (this.direction) {
      case 'vertical':
        totalSize = this.containerHeight; // 总宽度为 split-view-container 的宽度
        totalSizePlusOne = this.containerHeight; // 总宽度为 split-view-container 的宽度
        break;
      case 'horizontal':
        totalSize = this.containerWidth; // 总宽度为 split-view-container 的宽度
        totalSizePlusOne = this.containerWidth; // 总宽度为 split-view-container 的宽度
        break;
      default:
        break;
    }
    for(let i = 0; i < this.fields.length - 1; i++) {
      if (i !== index) totalSize -= (getCalcResult(this.fields[i].initSize) ? getCalcResult(this.fields[i].initSize) : 0);
      if (i !== (index + 1)) totalSizePlusOne -= (getCalcResult(this.fields[i].initSize) ? getCalcResult(this.fields[i].initSize) : 0);
      // console.log('[SplitView] for', (i !== index) ? index + ' ' + (getCalcResult(this.fields[i].initSize) ? getCalcResult(this.fields[i].initSize) : 0) : '', 'total size: ' + totalSize, (i !== (index + 1)) ? (index + 1) + ' ' + (getCalcResult(this.fields[i].initSize) ? getCalcResult(this.fields[i].initSize) : 0) : '', 'total size plus one: ' + totalSizePlusOne)
    }
    // 调整视图项的大小
    if (delta < 0) {
    if (this.fields[index].size > (getCalcResult(this.fields[index].initMinSize) ? getCalcResult(this.fields[index].initMinSize) : 1) && this.fields[index + 1].size < (getCalcResult(this.fields[index + 1].initMaxSize) ? getCalcResult(this.fields[index + 1].initMaxSize) : (totalSizePlusOne - 1))) {
      // console.log('[SplitView]', 'resizeViewItems - delta < 0', index, delta, 'this.fields[index].size', this.fields[index].size, 'totalSize', totalSize, 'this.fields[index + 1].size', this.fields[index + 1].size, 'totalSizePlusOne', totalSizePlusOne)
      this.fields[index].size += delta;
      if (this.fields[index + 1]) {
        this.fields[index + 1].size -= delta;
      } else {
        if (this.direction === 'horizontal') {
          this.fields[index - 1].size -= delta;
        }
      }
    } else {
      // console.log('[SplitView]', 'resizeViewItems - delta < 0 - not satistied', index, delta, 'this.fields[index].size', this.fields[index].size, 'totalSize', totalSize, 'this.fields[index + 1].size', this.fields[index + 1].size, 'totalSizePlusOne', totalSizePlusOne)
      this.fields[index].size += 1
      if (this.fields[index + 1]) {
        this.fields[index + 1].size -= 1;
      } else {
        if (this.direction === 'horizontal') {
          this.fields[index - 1].size -= 1;
        }
      }
    }
    } else if (delta > 0) {
    if (this.fields[index].size < (getCalcResult(this.fields[index].initMaxSize) ? getCalcResult(this.fields[index].initMaxSize) : (totalSize - 1)) && this.fields[index + 1].size > (getCalcResult(this.fields[index + 1].initMinSize) ? getCalcResult(this.fields[index + 1].initMinSize) : 1)) {
      // console.log('[SplitView]', 'resizeViewItems - delta > 0', index, delta, 'this.fields[index].size', this.fields[index].size, 'totalSize', totalSize, 'this.fields[index + 1].size', this.fields[index + 1].size, 'totalSizePlusOne', totalSizePlusOne)
      this.fields[index].size += delta;
      if (this.fields[index + 1]) {
        this.fields[index + 1].size -= delta;
      } else {
        if (this.direction === 'horizontal') {
          this.fields[index - 1].size -= delta;
        }
      }
    } else {
      // console.log('[SplitView]', 'resizeViewItems - delta > 0 - not satistied', index, delta, 'this.fields[index].size', this.fields[index].size, 'totalSize', totalSize, 'this.fields[index + 1].size', this.fields[index + 1].size, 'totalSizePlusOne', totalSizePlusOne)
      this.fields[index].size += -1
      if (this.fields[index + 1]) {
        this.fields[index + 1].size -= -1;
      } else {
        if (this.direction === 'horizontal') {
          this.fields[index - 1].size -= -1;
        }
      }
    }
    }
    this.updateSashPositions();
  },