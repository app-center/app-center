# App Center

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 开发命令

* `make dev`：启动本地服务器运行代码，api proxy 指向开发环境
* `make dev-gray`：启动本地服务器运行代码，api proxy 指向灰度环境
* `make dev-qc`：启动本地服务器运行代码，api proxy 指向测试环境

## 打包命令
* `make release-dev`：production mode 配以开发环境配置来编译客户端代码并打包压缩至 out 目录对应版本的子目录中；
* `make release-gray`：production mode 配以灰度环境配置来编译客户端代码并打包压缩至 out 目录对应版本的子目录中；
* `make release-qc`：production mode 配以测试环境配置来编译客户端代码并打包压缩至 out 目录对应版本的子目录中；
* `make release-prod`：production mode 配以生产环境配置来编译客户端代码并打包压缩至 out 目录对应版本的子目录中；
* `make release`：production mode 编译 dev、gray、qc、prod 四个环境的客户端代码，并统一压缩到 out 目录中；
