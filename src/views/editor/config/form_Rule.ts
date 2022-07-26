

export const rules = {
    articleTypeId:[
        {
            required: true,
            message: '请选择文章类型',
            trigger: 'change',
        }
    ],
    abstract: [
        {
            required: true,
            message: '请输入文章的摘要',
            trigger:'blur'
        }
    ]

}