// //Server Action thi GET karvanu che etle ke api ma posts ma route.js banavu tu eee kai banavani jaroor no pade ama saav easily thai jai ee badhi vastu ne apde aa file ma jj lakhvani ave

// import connectDB from "@/lib/connectDB";
// import PostModel from "@/models/Post"

// export default async function getData2() {

//     await connectDB();

//     const allPosts = await PostModel.find();

//     return(
//         <main className="flex min-h-screen flex-col items-center justify-between p-24">
//             {
//                 allPosts.map((data, i)=>(
//                     <div key={i}>
//                         <h1>{data.title}</h1>
//                         <p>{data.body}</p>
//                         <hr/>
//                     </div>
//                 ))
//             }
//         </main>
//     )
// }