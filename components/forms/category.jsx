"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../shared/customFormField";
import { Category } from "@/lib/validation";
import SubmitButton from "../shared/submitButton";
import axios from "axios";
import toast from "react-hot-toast";
import Container from "../shared/container";
import { ChevronLeft } from "lucide-react";
import { SelectItem } from "../ui/select";
import { revalidatePath } from "@/lib/revalidate";
import DropTarget from "../shared/fileDnd";
import { useEdgeStore } from "@/lib/edgestore";
import { supabase } from "@/lib/utils";

const CategoryForm = () => {
  const router = useRouter();
  const [topCategories, setTopCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { edgestore } = useEdgeStore();
  const [image, setImage] = useState([]);

  const form = useForm({
    resolver: zodResolver(Category),
    defaultValues: {
      name: "",
      topCategoryId: "",
    },
  });

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios.get("/api/topCategory");
      setTopCategories(data.data);
    };
    getCategories();
  }, []);

  function dataURLToBlob(dataURL) {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const onSubmit = async (values) => {
    setIsLoading(true);
    let uploadedUrl = "";

    let imageToUpload = image[0]?.file;

    if (image[0]?.cropped) {
      imageToUpload = dataURLToBlob(image[0].url);
    }

    try {
      let imageToUpload = image[0].file;

      if (image.cropped) {
        imageToUpload = dataURLToBlob(image[0].url);
      }

      console.log(imageToUpload);
      // File doesn't exist, upload it
      const { data, error: uploadError } = await supabase.storage
        .from("eastLine_images")
        .upload(image[0].name + crypto.randomUUID(), imageToUpload);

      if (uploadError) {
        console.log("Error uploading image:", uploadError);
      } else {
        console.log("Image uploaded successfully:", data);

        const { data: newPublicUrlData } = supabase.storage
          .from("eastLine_images")
          .getPublicUrl(image.name);

        console.log("Public URL:", newPublicUrlData.publicUrl);
        uploadedUrl = newPublicUrlData.publicUrl
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Ошибка загрузки изображения. Попробуйте еще раз.");
    }

    try {
      await axios.post("/api/category", { ...values, image: uploadedUrl });

      toast.success("Категория создана успешно!");

      form.reset();
      setImage([]);
      revalidatePath("changeCategory");
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Что-то пошло не так. Пожалуйста, повторите попытку позже.");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(image);

  return (
    <Container className="my-10 lg:my-20 flex-col items-start">
      <div className="text-primary textNormal5 font-semibold mb-5 flex items-center">
        <ChevronLeft
          className="cursor-pointer w-8 h-8 lg:w-12 lg:h-12"
          onClick={() => router.back()}
        />
        <p>Создать категорию</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 w-full">
          <div className="w-full space-y-6 lg:w-1/2">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Название категории"
            />
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="topCategoryId"
              label="Верхнюю категория"
              placeholder="Выберите верхнюю категорию"
            >
              {topCategories.map((category) => (
                <SelectItem key={`${category.id}`} value={`${category.id}`}>
                  <p>{category.name}</p>
                </SelectItem>
              ))}
            </CustomFormField>
          </div>
          <div className="my-6">
            <DropTarget images={image} setImages={setImage} limitImg={1} />
          </div>
          <SubmitButton isLoading={isLoading} className="w-full">
            Отправить
          </SubmitButton>
        </form>
      </Form>
    </Container>
  );
};

export default CategoryForm;
