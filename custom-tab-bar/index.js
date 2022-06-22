// components/custom-tab-bar/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        active:0,
        list: [
            {
                "pagePath": "/pages/index/index",
                iconPath:"wap-home-o",
                selectedIconPath:"wap-home",
                "text": "首页"
            },
            {
                "pagePath": "/pages/wall/wall",
                iconPath:"chat-o",
                selectedIconPath:"chat-o",
                "text": "贴吧"
            },
            {
                "pagePath": "/pages/cheat/cheat",
                iconPath:"like-o",
                selectedIconPath:"like-o",
                "text": "聊天室"
            },
            {
                "pagePath": "/pages/nearby/nearby",
                iconPath:"guide-o",
                selectedIconPath:"guide-o",
                "text": "周边"
            },
            {
                "pagePath": "/pages/profile/profile",
                iconPath:"user-o",
                selectedIconPath:"user",
                "text": "个人"
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onChange(e){
            this.setData({
                active:e.detail
            })
            wx.switchTab({
              url: this.data.list[e.detail].pagePath,
            })
        }
    }
})
