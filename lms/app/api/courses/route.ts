import { auth } from "@clerk/nextjs";

import { NextResponse } from "next/server";

import { db } from "@/lib/db"; 


export async function POST(
    req:Request
){

    try{
        const {userId} = auth() 
        const {title} = await req.json()

        if(!userId){
            return new NextResponse("unauthorized user",{status:401})
        }

        const course = await db.course.create({
            data:{
                userId,
                title
            }
        })

        return new NextResponse(JSON.stringify(course),{status:200})


    }catch(error:any){
        console.log(["COURSES"],error)
        return new NextResponse("something went wrong "+error, {status:500})
    }
}