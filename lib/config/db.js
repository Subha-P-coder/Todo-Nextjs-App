import mongoose from "mongoose"

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://psubha678:4JPWZ682sjFl4cfh@cluster0.dgamp8n.mongodb.net/todo-app')
    console.log("DB connected");
    
}