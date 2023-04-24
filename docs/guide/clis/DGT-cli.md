发布一个脚手架，封装常用的项目架构。

今天开始搭建自己的脚手架了，这里开始记录一下踩坑的过程。这个系列将会分成极大部分进行更新，第一版本主要是基于脚手架基本的创建流程的介绍，一步一步创建属于自己的定制化的脚手架。下载所指向的仓库模板可以自己去定义。在第一个版本中没有实现高度定制化的功能。只能下载你在github私服里面写好的项目模板。第二个版本现在正在建设中，目标是实现高度定制化的脚手架，通过脚手架自定义生成你所选择的功能模块，比如typescript、babel、vuex、vue2、vue3、vite、axios、pinia等多项定制化功能自动进行项目框架的生成。第三个版本是在第二个版本中作进一步的丰富，将会加入我自己写好的指令库、UI组件库等功能。

先放项目npm地址: [https://www.npmjs.com/package/dgt-cli](https://www.npmjs.com/package/dgt-cli)

这是github脚手架的源码：[https://github.com/DGT18229282792/dgt-cli](https://github.com/DGT18229282792/dgt-cli)

这里先标明所用到的第三方库，chalk：终端文字颜色样式。path：路径模块。

fs-extra：文件模块。inquirer：用户交互模块。ora：输出动画模块。

项目最终的目录结构：

```plain
```
dgt-cli
├─ bin   ---存放入口文件
│  └─ enter.js
├─ interactives ---不同用户交互封装，可以自行进行扩展
│  ├─ isOverWrite.js ---处理是否重写同名文件夹
│  └─ selectVueType.js ---选择vue版本
├─ lib ---存放存放指令功能
│  └─ create.js ---command对应的 dgt-cli create 项目名
├─ package-lock.json
├─ package.json ---依赖
├─ README.md ---简介
└─ utils ---存放工具类
   ├─ download.js --- 下载git仓库到目录
   └─ oraClass.js ---动画类

```
```

第一步：

初始化项目基本结构，生成基本package.json文件：

```typescript
npm init -y
```
生成：
```typescript
{
  "name": "dgt-cli",
  "version": "1.0.0",
  "description": "我的第一个脚手架",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "DGT",
  "license": "ISC",
// 这里配置入口文件，并挂载命令到全局
  "bin": {
    "dgtCli":"bin/enter.js"
  }
}
```
在项目根目录下创建bin目录，在bin目录下面创建enter.js:
```typescript
#! /usr/bin/env node
// 表明当前环境是在node环境下运行
console.log('helloWorld')
```
第一行是为了指定当前的环境是node环境，必须要添加，不添加会报错。完成这一步后修改package.json指定入口文件，注意一定要用对象的形式，不然会报错。
第二步：

因为与用户进行交互需要用到comannd库，这里先安装一下：

```typescript
npm i commander
```
现在修改入口文件：Step2: version 方法可以配置版本信息提示
Step3: name 和 usage 方法分别配置 cli 名称和 --help 第一行提示

```typescript
#! /usr/bin/env node
// 表明当前环境是在node环境下运行
const program = require("commander"); // commander 来实现脚手架命令的配置

program.name("dgt-cli").usage(`<command> [option]`).version(`1.0.0`);
program.parse(process.argv); // process.argv 是 nodejs 提供的属性
console.log("helloWorld");
```

当运行dgt-cli create ***的时候会从enter.js开始，

```plain
#! /usr/bin/env node
// 表明当前环境是在node环境下运行
const program = require("commander"); // commander 来实现脚手架命令的配置
const chalk = require("chalk"); // chalk用美化终端命令的样式

program.name("dgt-cli").usage(`<command> [option]`);
program.version(`dgt-cli ${require("../package.json").version}`);
program
  .command("create <project-name>") // 增加创建指令
  .description("use dgt-cli create ** to create a new program") // 添加描述信息
  .option(
    "-f, --force",
    "overwrite target directory if it exists(如果目录存在，强制删除)"
  ) // 强制覆盖
  .action((projectName, cmd) => {
    // 处理用户输入create 指令附加的参数
    require("../lib/create")(projectName, cmd);
  });
program
  .command("config [value]") // config 命令
  .description("inspect and modify the config")
  .option("-g, --get <key>", "get value by key")
  .option("-s, --set <key> <value>", "set option[key] is value")
  .option("-d, --delete <key>", "delete option by key")
  .action((value, keys) => {
    // value 可以取到 [value] 值，keys会获取到命令参数
    console.log(value, keys);
  });
// 监听 --help 指令
program.on("--help", function () {
  // 前后两个空行调整格式，更舒适
  console.log();
  console.log(
    ` Run ${chalk.green(
      "dgt-cli <command> --help"
    )} for detailed usage of given command.`
  );
  console.log();
});

program.parse(process.argv); // process.argv 是 nodejs 提供的属性
```
可知这里注册了一个comannd指令，create。
现在进入到create方法里面看一看到底发生了什么？

```plain
/*
*@Description: 创建项目的方法
*@MethodAuthor:  DGT
*@ param: {
    programeName：项目名称,
    cmd:用户口令对象
}
*@ Date: @Date:2022-05-31 20:06:35
*/
const path = require("path"); // 路径模块
const fs = require("fs-extra"); // 文件读取操作
const chalk = require("chalk"); // 输出美化
const download = require("../utils/download"); //下载仓库代码
const oraClass = require("../utils/oraClass"); // 封装ora动画

const isOverwriteFun = require("../interactives/isOverWrite"); // 获取是否覆盖同名文件交互
const selectVueTypeFun = require("../interactives/selectVueType"); // 获取选择下载的对应的vue2还是vue3的模板仓库

const loadObj = new oraClass();
module.exports = async function (projectName, options) {
  // 获取当前工作目录
  const cwd = process.cwd();
  // 拼接得到项目目录
  const targetDirectory = path.join(cwd, projectName);
  // 判断目录是否存在
  if (fs.existsSync(targetDirectory)) {
    // 判断是否使用 --force 参数
    if (options.force) {
      // 删除重名目录(remove是个异步方法)
      await fs.remove(targetDirectory);
    } else {
      let isOverwrite = await isOverwriteFun();
      // 选择 Cancel
      if (!isOverwrite) {
        console.log("Cancel");
        return;
      } else {
        // 选择 Overwirte ，先删除掉原有重名目录
        loadObj.start("removing origin file...");
        await fs.remove(targetDirectory);
        loadObj.sucess("removing origin file success!");
      }
    }
  }
  let vue_version = await selectVueTypeFun(); // 获取对应的仓库模板
  download(`${returnRightUrl(vue_version)}`, projectName,tips);
};
/*
 *@Description: 根据用户输入返回对应的项目模板地址
 *@MethodAuthor:  DGT
 *@ param: {type:vue版本}
 *@ Date: @Date:2022-06-01 15:24:46
 */
const returnRightUrl = (type) => {
  const urlMap = new Map();
  urlMap
    .set("v2", "github:DGT18229282792/npm-auto-loader")
    .set("v3", "github:DGT18229282792/monitor-sdk");
  return urlMap.get(type);
}
/*
*@Description: 下载成功提示开启项目
*@MethodAuthor:  DGT
*@ param: {}
*@ Date: @Date:2022-06-02 23:22:27
*/
const tips = (projectName) =>{
  console.log(``)
  console.log(`${chalk.green(`cd ${projectName}`)}`)
  console.log(`${chalk.green(`npm install`)}`)
  console.log(`${chalk.green(`npm run serve`)}`)
  console.log(``)
}
```
首先获取当前的工作目录，然后拼接得到项目的目录。然后判断有没有同名的文件夹存在。如果有的话就调用是否覆盖删除同名文件夹方法。然后弹出vue模板选择交互。获取到用户所选择的你事先写好的vue版本。最后调用我们的下载方法进行下载git仓库的项目到我们对应的文件夹中。到这里create指令就结束了。
我们就能够指定git仓库，然后让用户自己选择然后进行下载模板。

最后一步是发布到npm。

终端登录你的npm账号。执行npm login按照提示进行输入。登录成功后。进行版本的配置。输入npm version 1.0.0指定你的脚手架的第一个版本号。然后执行npm publish进行发布。最后你再登录npm官网，在你的主页就可以看到你刚刚上传的这个脚手架了。

其他人使用起来也特别简单。只需要安装npm i dgt-cli就可以了。

