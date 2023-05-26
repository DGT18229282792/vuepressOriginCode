module.exports = {
    title: 'DGT WORKSPACE',
    description: 'used to record the knowledge of front-end development',
    base: '/studyspace/', // 设置为github仓库地址，用来部署到github pages
    themeConfig: {
        lastUpdated: '最后更新时间', // string | boolean
        sidebarDepth: 2,
        nav: [
            { text: '首页', link: '/' },
            { text: '个人简历v1', link: '/guide/info/resume/' },
            { text: '个人简历v2', link: '/guide/info/resumeNew/' },
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
                },
                {
                    title: '脚手架',
                    collapsable: true, //是否折叠
                    children: [
                        {
                            title: '一个简易的脚手架',
                            path: '/guide/clis/DGT-cli.md',
                        }

                    ],
                },
                {
                    title: 'npm插件',
                    collapsable: true, //是否折叠
                    sidebarDepth: 1,
                    children: [
                        {
                            title: 'npm插件开发教程',
                            path: '/guide/clis/npm.md',
                        }

                    ],
                },
                {
                    title: 'webpack',
                    collapsable: true, //是否折叠
                    children: [
                        {
                            title: 'webpack-loader',
                            collapsable: true, //是否折叠
                            children: [
                                {
                                    title: 'cacheloader',
                                    path: '/guide/webpack/loaders/cacheloader.md',
                                }
                            ]
                            
                        },
                        {
                            title: 'webpack-plugin',
                            path: '/guide/clis/npm.md',
                        }

                    ],
                },
                {
                    title: '前端性能优化',
                    collapsable: true, //是否折叠
                    sidebarDepth: 1,
                    children: [
                        {
                            title: '网络优化',
                            path: '/guide/performanceOptimization/network.md',
                        }

                    ],
                },
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