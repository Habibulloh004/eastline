"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../shared/customFormField";
import { Product } from "@/lib/validation";
import SubmitButton from "../shared/submitButton";
import axios from "axios";
import toast from "react-hot-toast";
import Container from "../shared/container";
import { ChevronLeft } from "lucide-react";
import { SelectItem } from "../ui/select";
import DropTarget from "../shared/fileDnd";
import { supabase } from "@/lib/utils";

const ProductForm = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dataURLToBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const form = useForm({
    resolver: zodResolver(Product),
    defaultValues: {
      name: "",
      topCategoryId: "",
    },
  });

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios.get("/api/category");
      setTopCategories(data.data);
    };
    getCategories();
  }, []);

  const upload = async () => {
    let urlArr = [];

    for (const image of images) {
      let imageToUpload = image.file;

      if (image.cropped) {
        imageToUpload = dataURLToBlob(image.url);
      }

      // File doesn't exist, upload it
      const { data, error: uploadError } = await supabase.storage
        .from("eastLine_images")
        .upload(image.name + crypto.randomUUID(), imageToUpload);

      if (uploadError) {
        console.log("Error uploading image:", uploadError);
      } else {
        console.log("Image uploaded successfully:", data);

        const { data: newPublicUrlData } = supabase.storage
          .from("eastLine_images")
          .getPublicUrl(image.name);

        console.log("Public URL:", newPublicUrlData.publicUrl);
        urlArr.push(newPublicUrlData.publicUrl);
      }
    }

    return urlArr;
  };

  const onSubmit = async (values) => {
    setIsLoading(true);

    try {
      const res = await upload();
      await axios.post("/api/product", { ...values, images: res });

      toast.success("Товар создан успешно!");

      form.reset();
      setImages([]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Что-то пошло не так. Пожалуйста, повторите попытку позже.");
      setIsLoading(false);
    }
  };

  return (
    <Container className="my-10 lg:my-20 flex-col items-start">
      <div className="text-primary textNormal5 font-semibold mb-5 flex items-center">
        <ChevronLeft
          className="cursor-pointer w-8 h-8 lg:w-12 lg:h-12"
          onClick={() => router.back()}
        />
        <p>Создать товар</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 w-full ">
          <div className="w-full space-y-6 lg:w-1/2">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Название товара"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="price"
              label="Цена продукта"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="brand"
              label="Бренд продукта"
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="description"
              label="Описание продукта"
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="feature"
              label="Характеристика продукта"
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="categoryId"
              label="Категория"
              placeholder="Выберите категорию"
            >
              {topCategories.map((category) => (
                <SelectItem key={category.id} value={`${category.id}`}>
                  <p>{category.name}</p>
                </SelectItem>
              ))}
            </CustomFormField>
          </div>
          <div className="my-6">
            <DropTarget images={images} setImages={setImages} />
          </div>

          <SubmitButton isLoading={isLoading} className="w-full">
            Отправить
          </SubmitButton>
        </form>
      </Form>
    </Container>
  );
};

export default ProductForm;
