

// const context = require.context('../components/', true, /\.vue$/);
// const install = (Vue) => {
//   context.keys().forEach((key) => {
//     const component = context(key).default;
//     Vue.component(component.name, component);
//   });
// };

const modules = import.meta.glob('../components/*.vue');

const install = async (Vue) => {
  for (const path in modules) {
    if (Object.hasOwnProperty.call(modules, path)) {
      const component = await modules[path]();
      // console.log('[DataFlow] installComponent',component)
      Vue.component(component.default.name, component.default);
    }
  }
};

const installComponents = (Vue) => {
  return new Promise((resolve) => {
    install(Vue).then(() => {
      resolve();
    });
  });
};


export default installComponents

// import list from '../work/components.json'
// var result = (()=> {
//     let component = {};
//     for (let i = 0; i < list.length; i++) {
//         let com, path;
//         com = list[i]
//         path = com['urlPath'].substring(4,com['urlPath'].length)
//         component[com.tag] = ()=>import(`@/${path}`)
//     }
//     return component

// })()// Execute instantly
// export default result