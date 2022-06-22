// pages/index/index.js
const XHR = require("../../utils/request")
Page({
    /**
     * 页面的初始数据
     */
    data: {
        topNews:[],
        moreNews:[],
        otherNews:[],
        moreOtherNews:[],
        loading:false,
        isOther:false,
        isAll:false
    },
    init(){
         
        XHR("https://c.m.163.com/nc/article/headline/T1348647853363/0-40.html").then(res=>{
              let topNews =  res.data.T1348647853363    
              let moreNews = topNews.filter((item,index)=>{
                return index<=5
            })
            this.setData({
                topNews,
                moreNews
            })
        })

    },
    getMore(e){
        if(e.currentTarget.id){
            wx.navigateTo({
                url: '/pages/news/news?url='+e.currentTarget.id,       
              })

        }
    },
    getNews(e){
        const url = e.detail.name
        this.setData({
            isAll:false
        })
            if(url){
            this.setData({
                isOther:true
            })
            let key = url.substring(16,30)
            let fullUrl = "https://c.m.163.com/" + url
            XHR(fullUrl).then(res=>{
                let otherNews =  res.data[key] 
                let moreOtherNews = otherNews.filter((item,index)=>{
                return index<=5
            })
            this.setData({
                otherNews,
                moreOtherNews
            })
        })
        }else{
            this.setData({
                isOther:false
            })
        }
    },
    showMore(){
        if(this.data.otherNews.length>this.data.moreOtherNews.length){
            this.setData({loading:true})
            let moreOtherNews = this.data.moreOtherNews
            let num = moreOtherNews.length
            for(let i = num; i <= num+4 ;i++){
               if(this.data.otherNews[i]){
                moreOtherNews.push(this.data.otherNews[i])
               }   
            }
            setTimeout(()=>{
                this.setData({
                    moreOtherNews,
                    loading:false
                })
            },500)
        }else{
           this.setData({
               isAll:true
           })
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) { 
        wx.cloud.callFunction({ 
            name: 'toDelete'
          }).then(res=>{
              console.log(res);
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

        this.getTabBar().setData({
            active:0
        })
        this.init()    
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
        this.setData({
            messages:"",
            topNews:[],
            moreNews:[],
            loading:false,
            isAll:false
        })
        this.init()
        wx.stopPullDownRefresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        
        if(this.data.isOther){
            this.showMore()

        }else{
            if(this.data.topNews.length>this.data.moreNews.length){
                this.setData({loading:true})
                let moreNews = this.data.moreNews
                let num = moreNews.length
                for(let i = num; i <= num+4 ;i++){
                   if(this.data.topNews[i]){
                        moreNews.push(this.data.topNews[i])
                   }
                   
                }
                setTimeout(()=>{
                    this.setData({
                        moreNews,
                        loading:false
                    })
                },500)
            }else{
                this.setData({
                    isAll:true
                })
    
            }

        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})