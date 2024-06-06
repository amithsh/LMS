"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { File, ImageIcon, Pencil, PlusCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormprops {
  initialdata: Course & {attachments:Attachment[]};
  courseId: string;
}

const formschema = z.object({
  url: z.string().min(1)
});

const AttachmentForm = ({ initialdata, courseId }: AttachmentFormprops) => {
  const [isediting, setisediting] = useState(false);

  const toggleedit = () => setisediting((current) => !current);

  const router = useRouter();

 ;



  const onsubmit = async (values: z.infer<typeof formschema>) => {
   
    try {
      
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("course updated");
      toggleedit();
      router.refresh();
    } catch (error: any) {
      toast.error("somrthing went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-300  rounded-md p-4">
      <div className="flex items-center justify-between font-medium">
        attachements
        <Button variant="ghost" onClick={toggleedit}>
          {isediting && (
            <>
              <span>cancel</span>
            </>
          )}
          {!isediting && !initialdata.attachments && (
            <>
              <PlusCircleIcon className="h-4 w-4 mr-2"  />
              Add an Attachments
            </>
          )}
          {!isediting && initialdata.attachments && (
            <>
              <Pencil />
              <span className="ml-2">Edit Attachments</span>
            </>
          )}
        </Button>
      </div>
      {!isediting && (
        <>
        {initialdata.attachments && initialdata.attachments.length === 0 && (
          <div>
            <p className="text-sm text-gray-500">No Attachments</p>
          </div>
        )}

        {  initialdata.attachments &&  initialdata.attachments.length > 0 && (
            <div className="space-y-2">
                  {initialdata.attachments.map((attachment)=>(
                    <div
                      key={attachment.id}
                      className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md "
                    >
                        <File className="h-4 w-4 mr-2 shrink-0" />
                        <p className="text-xs line-clamp-1">{attachment.name}</p>
                        
                      </div>
                  ))}
            </div>
        )}
        </>
      )}
      {isediting && (
        <FileUpload 
          endpoint="courseAttachment"
          onchange={(url)=>{
            if(url){
              onsubmit({url:url})
            }
          }}

        />
      )}
    </div>
  );
};

export default AttachmentForm;
