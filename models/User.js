import mongoose from "mongoose";

//Schema define karo
const userSchema = new mongoose.Schema({
    email : {type:String, required : true},
    password : {type:String, required : true}
})

//Schema compile karo 
const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User


// import mongoose, { Document, Schema } from "mongoose";

// // Define the interface for the Post document
// interface IPost extends Document {
//     title: string;
//     body: string;
// }

// // Define the schema
// const postSchema: Schema = new mongoose.Schema({
//     email: { type: String, required: true, trim: true },
//     password: { type: String, required: true, trim: true }
// });

// // Compile the schema into a model
// const Post = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);

// export default Post;