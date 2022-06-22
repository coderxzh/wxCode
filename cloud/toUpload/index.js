const cloud = require('wx-server-sdk');
cloud.init()
const random = require('string-random');
const moment = require('moment')
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    const {file,messages} = event
    let{nickName, avatarUrl} = event.userInfo
    let { OPENID } = cloud.getWXContext()
    let create =  moment().format('YYYY-MM-DD HH:mm:ss')
    const path = "images/"+ random()+".png"
  try{

    let result =  await cloud.uploadFile({
      fileContent: new Buffer(file, 'base64'),
      cloudPath: path
    })
    if(result.fileID){
      const _result =  await db.collection('schoolWall').add({
          data:{
            OPENID,
            nickName,
            avatarUrl,
            create,
            cover:result.fileID,
            content:messages
          }
      })
      if(_result._id){
        return {
            code:200,
            mes:'上传成功'
        }
      }else{
        return {
          code:-200,
          mes:"出错了",
        }
      }
   }else{
    return {
      code:-200,
      mes:"出错了",
    }
   }
  }catch(err){
    return {
      code:-200,
      mes:"出错了",
      err
    }
  }
}
