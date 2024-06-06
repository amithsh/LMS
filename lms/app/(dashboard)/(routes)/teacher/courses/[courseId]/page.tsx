import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { DollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import TitleForm from "./_components/Titleform";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import { CategoryForm } from "./_components/CategoryForm";
import { Label } from "@radix-ui/react-label";
import Priceform from "./_components/Priceform";
import AttachmentForm from "./_components/Attachmentsform";

export const CourseIdpage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include:{
      attachements:{
        orderBy:{
          createAt:"desc"
        }
      }
    }
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  console.log(categories);

  if (!course) {
    return redirect("/");
  }

  const requiredfields = [
    course.title,
    course.description,
    course.price,
    course.imageUrl,
    course.categoryId,
  ];
  const totalfields = requiredfields.length;
  const completedfields = requiredfields.filter(Boolean).length;

  const progress = `(${completedfields}/${totalfields})`;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between ">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-bold">course Setup</h1>
          <span className="text-sm text-slate-800 opacity-70">
            Total fileds completed{progress}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-16">
        <div className="">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>

          <TitleForm initialdata={course} courseId={course.id} />
          <DescriptionForm initialdata={course} courseId={course.id} />
          <ImageForm initialdata={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2>course chapters</h2>
            </div>
            <div>TODO:chapters</div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={DollarSign} />
              <h2 className="text-2xl font-bold">sell your course</h2>
            </div>
            <Priceform initialdata={course} courseId={course.id} />
          </div>
          <div>
          <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-2xl font-bold">resourses and attachements</h2>
            </div>
            <AttachmentForm initialdata={course} courseId={course.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdpage;
