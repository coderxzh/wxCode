const qqMap = require("../../utils/qqmap-wx-jssdk.min")
let Map;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        address:""
    },
    search(){
        wx.navigateTo({
            url: '/pages/location/location',
          })

    },
    getOut(){
        wx.navigateTo({
            url: '/pages/line/line',
          })
    },
    subway(){

        wx.navigateTo({
            url: '/pages/subway/subway',
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        Map = new qqMap({
            key: 'DJXBZ-7F6AQ-34F5X-G2OAY-RK2MO-PWFQ2'
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
       
        this.getTabBar().setData({
            active:3
        })
        wx.getLocation().then(res=>{
         let {latitude,longitude} = res
         new Promise((resolve,reject)=>{
            Map.reverseGeocoder({
                location:{
                    latitude,
                    longitude
                },
                get_poi:1,
                success(res){
                  resolve(res)     
                },
                fail(err){
                    reject(err)
                }   
            })
         }).then(res=>{
            this.setData({
                address:res.result.formatted_addresses.recommend
            })
         })
                  
        })
  
    }
})