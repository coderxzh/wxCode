// pages/cheat/cheat.js
const db = wx.cloud.database()
const date = require("../../utils/getTime")()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info:"",
        userInfo:"",
        message:[],
        show:false,
        page:5,
        isEmpt:false
    },
    getInfo(e){
        let info = e.detail.value
        if(info){
            this.setData({
                show:true,
                info
            })
        }else{
            this.setData({
                show:false
            })
        }
        
    },
    focus(){
        let {info} = this.data
        if(info){
            this.setData({
                show:true
            })
        }
    },
    send(){
        let {info} = this.data
        if(info){
            let{nickName, avatarUrl,OPENID} = this.data.userInfo
            const create = new Date().format("yyyy-MM-dd hh:mm:ss");
            db.collection('cheat').add({
                data:{
                    OPENID,
                    nickName,
                    avatarUrl,
                    info,
                    create,
                    state:1
                }
            }).then(res=>{
               this.setData({
                   info:""
               })
            })
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getTabBar().setData({
            active:2
        })
        let userInfo =  wx.getStorageSync('userInfo')
        if(userInfo){
            this.setData({
                userInfo
            })
            db.collection('cheat').watch({
                onChange:() =>{
                    db.collection('cheat').orderBy('create','desc').skip(0).limit(10).get().then(res=>{
                        this.setData({
                            message:res.data.reverse(),
                            page:5,
                            isEmpt:false
                        })
                    })
                },
                onError: function(err) {
                  console.error(err)
                }
              })
             
        }else{
            wx.navigateTo({
                url: '/pages/login/login'
              })
        }
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: async function () {
        let countResult = await db.collection('cheat').count()
        const total = countResult.total
        if(this.data.message.length < total){
            this.setData({
                page:this.data.page+5
            })
            db.collection('cheat').orderBy('create','desc').skip(this.data.page).limit(5).get().then(res=>{
                let message = this.data.message
                res.data.forEach(item=>{
                    message.unshift(item)
                })
                this.setData({
                    message
                })
                wx.stopPullDownRefresh();
            })
        }else{
            this.setData({
                isEmpt:true
            })
            wx.stopPullDownRefresh();
        }
       
    }
})