import mongoose from 'mongoose';
import color  from 'colors';
const connnectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected  to mongodb ${conn.connection.host} `.bgBlue.red)        
    }catch(error){
        console.log(`Error in mongo ${error}`)
    }
}
export default connnectDB