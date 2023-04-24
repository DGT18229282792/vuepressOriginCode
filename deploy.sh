#!/bin/bash

# 创建脚本用于自动部署到github仓库上面、并实现自动更新静态网页

# 构建打包
vuepress build docs

# 导航到构建输出目录
cd docs/.vuepress/dist

git init
git add -A
# 当前时间
export current_time=$(date "+%Y/%m/%d %H:%M:%S")
# 在打包信息中上传当前时间以及作者信息
git commit -m "添加md文件, Author: $(git config user.name), Time: $current_time"
# 推到你仓库的的 gh-page 分支
# 将 <USERNAME>/<REPO> 替换为你的信息
git push -f git@github.com:DGT18229282792/studyspace.git master:gh-pages
# 终端输出发布成功标志
echo "已打包并发布!"

# 返回项目根目录目录

cd ../../../

# 执行脚本 将源代码上传到github上面
git add .
export origin_current_time=$(date "+%Y/%m/%d %H:%M:%S")
git commit -m "'添加md文件', Author: $(git config user.name), Time: $origin_current_time"
git pull
git push