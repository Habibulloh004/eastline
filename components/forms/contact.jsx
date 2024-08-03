"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";

import CustomFormField, { FormFieldType } from "../shared/customFormField";
import { ReviewsFormValidation } from "@/lib/validation";
import SubmitButton from "../shared/submitButton";

export const ContactForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(ReviewsFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);

    console.log(values);
    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      // const newUser = await createUser(user);

      // if (newUser) {
      //   router.push(`/patients/${newUser.$id}/register`);
      // }
      form.reset();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p className="text-primary textNormal5 font-semibold mb-5">Контакты</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 space-y-6"
        >
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Ваше имя"
            placeholder="Ф.И.О"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Телефон"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Электронная почта"
            placeholder="@почта"
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            className="min-h-32 lg:min-h-52"
            name="message"
            label="Сообщения"
            placeholder="Напишите сообщения"
          />
          <SubmitButton isLoading={isLoading} className="w-full">Отправить</SubmitButton>
        </form>
      </Form>
    </>
  );
};
