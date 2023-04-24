module.exports = {
    title: 'DGT WORKSPACE',
    description: 'used to record the knowledge of front-end development',
    base: '/studyspace/', // 设置为github仓库地址，用来部署到github pages
    themeConfig: {
        lastUpdated: '最后更新时间', // string | boolean
        nav: [
            { text: '首页', link: '/' },
            { text: '个人简历', link: '/guide/info/resume/' },
            { text: 'Utils工具类', link: '/guide/utils/utils/' },
        ],
        sidebar: {
            '/': [
                {
                    title: 'plugins',
                    collapsable: true, //是否折叠
                    children: [
                        {
                            title: '前端监控埋点实践',
                            path: '/guide/utils/sdk.md',
                        }

                    ],
                }
            ],
            '/guide/utils/utils/': [
                {
                    title: '总结的工具类',
                    collapsable: true, //是否折叠
                    children: [
                        {
                            title: '工具类',
                            path: '/guide/utils/utils.md',
                        }

                    ],
                }
            ]
        }
    }
}