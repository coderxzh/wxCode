const chooseLocation = requirePlugin('chooseLocation');
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.switchTab({
          url: '/pages/nearby/nearby',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
       
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
        wx.getLocation({altitude:true,isHighAccuracy:true}).then(res=>{
            let {latitude,longitude} = res
            const key = 'DJXBZ-7F6AQ-34F5X-G2OAY-RK2MO-PWFQ2'; 
            const referer = 'miniprogram'; 
            const location = JSON.stringify({
                latitude,
                longitude
            });
            const category = '美食,生活服务,娱乐休闲'; 
            wx.navigateTo({
                url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
            })
        })
        wx.switchTab({
            url: '/pages/nearby/nearby',
          })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})