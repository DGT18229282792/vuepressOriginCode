#!/bin/bash

# 创建脚本用于自动部署到github仓库上面、并实现自动更新静态网页

# 构建打包
vuepress build docs

# 导航到构建输出目录
cd docs/.vuepress/dist

git init
git add -A
echo %date:~0,4%/%date:~5,2%/%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2%
git commit -m '2023/4/23  打包构建发布'

# 推到你仓库的的 gh-page 分支
# 将 <USERNAME>/<REPO> 替换为你的信息
git push -f git@github.com:DGT18229282792/studyspace.git master:gh-pages

echo "已打包并发布"

# 返回上一级目录

cd ../../../

# 执行脚本 将源代码上传到github上面
git add .
git commit -m '17:05 上传源代码'
git pull
git push