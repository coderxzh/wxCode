// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const request = require('request')
// 云函数入口函数
exports.main = async (event, context) => {
   
    const options = {
        url: "http://tinyxu.top/api/photo",
        json: true,
        encoding: 'utf-8', 
    }
   try {
        return result =  await new Promise((reslove, reject) => {
            request(options, (err, res, body) => {
                if (err) {
                    reject(err)
                } else {
                    reslove(body)
                }
            })
        })

   } catch (error) {
       
       return{error}
   }
}