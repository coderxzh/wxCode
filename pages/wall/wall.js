// pages/wall/wall.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,
    messages:"",
    loading:false,
    isALL:false
  },
  toAdd(){
    wx.navigateTo({
      url: '/pages/upload/upload'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().setData({
      active:1
  })
    this.setData({
      page:0
    })
     let url = []
     db.collection('schoolWall').orderBy('create','desc').skip(0).limit(5).get().then(res => {
        this.setData({
          messages:res.data
        })
        res.data.forEach(item=>{
        url.push(item.cover)
      })
      wx.cloud.getTempFileURL({
        fileList: url,
      }).then(res=>{
        let messages = this.data.messages
        res.fileList.forEach((item,index)=>{
          messages[index].cover = item.tempFileURL
        })
        this.setData({
          messages
        })
      }).catch(err=>{
        console.log(err);
      })
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  onPullDownRefresh: function () {
      this.setData({
        page:0,
        messages:""
      })
      const {page} = this.data
     let url = []
     db.collection('schoolWall').orderBy('create','desc').skip(page).limit(5).get().then(res => {
        this.setData({
          messages:res.data
        })
        res.data.forEach(item=>{
        url.push(item.cover)
      })
      wx.cloud.getTempFileURL({
        fileList: url,
      }).then(res=>{
        let messages = this.data.messages
        res.fileList.forEach((item,index)=>{
          messages[index].cover = item.tempFileURL
        })
        this.setData({
          messages
        })
        wx.stopPullDownRefresh();
      }).catch(err=>{
        console.log(err);
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
      this.setData({
        page:this.data.page+5,
        isALL:false
      })
      let url = []
      let messages = this.data.messages
      let countResult = await db.collection('schoolWall').count()
      const total = countResult.total
      if(this.data.page+1<total){
            this.setData({
              loading:true
            })
            db.collection('schoolWall').orderBy('create','desc').skip(this.data.page).limit(5).get().then(res => {
              let newMes = res.data
              res.data.forEach(item=>{
                url.push(item.cover)
            })
            wx.cloud.getTempFileURL({
              fileList: url,
            }).then(res=>{
              res.fileList.forEach((item,index)=>{
                newMes[index].cover = item.tempFileURL
              })
              newMes.forEach(item=>{
                messages.push(item)
              })
              this.setData({
                messages,
                loading:false
              })

            }).catch(err=>{
              console.log(err);
            })
          })
      }else{
        this.setData({
          isALL:true
        })
      }
  }
})