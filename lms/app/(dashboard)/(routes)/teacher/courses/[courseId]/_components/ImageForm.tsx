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
import { ImageIcon, Pencil, PlusCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface Imageformprops {
  initialdata: Course;
  courseId: string;
}

const formschema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image field is required",
  }),
});

const ImageForm = ({ initialdata, courseId }: Imageformprops) => {
  const [isediting, setisediting] = useState(false);

  const toggleedit = () => setisediting((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      imageUrl: initialdata?.imageUrl || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onsubmit = async (values: z.infer<typeof formschema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
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
        course Image
        <Button variant="ghost" onClick={toggleedit}>
          {isediting && (
            <>
              <span>cancel</span>
            </>
          )}
          {!isediting && !initialdata.imageUrl && (
            <>
              <PlusCircleIcon className="h-4 w-4 mr-2"  />
              Add an image
            </>
          )}
          {!isediting && initialdata.imageUrl && (
            <>
              <Pencil />
              <span className="ml-2">Edit Image</span>
            </>
          )}
        </Button>
      </div>
      {!isediting && (
        !initialdata.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md ">
            <ImageIcon className="h-10 w-10  text-slate-500" />
          </div>
        ):(
          <div className="relative aspect-video mt-2">
            <Image 
              fill
              alt="upload"
              src={initialdata.imageUrl}
            />

          </div>
        )
      )}
      {isediting && (
        <FileUpload 

          endpoint="courseimage"
        
          onchange={(url)=>{
            if(url){
              onsubmit({imageUrl:url})
            }
          }}

        />
      )}
    </div>
  );
};

export default ImageForm;
