import connectDB from "@/lib/connectDB"
import User from "@/models/User"
import { NextResponse } from "next/server"

export async function POST(request) {
    try{
        await connectDB()
        const {email, password} = await request.json()
        const newUser = new User({email, password})
        await newUser.save()     

        return NextResponse.json(newUser, {status : 201})
    }catch(err){
        console.log(err)
    }
}







// import connectDB from "@/lib/connectDB"
// import User from "@/models/User"
// import { NextResponse } from "next/server"

// export async function POST(request){

//     const body = await request.json();   //request ma ave data jyare form submit thai ne tyare etle ee data lai ne body ma nakhi didho

//     try {
//         await connectDB();   //database apde banavo ene connect karvano ane call karvano
//         const result = await User.create(body);   //etle ke aa che ee database na data ne find kari ne result ma store karavi dey
//                                         //create(body) che ee body ma je data hoy ee data ne create kare
//         return NextResponse.json({"result": result},{status:201})
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({"message":"Something went wrong"},{status:400})  
//     }
// }