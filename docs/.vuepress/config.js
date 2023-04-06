module.exports = {
    title: 'DGT WORKSPACE',
    description: 'used to record the knowledge of front-end development',
    base:'/studyspace/', // 设置为github仓库地址，用来部署到github pages
    themeConfig:{
        sidebar: [
            {
                title:'简介',
                collapsable: false, //是否折叠
                children:[
                    {
                        title:'resume',
                        path:'/guide/info/resume.md',
                    }

                ],
            },
            {
                title:'plugins',
                collapsable: false, //是否折叠
                children:[
                    {
                        title:'去掉全部console测试',
                        path:'/guide/1.md',
                    }

                ],
            },
            {
                title:'loaders',
                collapsable: false, //是否展开
                children:[
                    {
                        title:'生成打包信息',
                        path:'/guide/2.md',
                    }
                ],
            },
        ]
    }
}