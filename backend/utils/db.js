import mongoose from "mongoose";
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongo connect successfully');
    }
    catch(error){
        console.log("mongoDb connaection error:",error.message);
        process.exit(1);
        
    }
}
export default connectDB;