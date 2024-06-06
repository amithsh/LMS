import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { NextResponse } from "next/server"

export async function POST(
    req:Request,
    {params}:{params:{courseId:string}}
){
    try{
        const {userId} = auth()
        const courseId = params.courseId
        const {url} = await req.json()


        if(!userId){
            return new NextResponse("unauthorized",{status:500})
        }

        const courseowner = await db.course.findUnique({
            where:{
                id:params.courseId,
                userId:userId
            }
        })

        if(!courseowner){
            return new NextResponse("unauthorized",{status:401})
        }

        const attachment = await db.attachment.create({
            data:{ 
                url,
                name:url.split("/").pop(),
                courseId: params.courseId
            }
        })

        return NextResponse.json(attachment)

    }catch(error:any){
        console.log("[COURSE_ID]",error)
        return new NextResponse("something went wrong"+error,{status:500})
    }
}