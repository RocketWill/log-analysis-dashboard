# Log Analysis Dashboard
本项目基於 [Ant Design Pro](https://pro.ant.design) 进行开发。
1. 介绍：
Ant Design 是一套由蚂蚁金服所开源出来的 UI Library，但它跟其他套不同的点在于它不只是一套 UI Library，还提供了一些设计语言（Design Language）。优点是给出一份指南，指导开发者遇到什么情形的时候应该怎么做，以及每个设计背后代表的意义。
2. 优点
    - 支援各种常用组件，连很不常见的都有
    - 有提供 React 组件，使用起来较方便
    - Table 功能强大，支援分页丶筛选跟排序
    - 中英文文件齐全
    - 由蚂蚁金服维护，更新频繁稳定度高

## 环境准备

安装依赖 `node_modules`:

```bash
yarn install
```
若安装失败，请尝试升级 node 版本 (此 project 使用 v10.16.3)

### 启动项目

```bash
yarn start
```

### Build 项目

```bash
yarn run build
```
## 效果图
![demo img](https://raw.githubusercontent.com/RocketWill/log-analysis-dashboard/master/images/demo.png)

## 设计与实现
Ant Design Pro 是基於 [Umi.js](https://www.umijs.org/)，umi 以路由为基础，支持类 next.js 的约定式路由，以及各种进阶的路由功能，并以此进行功能扩展，比如支持路由级的按需加载。然后配以完善的插件体系，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求。
### dva 数据流：
dva 是基于 react+redux 最佳实践上实现的封装方案，简化了redux和redux-saga使用上的许多复杂操作。Redux 是一个简易的状态容器，它管理整个应用的状态。用户无法直接透过 setter 改变资料，必须透过 action 和 reducers 来得到新资料。
- 数据流向：数据的改变发生是通过：用户交互行为（用户点击按钮等）丶浏览器行为（如路由跳转等）触发的。当此类行为会改变数据的时候可以通过 dispatch 发起一个 action，action可分为同步和异步：
    - 同步行为会直接通过 reducers 改变 state ，
    - 异步行为会先触发 effects 然后流向 reducers     最终改变 state。通过api获取数据库资料都是使用异步更新（目前使用 mock 模拟 api 数据获取）。
- 数据状态更新步骤：用户点击按钮或是路由跳转 → 触发dispatch → 发起一个action → 通过reducers改变state数据状态 → 更新前端展示  
![dva data flow img](https://raw.githubusercontent.com/RocketWill/log-analysis-dashboard/master/images/dva_data_flow.png)
- dva 结构 (以 dashboard/log-analysis 为例)  
![dva structure img](https://raw.githubusercontent.com/RocketWill/log-analysis-dashboard/master/images/dva_structure.png)
    - index.tsx 为 react 入口文件，包含系统级组件（Sankey, Sactterplot）丶用户级组件（Calendar, Reportable Events, radar, Behavior2vec, 以及 Parallel）和通用组件（Filter）
    - model.tsx 包含 state丶reducers丶effects。
        -  state：用於保存数据状态
        -  reducers：包含 3 个 reducers，”clear” 用于清除所有数据状态；”setOptions”用于设置用户指定的筛选条件（日期丶指定之用户等）；save 用於将 effect 请求结果更新至 state。
        -  effect：用於异步获取数据
    - service.tsx 为服务端接口，目前使用 mock 模拟接口
### 约定式路由
类 next.js 的约定式路由，无需维护冗余的路由配置，支持权限丶动态路由丶嵌套路由等等。
- 路由配置文件统一写在主目录下的 config/config.js