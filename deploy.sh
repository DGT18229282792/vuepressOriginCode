# 创建脚本用于自动部署到github仓库上面、并实现自动更新静态网页

# 构建打包
vuepress build docs

# 导航到构建输出目录
cd docs/.vuepress/dist

git init
git add -A
git commit -m '更新'

# 推到你仓库的的 gh-page 分支
# 将 <USERNAME>/<REPO> 替换为你的信息
git push -f git@github.com:DGT18229282792/studyspace.git master:gh-pages