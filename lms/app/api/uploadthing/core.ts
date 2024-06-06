import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

const handleauth = ()=>{
    const {userId} = auth()

    if(!userId){
        throw new Error("Not authenticated")
    }
    return {userId}
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  courseimage: f({image:{maxFileSize:"4MB", maxFileCount:1}})
    .middleware(()=>handleauth())
    .onUploadComplete(()=>{}),
  
  courseAttachment: f(["image","video","text","audio","pdf"])
    .middleware(()=>handleauth())
    .onUploadComplete(()=>{}),

  chapterVideo: f({video:{maxFileCount:1, maxFileSize:"512GB"}})
    .middleware(()=>handleauth())
    .onUploadComplete(()=>{}),
  
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;