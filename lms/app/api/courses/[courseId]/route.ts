import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {params}:{params:{courseId:string}}
    ){

    try{
        

        const{userId } = auth() 
        const {courseId} = params
        const values = await req.json()

        console.log(values)

       
        if(!userId){
            return new NextResponse("unauthorized user",{status:401})
        }

        const course = await db.course.update({
            where:{
                id: courseId,
                userId
            },
            data:{
                ...values
            }
        })

        return new NextResponse("updated succesfully",{status:200})

    }catch(error:any){
        console.log("[COURSE_ID]",error)
        return new NextResponse("something went wrong"+error,{status:500})
    }
}