import mongoose from "mongoose";

export default async() => {
    try{
        // const DB_OPTIONS = {
        //     dbName : process.env.DBNAME,
        //     User : process.env.DBUSERNAME,
        //     Pass : process.env.DBPASSWORD,
        //     authSource : process.env.DBAUTHSOURCE
        // };
        await mongoose.connect(process.env.DATABASE_URL)
        // await mongoose.connect(process.env.DATABASE_URL, DB_OPTIONS)
        console.log("Connection Successful");
    }catch(err){
        console.log(err);
    }
};




// import mongoose from "mongoose";

// export default async() => {
//     try{
//         const DB_OPTIONS = {
//             dbName : process.env.DBNAME,
//             User : process.env.DBUSERNAME,
//             Pass : process.env.DBPASSWORD,
//             authSource : process.env.DBAUTHSOURCE
//         };
//         await mongoose.connect(process.env.DATABASE_URL, DB_OPTIONS)
//         console.log("Connection Successful");
//     }catch(err){
//         console.log(err);
//     }
// };




















// import mongoose, { ConnectOptions } from "mongoose";

// export default async () => {
//     try {
//         const DB_OPTIONS: ConnectOptions = {
//             dbName: process.env.DBNAME,
//             user: process.env.DBUSERNAME,
//             pass: process.env.DBPASSWORD,
//             authSource: process.env.DBAUTHSOURCE
//         };
//         await mongoose.connect(process.env.DATABASE_URL as string, DB_OPTIONS);
//         console.log("Connection Successful");
//     } catch (err) {
//         console.log(err);
//     }
// }

