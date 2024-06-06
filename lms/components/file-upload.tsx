"use client"

import { ourFileRouter } from "@/app/api/uploadthing/core"
import { UploadDropzone } from "@/lib/uploadthings"
import toast from "react-hot-toast"


interface fileuploadprops{
    onchange: (url?: string) => void
    endpoint : keyof typeof ourFileRouter
}

export const FileUpload = ({
    onchange,
    endpoint
}:fileuploadprops)=>{

    return (
        <UploadDropzone 
            
            endpoint={endpoint}

            onClientUploadComplete = {(res)=>{
                onchange(res?.[0].url)
            }}

            onUploadError = {(error:Error)=>{
                toast.error(error.message)
            }}
           
        />
    )
}