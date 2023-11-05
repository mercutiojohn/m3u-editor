import Vue from 'vue'

// Element UI
import ElementUI from 'element-ui';
// Vue.prototype.$ELEMENT = { size: 'mini', zIndex: 3000 };
// import 'element-ui/lib/theme-chalk/index.css'; // 已在 @/style.scss 中引入 el-index.scss，其中包含此内容
Vue.use(ElementUI, { size: 'mini', zIndex: 3000 });

// Axios
import axios from 'axios'
Vue.prototype.$axios = axios;