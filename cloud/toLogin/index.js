// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const random = require('string-random');
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    let { OPENID,UNIONID } = cloud.getWXContext()
    let{nickName, avatarUrl, gender} = event.userInfo
    let u_id = random(10, { letters: false });
    try {
        
        const regist =  await db.collection('userData').where({
            OPENID  
        }).get()
        if(regist.data.length){
            return  {
                code:200,
                mes:"登录成功",
                data:regist.data[0]
            }
        }else{
            let result = await db.collection('userData').add({
                data:{
                    u_id,
                    OPENID,
                    nickName,
                    avatarUrl,
                    gender
                }
              })
             if(result._id){
                 return {
                     mes:'写入成功',
                     code:200,
                     data:{
                        u_id,
                        OPENID,
                        nickName,
                        avatarUrl,
                        gender
                    }
                 }
             }
        }
    } catch (err) {
       return {
           mes:'写入失败',
           code:-200,
           data:err
       }
    }
}