# alimama-cli
阿里妈妈脚手架CLI工具

## 使用方法：

全局安装cli工具：

    npm install -g alimama-cli

请先到gitlab上创建项目的仓库，然后执行:

    mama init [--n=cnpm]

输入你的项目名，以及在gitlab上创建好的仓库git地址，即可完成项目的初始化
【初始化过程会执行 npm install安装包，支持配置--n=cnpm换成cnpm install】


### [updated 2016.10.14]
  + 增加支持命令

运行本地服务器，默认端口3000

    mama dev

daily分支发布到日常 [powerd by alimama-deploy]

    mama daily

master发布到cdn生产环境 [powerd by alimama-deploy]

    mama publish

辅助生成预设的view文件，包含view.html, view.js

    mama view
