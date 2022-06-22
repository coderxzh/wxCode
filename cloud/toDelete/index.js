// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    try {
        let countResult = await db.collection('cheat').count()
        const total = countResult.total
        if(total>300){
            return await db.collection('cheat').orderBy('create','asc').skip(0).limit(100).where({
                state:1
            }).remove()
        }
            
    } catch (error) {
        return {
            error
        }
    }
}