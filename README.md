# ****-phoenix 移动端H5

该项目主要以 [UMI](https://umijs.org/zh/) + [DVA](https://dvajs.com/) 为底层框架，支持 [TypeScript](https://zhongsp.gitbooks.io/typescript-handbook/)，以[Ant Design Mobile](https://mobile.ant.design/)为 UI 组件库。

## 目录结构

    |-- config                                # umi 配置，包含路由，构建等配置
    |-- mock                                  # 本地模拟数据
    |-- public                                
    |   |-- favicon.png                       # favicon
    |-- src                                   # 
    |   |-- assets                            # 本地静态资源
    |   |-- components                        # 业务通用组件
    |   |-- layout                            # 通用布局
    |   |-- models                            # 全局 dva model
    |   |-- services                          # 后台接口服务
    |   |-- pages                             # 业务页面入口和常用模板
    |   |-- e2e                               # 集成测试用例
    |   |-- global.less                       # 全局样式
    |   |-- global.js                         # 全局 JS
    |   |-- theme.js                          
    |-- tests                                 # 测试工具
    |-- .gitignore                            # git忽略文件
    |-- .editorconfig                         # 编辑器代码风格配置
    |-- .eslintignore                         # eslint忽略文件
    |-- .eslintrc                             # eslint规则
    |-- .prettierignore                       # 代码风格配置忽略文件
    |-- .prettierrc                           # 代码风格配置文件
    |-- .stylelintrc                          # 样式风格配置文件
    |-- package.json                          
    |-- README.md                              

## 快速开始

```
1. 安装nodejs，配置cnpm
2. `git clone` ****
3. `cd` hsjry-guard
4. `cnpm install`
5. 运行
    - mock优先 `npm start`
    - 不用mock `npm run start:no-mock`
6. 浏览器打开 http://localhost:8000
```

## 编码规范
1. 使用 `VS Code` 编辑器，安装ESLint代码检查工具
2. 不要引入jQuery
3. class组件名和文件名一致，大写开头
4. js代码使用单引号，dom属性使用双引号
5. 一个文件只包含一个组件，子组件另写一个文件
6. 在src/services里对接后端接口，不写逻辑
7. 采用局部loading，表格加载以及表单提交按钮需要加loading状态
8. 待补充

更多命令可在[package.json](./package.json)中查看



## 样式

使用less作为样式语言，在使用期前，可以了解一下less的相关特性。[Less](http://lesscss.org/)

为了避免样式的全局污染和多人开发带来的命名冲突，推荐使用Css modules模块化方案。 [Css Modules](https://github.com/camsong/blog/issues/5)
严格区分全局样式，局部样式，以及组件库样式覆盖。

## 业务图标库
使用阿里 [iconfont](http://iconfont.cn/)  图标库，在这里创建项目，Font class方式使用。开发阶段可以使用在线链接，发布时候采用，将源文件下载至本地。/src/public/iconfont 目录下。

本初始化工程已将<b>[Ant Design 官方图标库](https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.de12df413&cid=9402)</b>下载至本地

1:在 /src/pages/document.ejs 引入iconfont目录下css文件(在线链接)。

```
//at.alicdn.com/t/font_405362_lyhvoky9rc7ynwmi.css
<link href="/iconfont/iconfont.css" rel="stylesheet" />
```

2: 在 /src/components简单封装了图标组件，你可以这样使用

```
import BizIcon from '../BizIcon'
<BizIcon type="xxx" />
```

## 移动端滚动问题

避免使用 外层容器设置overflow:hidden模拟的滚动，在ios下会很卡顿，加了-webkit-overflow-scrolling : touch；之后，会引起更多的问题。详情请看这里 [深入研究-webkit-overflow-scrolling:touch以及ios滚动](https://www.cnblogs.com/xiahj/p/8036419.html)

正确的姿势：
1. 通过布局技巧，使用body滚动。如本项目中，我对tabBar组件嵌套路由的处理。
2. 封装滚动容器实现局部滚动。目前封装了 [better-scroll](https://github.com/ustbhuangyi/better-scroll)

<b>更多信息请参考文档 [Ant Design Mobile](https://mobile.ant.design/index-cn)。</b>




| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br> iOS Safari | [<img src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=356c6916013387449cc5287a6934bec4/d53f8794a4c27d1e11530c8216d5ad6eddc4387a.jpg" alt="Android" width="24px" height="24px" />](https://developer.android.com/)</br> Android 
| --------- | --------- |
| iOS Safari | Android 4.0+ |
