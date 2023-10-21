# SplitView-Vue

A flexible component for dividing and managing content in a resizable split view layout.

Effortlessly organize and resize your content with SplitView.

Can be split vertically or horizontally.

Built with Vue 2.

# todos

* [ ] 展开收起
* [ ] 预设宽度/高度
* [ ] 持久化
* [ ] 传参 / slot 切换
* [ ] 可拖拽
* [ ] 跨板块拖拽

# SplitView Component

The SplitView component is a Vue.js component that allows you to create a split view layout with resizable panels.

## Usage

1. Install the SplitView component using npm or yarn:

```bash
npm install split-view-component
```

2. Import the SplitView component in your Vue.js application:

```javascript
import SplitView from 'split-view-component';
```

3. Use the SplitView component in your Vue.js template:

```html
<template>
  <SplitView direction="vertical">
    <div>
      <!-- Content for the first panel -->
    </div>
    <div>
      <!-- Content for the second panel -->
    </div>
  </SplitView>
</template>
```

## Props

The SplitView component accepts the following props:

- `direction` (String, default: 'vertical'): Specifies the direction of the split view layout. Possible values are 'vertical' and 'horizontal'.

## Events

The SplitView component emits the following events:

- `splitView.addField(field)`: This event is emitted when a new field is added to the split view. The `field` parameter contains information about the added field.
- `splitView.removeField(field)`: This event is emitted when a field is removed from the split view. The `field` parameter contains information about the removed field.
- `splitView.startDrag(field, event, itemId)`: This event is emitted when the drag operation starts on a field. The `field` parameter contains information about the field being dragged, the `event` parameter contains the drag event, and the `itemId` parameter contains the ID of the field.
- `splitView.dragOver(field, event, targetItemId)`: This event is emitted when a field is being dragged over another field. The `field` parameter contains information about the field being dragged, the `event` parameter contains the drag event, and the `targetItemId` parameter contains the ID of the target field.
- `splitView.drop(field, event, targetItemId)`: This event is emitted when a field is dropped onto another field. The `field` parameter contains information about the field being dragged, the `event` parameter contains the drop event, and the `targetItemId` parameter contains the ID of the target field.
- `splitView.dragLeave(field, event, targetItemId)`: This event is emitted when a field is dragged out of another field. The `field` parameter contains information about the field being dragged, the `event` parameter contains the drag event, and the `targetItemId` parameter contains the ID of the target field.
- `splitView.dragEnd(field, event, targetItemId)`: This event is emitted when the drag operation ends on a field. The `field` parameter contains information about the field being dragged, the `event` parameter contains the drag event, and the `targetItemId` parameter contains the ID of the target field.

## Methods

The SplitView component provides the following methods:

- `addField(field)`: Adds a new field to the split view. The `field` parameter contains information about the field to be added.
- `removeField(field)`: Removes a field from the split view. The `field` parameter contains information about the field to be removed.
- `startDrag(field, event, itemId)`: Starts the drag operation on a field. The `field` parameter contains information about the field being dragged, the `event` parameter contains the drag event, and the `itemId` parameter contains the ID of the field.
- `dragOver(field, event, targetItemId)`: Handles the drag over event on a field. The `field` parameter contains information about the field being dragged, the `event` parameter contains the drag event, and the `targetItemId` parameter contains the ID of the target field.
- `drop(field, event, targetItemId)`: Handles the drop event on a field. The `field` parameter contains information about the field being dragged, the `event` parameter contains the drop event, and the `targetItemId` parameter contains the ID of the target field.
- `dragLeave(field, event, targetItemId)`: Handles the drag leave event on a field. The `field` parameter contains information about the field being dragged, the `event` parameter contains the drag event, and the `targetItemId` parameter contains the ID of the target field.
- `dragEnd(field, event, targetItemId)`: Handles the drag end event on a field. The `field` parameter contains information about the field being dragged, the `event` parameter contains the drag event, and the `targetItemId` parameter contains the ID of the target field.

## License

This component is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
