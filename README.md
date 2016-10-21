# alimama-cli
阿里妈妈脚手架CLI工具

## 使用方法：

全局安装cli工具：

    npm install -g alimama-cli

在使用工具前请先做好几个准备工作

  + 到gitlab上创建项目相应的仓库 ([Gitlab](http://gitlab.alibaba-inc.com))
  + 到rap上创建相应的项目 ([RAP](http://rap.alibaba-inc.com))

然后在你的工作目录执行

    mama init

  + 输入你的项目名称（这个名称会作为你的项目文件夹名）
  + 输入你在gitlab创建好的项目的仓库地址
  + 输入你在RAP上创建好的项目的projectId

系统会自动从[scaffold](http://gitlab.alibaba-inc.com/thx/scaffold)脚手架仓库`clone`代码到你的本地，并且设置`git remote`为你在gitlab上创建的项目，并且`npm install`所有的工具包，你可以指定 `mama init --n=cnpm` 来更改为`cnpm install`避免被墙

  ![mama init](https://img.alicdn.com/tps/TB1LmWvNVXXXXc2XVXXXXXXXXXX-473-145.jpg)

### [updated 2016.10.14]
  + 增加支持命令

运行本地服务器，默认端口3000

    mama dev

daily分支发布到日常 `powerd by alimama-deploy`

    mama daily

master发布到cdn生产环境 `powerd by alimama-deploy`

    mama publish

辅助生成预设的view文件，包含view.html, view.js

    mama view
