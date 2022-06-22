// pages/upload/upload.js
import Notify from '@vant/weapp/notify/notify';
import Toast from '@vant/weapp/toast/toast';
const date = require("../../utils/getTime")()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fileList:[],
    messages:"",
    loading:false
  },
  cancel(){
    this.setData({
      fileList:[],
      messages:""
    })
    wx.navigateBack({
      delta: 1
    })
  },
  messages(e){
    this.setData({
      messages:e.detail.value
    })
  },
  afterRead(event) {
    const { file } = event.detail;
    this.setData({
      'fileList[0]':{url:file.url}
    })
  },
  toUpload(){
    let userInfo = wx.getStorageSync('userInfo')
    let{nickName, avatarUrl,OPENID} = userInfo
    if(userInfo){
        const {fileList} = this.data
        const {messages} = this.data
        if(fileList.length > 0){
          this.setData({
            loading:true
          })
          Toast.loading({
            message: '上传中...',
            forbidClick: true,
            loadingType: 'spinner',
            duration: 0,
            position:"top"
          });
            const file = fileList[0].url
            const path = "images/"+ new Date().getTime() +".png"
            wx.cloud.uploadFile({
              cloudPath: path,
              filePath: file, 
            }).then(res=>{
              const cover = res.fileID
              const create = new Date().format("yyyy-MM-dd hh:mm:ss");
              db.collection('schoolWall').add({
                data:{
                  OPENID,
                  nickName,
                  avatarUrl,
                  create,
                  cover,
                  content:messages
                }
              }).then(res=>{
                if(res._id){
                  this.setData({
                    loading:false
                  })
                  setTimeout(()=>{
                    wx.navigateBack({
                      delta: 1
                    })
                  },2000)
                  Notify({
                    message: '上传成功',
                    color: '#fff',
                    background: '#409EFF',
                    duration: 1500,
                  });
                }else{
                  Toast.fail('写入失败');
                }
              }).catch(err=>{
                  Toast.fail('服务器异常');
              })
    
          }).catch(err=>{
            Toast.fail('服务器异常');
          })       
      }else{
        Notify({ type: 'warning', message: '请选择要上传的图片' });
      }
  }else{
      wx.navigateTo({
        url: '/pages/login/login'
      })
  
  }


},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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