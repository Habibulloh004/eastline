"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";

import CustomFormField, { FormFieldType } from "../shared/customFormField";
import { Category, Product } from "@/lib/validation";
import SubmitButton from "../shared/submitButton";
import axios from "axios";
import toast from "react-hot-toast";
import Container from "../shared/container";
import { ChevronLeft } from "lucide-react";
import { SelectItem } from "../ui/select";

const ProductForm = () => {
  const router = useRouter();
  const [topCategories, setTopCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = async (values) => {
    setIsLoading(true);

    try {
      await axios.post("/api/category", values);

      toast.success("Категория создана успешно!");

      form.reset();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Что то пошло не так. Пожалуйста, повторите попытку позже.");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <Container className="my-10 lg:my-20 flex-col items-start">
      <div className="text-primary textNormal5 font-semibold mb-5 flex items-center">
        <ChevronLeft
          className="cursor-pointer w-8 h-8 lg:w-12 lg:h-12"
          onClick={() => {
            router.back();
          }}
        />{" "}
        <p>Создать товар</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 space-y-6 w-full lg:w-1/2"
        >
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Название товар"
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
            {topCategories.map((category) => {
              return (
                <SelectItem key={category.id} value={category.id}>
                  <p>{category.name}</p>
                </SelectItem>
              );
            })}
          </CustomFormField>

          <SubmitButton isLoading={isLoading} className="w-full">
            Отправить
          </SubmitButton>
        </form>
      </Form>
    </Container>
  );
};

export default ProductForm;
