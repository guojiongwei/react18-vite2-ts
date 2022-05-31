# 搭建 react18+vite2+ts+eslint+prettier+husky+lint-staged+commitlint 开发环境

## 目录

1.  前言
2.  代码规范技术栈
3.  创建**react18**+**vite2**+**ts**项目
4.  **editorconfig**统一编辑器配置
5.  **prettier**自动格式化代码
6.  **eslint**+**lint-staged**检测代码
7.  使用**tsc**检测类型和报错
8.  代码提交时使用**husky**检测代码语法规范
9.  代码提交时使用**husky**检测**commit**备注规范
10. 配置**commitizen**方便添加**commit**辅助备注信息
11. 总结

## 一. 前言

在前端项目工程日益复杂的今天，一套完善的开发环境配置可以极大的提升开发效率，提高代码质量，方便多人合作，以及后期的项目迭代和维护，项目规范分项目**目录结构规范**，**代码格式规范**和**git 提交规范**，本文主要讲后两种。

## 二. 代码规范技术栈

### 2.1 代码格式规范和语法检测

1.  [vscode](http://vscode.bianjiqi.net/)：统一前端编辑器。
2.  [editorconfig](https://editorconfig.org/): 统一团队 vscode 编辑器默认配置。
3.  [prettier](https://www.prettier.cn/): 保存文件自动格式化代码。
4.  [eslint](https://eslint.bootcss.com/): 检测代码语法规范和错误。
5.  [lint-staged](https://github.com/okonet/lint-staged): 只检测暂存区文件代码，优化 eslint 检测速度。

### 2.2 代码 git 提交规范

1.  [husky](https://github.com/typicode/husky):可以监听[githooks](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)执行，在对应 hook 执行阶段做一些处理的操作。
1.  [pre-commit](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)：githooks 之一， 在 commit 提交前使用 tsc 和 eslint 对语法进行检测。
1.  [commit-msg](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)：githooks 之一，在 commit 提交前对 commit 备注信息进行检测。
1.  [commitlint](https://commitlint.js.org/#/)：在 githooks 的 pre-commit 阶段对 commit 备注信息进行检测。
1.  [commitizen](https://github.com/commitizen/cz-cli)：git 的规范化提交工具，辅助填写 commit 信息。

## 三. 创建**react18**+**vite2**+**ts**项目

创建项目使用**vite**官网[搭建第一个 vite 项目](https://vitejs.cn/guide/#scaffolding-your-first-vite-project)，因为要创建的是**react+ts**项目，执行命令

```sh
# pnpm 如未安装pnpm, 要先 npm i pnpm -g 安装
pnpm create vite my-react-app -- --template react-ts
```

执行完成后的会在目录下创建**my-react-app**项目，提示依次执行命令，来启动项目。

```sh
cd my-react-app
pnpm i
pnpm run dev
```

项目默认是运行在<http://localhost:3000> 地址，启动成功后在浏览器打开。

## 四. editorconfig 统一编辑器配置

由于每个人的**vsocde**编辑器默认配置可能不一样，比如有的默认缩进是**4**个空格，有的是**2**个空格，如果自己编辑器和项目代码缩进不一样，会给开发和项目代码规范带来一定影响，所以需要在项目中为编辑器配置下格式。

### 4.1 安装 vscode 插件 EditorConfig

打开**vsocde**插件商店，搜索**EditorConfig for VS Code**，然后进行安装。

![WX20220521-120407@2x.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b0825f69f974600a567cb43ff0fc595~tplv-k3u1fbpfcp-watermark.image?)

### 4.2 添加.editorconfig 配置文件

安装插件后，在根目录新增 **\.editorconfig**配置文件:

```sh
root = true # 控制配置文件 .editorconfig 是否生效的字段
​
[**] # 匹配全部文件
indent_style = space # 缩进风格，可选space｜tab
indent_size = 2 # 缩进的空格数
charset = utf-8 # 设置字符集
trim_trailing_whitespace = true # 删除一行中的前后空格
insert_final_newline = true # 设为true表示使文件以一个空白行结尾
end_of_line = lf
​
[**.md] # 匹配md文件
trim_trailing_whitespace = false
```

上面的配置可以规范本项目中文件的缩进风格，和缩进空格数等，会覆盖**vscode**的配置，来达到不同编辑器中代码默认行为一致的作用。

## 五. prettier 自动格式化代码

每个人写代码的风格习惯不一样，比如代码换行，结尾是否带分号，单双引号，缩进等，而且不能只靠口头规范来约束，项目紧急的时候可能会不太注意代码格式，这时候需要有工具来帮我们自动格式化代码，而**prettier**就是帮我们做这件事的。

### 5.1 安装 vscode 插件 Prettier

打开**vsocde**插件商店，搜索**Prettier - Code formatter**，然后进行安装。

![WX20220521-120510@2x.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3fbc9f8edae4043a902c38580405afb~tplv-k3u1fbpfcp-watermark.image?)

### 5.2 添加.prettierrc.js 配置文件

安装插件后，在根目录新增 **.prettierrc.js**配置文件，配置内容如下：

```js
module.exports = {
  printWidth: 100, // 一行的字符数，如果超过会进行换行
  tabWidth: 2, // 一个tab代表几个空格数，默认就是2
  useTabs: false, // 是否启用tab取代空格符缩进，.editorconfig设置空格缩进，所以设置为false
  semi: false, // 行尾是否使用分号，默认为true
  singleQuote: true, // 字符串是否使用单引号
  trailingComma: 'none', // 对象或数组末尾是否添加逗号 none| es5| all
  jsxSingleQuote: true, // 在jsx里是否使用单引号，你看着办
  bracketSpacing: true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  arrowParens: 'avoid' // 箭头函数如果只有一个参数则省略括号
}
```

各个字段配置就是后面注释中的说明

### 5.3 添加.vscode/settings.json

配置前两步后，虽然已经配置**prettier**格式化规则，但还需要让**vscode**来支持保存后触发格式化

在项目根目录新建 **.vscode**文件夹，内部新建**settings.json**文件配置文件，内容如下：

```json
{
  "search.exclude": {
    "/node_modules": true,
    "dist": true,
    "pnpm-lock.sh": true
  },
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "liveServer.settings.port": 5502
}
```

先配置了忽略哪些文件不进行格式化，又添加了保存代码后触发格式化代码配置，以及各类型文件格式化使用的格式。

这一步配置完成后，修改项目代码，把格式打乱，点击保存时就会看到编辑器自动把代码格式规范化了。

## 六. eslint+lint-staged 检测代码

### 6.1 安装 vscode 插件 ESLint

打开**vsocde**插件商店，搜索**ESLint**，然后进行安装。

![WX20220521-120553@2x.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab70fe4c4dc441189ba6708aa3252d29~tplv-k3u1fbpfcp-watermark.image?)

### 6.2 安装 eslint 依赖

```js
pnpm i eslint -D
```

### 6.3 配置.eslintrc.js 文件

安装**eslint**后，执行**pnpm init @eslint/config**，选择自己需要的配置

![WX20220521-120554@2x.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6e563a56a7a4948a2897d9beec93e93~tplv-k3u1fbpfcp-watermark.image?)

这里我们选择了

- 使用**eslint**检测并问题
- 项目使用的模块规范是**es module**
- 使用的框架是**react**
- 使用了**typescript**
- 代码选择运行在浏览器端
- **eslint**配置文件使用**js**格式
- 是否现在安装相关依赖，选择是
- 使用**pnpm**包管理器安装依赖

选择完成后会在根目录下生成 **.eslint.js**文件，默认配置如下

```js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {}
}
```

### 6.4 解决当前项目 eslint 语法错误

此时**eslint**基础配置就已经配置好了，此时要解决出现的几个小问题：

1.  看**App.tsx**页面会发现**jsx**部分有红色报红，提示 **'React' must be in scope when using JSX**

![微信截图_20220519144612.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1ec998a85bc459c8a6acd3f8588abfa~tplv-k3u1fbpfcp-watermark.image?)

这是因为**React18**版本中使用**jsx**语法不需要再引入**React**了，根据[eslint-react-plugin](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md)中的说明，如果使用了**react17**版本以上，不需要在使用**jsx**页面引入**React**时，在**eslint**配置文件 **.eslint.js**的**extends**字段添加插件**plugin:react/jsx-runtime**。

```js
 extends: [
   'eslint:recommended',
   'plugin:react/recommended',
   'plugin:@typescript-eslint/recommended',
   'plugin:react/jsx-runtime'
 ],
```

此时**App.tsx**和**main.tsx**就不会报错了。

2.  看到**main.tsx**文件带有警告颜色，看警告提示是**Forbidden non-null assertion**。

![微信截图_20220519145721.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f54f46ee579f495fa1b560566058380b~tplv-k3u1fbpfcp-watermark.image?)

这个提示是不允许使用非空操作符!，但实际在项目中经常会用到，所以可以把该项校验给关闭掉。

在**eslint**配置文件 **.eslint.js**的**rules**字段添加插件 **'@typescript-eslint/no-non-null-assertion': 'off'**。

```js
 rules: {
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
```

然后就不会报警告了，如果为了避免代码出现异常，不想关闭该校验，可以提前做判断

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
​
const root = document.getElementById('root')
// 如果root有值，才执行react渲染逻辑
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
```

3.  **.eslintec.js**文件也有红色报错，报错是 **'module' is not defined**.

![微信截图_20220519150735.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c17be49ede3d45d085d13404739ee763~tplv-k3u1fbpfcp-watermark.image?)

这个是因为上面选择的浏览器环境，配置文件的**module.exports**需要**node**环境，需要在**eslint**的**env**环境配置中添加支持**node**环境

```js
  env: {
    browser: true,
    es2021: true,
    node: true
  },
```

到这一步项目目前就没有报错了，在页面里面如果有定义了但未使用的变量，会有**eslint**的标黄效果提示，如果有语法问题也会警告或者报错提示，等后面出现了其他问题再按照情况进行修复或者调整**eslint**配置。

### 6.5 添加 eslint 语法检测脚本

前面的**eslint**报错和警告都是我们用眼睛看到的，有时候需要通过脚本执行能检测出来，在**package.json**的**scripts**中新增

```bash
"eslint": "eslint src/**/*.{ts,tsx}"
```

代表检测**src**目录下以**.ts**,**.tsx**为后缀的文件，然后在**main.tsx**里面定义一个未使用的变量**a**

![微信截图_20220519150745.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d59038557f044b739319c59ed7e23c34~tplv-k3u1fbpfcp-watermark.image?)

执行**npm run eslint**

![微信截图_20220519150749.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4158d6db7b9b447a8bacf7de1f94ea12~tplv-k3u1fbpfcp-watermark.image?)

可以看到黄色代码部分会检测到有变量**a**没有用到，会报一个警告。

除此之外再解决一个问题就是**eslint**报的警告**React version not specified in eslint-plugin-react settings**,需要告诉**eslint**使用的**react**版本，在 **.eslintrc.js**和**rules**平级添加**settings**配置，让**eslint**自己检测**react**版本,对应[issuse](https://github.com/yannickcr/eslint-plugin-react/issues/2157)

```js
 settings: {
    "react": {
      "version": "detect"
    }
  }
```

再执行**npm run eslint**就不会报这个未设置**react**版本的警告了。

### 6.6 使用 lint-staged 优化 eslint 检测速度

在上面配置的**eslin**t 会检测**src**文件下所有的 **.ts**, **.tsx**文件，虽然功能可以实现，但是当项目文件多的时候，检测的文件会很多，需要的时间也会越来越长，但其实只需要检测提交到暂存区，就是**git add**添加的文件，不在暂存区的文件不用再次检测，而**lint-staged**就是来帮我们做这件事情的。

修改**package.json**脚本**eslint**的配置

```js
"eslint": "eslint"
```

在**package.json**添加**lint-staged**配置

```js
"lint-staged": {
  "src/**/*.{ts,tsx}": [
    "npm run eslint"
  ]
},
```

因为要检测**git**暂存区代码，所以需要执行**git init**初始化一下**git**

```sh
git init
```

初始化**git**完成后就可以进行测试了，先提交一下没有语法问题的**App.tsx**

```sh
git add src/App.tsx
```

把**src/App.tsx**提交到暂存区后，执行**npx lint-staged**

![微信截图_20220519150759.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da6c0a950e364e80ae87bfe53f6d875b~tplv-k3u1fbpfcp-watermark.image?)

可以看到检测通过了，没有检测到语法问题，再把有语法问题的**src/main.tsx**文件提交暂存区再检测一下看看

![微信截图_20220519150769.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00791d4b2bb64c3796fc4692f8abffed~tplv-k3u1fbpfcp-watermark.image?)

发现虽然**main.tsx**虽然有**eslint**语法警告，但依然验证成功了，是因为**lint-staged**只会检测到语法报错才会有提示只是警告不会，如果需要出现警告也阻止代码提交，需要给 eslint 检测配置参数 **--max-warnings=0**

```js
 "eslint": "eslint --max-warnings=0"
```

代表允许最多**0**个警告，就是只要出现警告就会报错，修改完成后再次执行**npx lint-staged**

![微信截图_20220519150779.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e08002c7a41f4f2a8f0dd4c817f6c1e1~tplv-k3u1fbpfcp-watermark.image?)

就会看到最终执行的命令是

```sh
eslint --max-warnings=0 "E:/wuyou/react/my-react-app/src/App.tsx" "E:/wuyou/react/my-react-app/src/main.tsx"
```

**eslint**只检测了 git 暂存区的**App.tsx**和**main.tsx**两个文件，做到了只检测**git**暂存区中文件的功能，避免每次都全量检测文件。

而添加了 **--max-warnings=0** 参数后，警告也可以检测出来并报错中断命令行了。

## 七. 使用 tsc 检测类型和报错

在项目中使用了**ts**,但一些类型问题，现在配置的**eslint**是检测不出来的，需要使用**ts**提供的**tsc**工具进行检测，如下示例

![微信截图_20220519150789.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d24ac6886dfa4ead852b92b730dbafbc~tplv-k3u1fbpfcp-watermark.image?)

在**main.tsx**定义了函数**say**,参数**name**是**string**类型，当调用传**number**类型参数时，页面有了明显的**ts**报错，但此时提交**main.tsx**文件到暂存区后执行**npx lint-staged**

![微信截图_20220519150799.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e89226b95534648a8a8ecb610937936~tplv-k3u1fbpfcp-watermark.image?)

发现没有检测到报错，所以需要配置下**tsc**来检测类型，在**package.json**添加脚本命令

```sh
"pre-check": "tsc && npx lint-staged"
```

执行**npm run pre-check**，发现已经可以检测出类型报错了。

![微信截图_20220519150809.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24d0d3be3b4142deab84d199a2df7ca8~tplv-k3u1fbpfcp-watermark.image?)

## 八. 项目 git 提交时检测语法规范

为了避免把不规范的代码提交到远程仓库，一般会在**git**提交代码时对代码语法进行检测，只有检测通过时才能被提交，**git**提供了一系列的[githooks](https://git-scm.com/womdocs/githooks) ，而我们需要其中的**pre-commit**钩子，它会在**git commit**把代码提交到本地仓库之前执行，可以在这个阶段检测代码，如果检测不通过就退出命令行进程停止**commit**。

### 8.1 代码提交前 husky 检测语法

而**husky**就是可以监听**githooks**的工具，可以借助它来完成这件事情。

### 8.2 安装 husky

```sh
pnpm i husky -D
```

### 8.3 配置 husky 的 pre-commit 钩子

生成 **.husky**配置文件夹（如果项目中没有初始化**git**,需要先执行**git init**）

```sh
npx husky install
```

会在项目根目录生成 **.husky**文件夹，生成文件成功后，需要让**husky**支持监听**pre-commit**钩子，监听到后执行上面定义的**npm run pre-check**语法检测。

```sh
npx husky add .husky/pre-commit 'npm run pre-check'
```

会在 **.husky**目录下生成**pre-commit**文件，里面可以看到我们设置的**npm run pre-check**命令。

![微信截图_20220520150234.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac4936441a044b7ea61942d8052d6f3e~tplv-k3u1fbpfcp-watermark.image?)

然后提交代码进行测试

```sh
git add .
git commit -m "feat: 测试提交验证"
```

会发现监听**pre-commit**钩子执行了**npm rim pre-check**, 使用**eslint**检测了**git**暂存区的两个文件，并且发现了**main.tsx**的警告，退出了命令行，没有执行**git commit**把暂存区代码提交到本地仓库。

![微信截图_20220520154829.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb5627665e024a9f8e35a6eea5419ce0~tplv-k3u1fbpfcp-watermark.image?)

到这里代码提交语法验证就配置完成了，可以有效的保障仓库的代码质量。

## 九. 代码提交时检测 commit 备注规范

在提交代码时，良好的提交备注会方便多人开发时其他人理解本次提交修改的大致内容，也方便后面维护迭代，但每个人习惯都不一样，需要用工具来做下限制，在**git**提供的一系列的[githooks](https://git-scm.com/womdocs/githooks) 中，**commit-msg**会在**git commit**之前执行，并获取到**git commit**的备注，可以通过这个钩子来验证备注是否合理，而验证是否合理肯定需要先定义一套规范，而[commitlint](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fconventional-changelog%2Fcommitlint)就是用来做这件事情的，它会预先定义一套规范，然后验证**git commit**的备注是否符合定义的规范。

### 9.1 安装和配置 commitlint

安装**commitlint**

```sh
pnpm i @commitlint/config-conventional @commitlint/cli -D
```

在根目录创建**commitlint.config.js**文件,添加配置如下

```sh
module.exports = {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // 定义规则类型
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'docs', // 文档注释
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build' // 打包
      ]
    ],
    // subject 大小写不做校验
    'subject-case': [0]
  }
}
```

### 9.2 配置 husky 监听 commit-msg

上面已经安装了**husky**,现在需要再配置下**husky**，让**husky**支持监听**commit-msg**钩子，在钩子函数中使用**commitlint**来验证

```sh
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

会在 **.husky**目录下生成 **commit-msg**文件，并且配置 **commitlint**命令对备注进行验证配置，配置完后就可以进行测试了（要把 **main.tsx**中的语法报错代码去掉并添加到暂存区）

![微信截图_20220520164901.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bda9c8c1b8084577a2954fc461bda449~tplv-k3u1fbpfcp-watermark.image?)

再次执行**git commit -m "修改 xx 功能"**

![微信截图_20220520170402.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf155351381645429dc4c3121e285296~tplv-k3u1fbpfcp-watermark.image?)

再次提交后可以看到**commit-msg**验证没有通过，输入的备注信息为**修改 xx 功能**,下面提示项目描述信息和类型不能为空，代表验证起到作用。

使用正确格式的备注再次提交,类型和描述之间需要用冒号加空格隔开

```sh
git commit -m 'feat: 修改xx功能'
```

就可以看到提交成功了。

## 十. 添加 git commit 辅助备注信息

在上面虽然定义了很多提交类型，但都是英文前缀，不容易记忆，可以添加辅助信息在我们提交代码的时候做选择，会方便很多，可以借助**[commitizen](https://github.com/commitizen/cz-cli)**来实现这个功能。

### 10.1 安装 commitizen

全局安装**commitizen**，否则无法执行插件的**git cz**命令：

```sh
pnpm i commitizen -g
```

在项目内安装**cz-customizable**：

```sh
pnpm i cz-customizable -D
```

### 10.2 配置 commitizen 自定义提示规则

添加以下配置到 **package.json** 中：

```js
"config": {
    "commitizen": {
        "path": "./node_modules/cz-customizable"
    }
}
```

在根目录创建 **.cz-config.js** 自定义提示文件：

```js
module.exports = {
  // 可选类型，和上面commitlint.config.js配置的规则一一对应
  types: [
    { value: 'feat', name: 'feat: 新功能' },
    { value: 'fix', name: 'fix: 修复' },
    { value: 'docs', name: 'docs: 文档变更' },
    { value: 'style', name: 'style: 代码格式(不影响代码运行的变动)' },
    { value: 'refactor', name: 'refactor: 重构(既不是增加feature，也不是修复bug)' },
    { value: 'perf', name: 'perf: 性能优化' },
    { value: 'test', name: 'test: 增加测试' },
    { value: 'chore', name: 'chore: 构建过程或辅助工具的变动' },
    { value: 'revert', name: 'revert: 回退' },
    { value: 'build', name: 'build: 打包' }
  ], // 消息步骤，正常只需要选择
  messages: {
    type: '请选择提交类型:', // customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):', // body: '请输入详细描述(可选):',
    footer: '请输入要关闭的issue(可选):',
    confirmCommit: '确认使用以上信息提交？(y/n)'
  }, // 跳过问题：修改范围，自定义修改范围，详细描述，issue相关
  skipQuestions: ['scope', 'customScope', 'body', 'footer'], // subject描述文字长度最长是72
  subjectLimit: 72
}
```

### 10.3 测试 commitizen 辅助提交

使用**git add**添加文件到暂存区，然后使用**git cz**替代**git commit**命令提交代码：

![微信截图_20220520170412.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de48ed7deccd4dbf81674ca590b3edd5~tplv-k3u1fbpfcp-watermark.image?)

会出现选择提交类型和填写提交描述信息，选择**yes**后，会触发**git**提交语法验证，最终提交成功了，提交的备注是**feat: 添加 commit 辅助信息**

## 十一. 总结

到现在一个**react18+vite2+ts**项目从创建，到规范编辑器默认配置，代码自动格式化，代码提交时使用**eslint**和**tsc**检测代码，验证**git**提交备注信息，辅助选择**git**提交备注信息就都已经配置好了。

这只是一个最常用基础的配置，在**eslint**还有很多可以深度定制配置的，比如针对**react-hook**的语法检测配置，还有代码自动修复，但感觉自动修复有时候会比较坑，就没有配置。

**package.json**完整代码，其他配置文件代码上面都有

```json
{
  "name": "my-react-app",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "eslint": "eslint --max-warnings=0",
    "pre-check": "tsc && npx lint-staged"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "lint-staged": {
    "src/**/*.{ts,tsx}": ["npm run eslint"]
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    }
  },
  "devDependencies": {
    "@commitlint/cli": "^17.0.0",
    "@commitlint/config-conventional": "^17.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@typescript-eslint/eslint-plugin": "^5.26.0",
    "@typescript-eslint/parser": "^5.26.0",
    "@vitejs/plugin-react": "^1.3.0",
    "cz-customizable": "^6.3.0",
    "eslint": "^8.16.0",
    "eslint-plugin-react": "^7.30.0",
    "husky": "^8.0.1",
    "typescript": "^4.6.3",
    "vite": "^2.9.9"
  }
}
```
