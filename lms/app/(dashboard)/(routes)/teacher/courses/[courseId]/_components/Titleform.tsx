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
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation"

interface titleformprops {
  initialdata: {
    title: string;
  };
  courseId: string;
}

const formschema = z.object({
  title: z.string().min(1, {
    message: "title field is required",
  }),
});




const TitleForm = ({ initialdata, courseId }: titleformprops) => {
  const [isediting, setisediting] = useState(false);

  const toggleedit  = ()=> setisediting((current)=>!current)

  const router = useRouter()


  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: initialdata,
  });

  const { isSubmitting, isValid } = form.formState;

  const onsubmit = async (values: z.infer<typeof formschema>) => {
    
    try{
      await axios.patch(`/api/courses/${courseId}`,values)
      toast.success("course updated")
      toggleedit();
      router.refresh()
      

    }catch(error:any){
      toast.error("somrthing went wrong")
    }

  };

  return (
    <div className="mt-6 border bg-slate-300  rounded-md p-4">
      <div className="flex items-center justify-between font-medium">
        course title
        <Button variant="ghost" onClick={toggleedit}>
          {isediting && (
            <>
              <span>cancel</span>
            </>
          )}
          {!isediting && (
            <>
              <Pencil />
              <span className="ml-2">Edit title</span>
            </>
          )}
        </Button>
      </div>
      {!isediting && (
        <p className="mt-2 text-sm">{initialdata.title}</p>
      )}
      {isediting&& (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} >
               <FormField 
                control={form.control}
                name="title"
                render={({field})=>(
                  <FormItem >
                    <FormLabel>title</FormLabel>
                    <FormControl><Input placeholder=""{...field} disabled={isSubmitting}/></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
               />
               <div className="flex items-center gap-x-2 py-3">
                  <Button disabled={!isValid || isSubmitting}type="submit">
                    save
                  </Button>
               </div>
            </form>
        </Form>
      )}
    </div>
  );
};

export default TitleForm;
