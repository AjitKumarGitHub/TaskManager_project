import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const dbConnect= async()=>{
    try {
await mongoose.connect(process.env.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

        
            console.log("database is connected");
            
        
    } catch (error) {
        console.log("there is some internal error");
        
    }
}
export default dbConnect;
