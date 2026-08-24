import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log('mongodb connected succesfully')
    } catch (error) {
        console.log('mongo db connection failed ', error)
        process.exit(1)
    }
}

export default connectDB