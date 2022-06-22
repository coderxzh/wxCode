import Dialog from '@vant/weapp/dialog/dialog';
import Notify from '@vant/weapp/notify/notify';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:""
    },
    toLogin(){

       if(!this.data.userInfo){
            wx.navigateTo({
                url: '/pages/login/login'
            })
       }

    },
    logout(){

        Dialog.confirm({
            title: '提示',
            message: '是否确认退出',
          })
            .then(() => {
                wx.removeStorage({
                    key:'userInfo'
                }).then(res=>{
                    this.setData({
                        userInfo:""
                    })
                    Notify({
                        message: '退出成功',
                        color: '#fff',
                        background: '#409EFF',
                        duration: 1500,
                    });
                })
            })
            .catch(() => {
              
            });    
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:  function (options) {
        let userInfo =  wx.getStorageSync('userInfo')
        if(userInfo){
            this.setData({
                userInfo:userInfo
            })
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: async function () {
        this.getTabBar().setData({
            active:4
        })
        let userInfo = await wx.getStorageSync('userInfo')
        if(userInfo){
            this.setData({
                userInfo:userInfo
            })
        }    
    }
})