"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { ChatCompletionStream } from "together-ai/lib/ChatCompletionStream";
import { Card } from "@/components/ui/card";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Together AI Data Stream states
  // const [suggestCount, setSuggestCount] = useState(0);
  const [answer1, setAnswer1] = useState(
    "This is just a placeholder for AI generated suggestions..."
  );
  const [answer2, setAnswer2] = useState(
    "This is just a placeholder for AI generated suggestions..."
  );
  const [answer3, setAnswer3] = useState(
    "This is just a placeholder for AI generated suggestions..."
  );
  const [isLoading, setIsLoading] = useState(false);
  //

  // Handle Submit for AI Suggestions
  async function handleSubmitAI(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setIsLoading(true);
    setAnswer1("");
    setAnswer2("");
    setAnswer3("");

    const res = await fetch("/api/suggest-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify({
      //     question: `Request No: ${suggestCount}. Create a different message from the previous request ${suggestCount - 1}.`,
      //   }
      // ),
    });
    // setSuggestCount(suggestCount + 1);
    if (!res.body) return;

    let buffer = ""; // store incoming text
    let parts: string[] = [];

    ChatCompletionStream.fromReadableStream(res.body)
      .on("content", (chunk: string) => {
        buffer += chunk; // keep adding to buffer
        parts = buffer.split("||"); // split by '||'

        // Set answers if all 3 parts are received
        if (parts.length >= 3) {
          setAnswer1(parts[0]);
          setAnswer2(parts[1]);
          setAnswer3(parts[2]);
        }
      })
      .on("end", () => setIsLoading(false));
  }

  //

  // Zod Implementation
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    mode: "onSubmit",
    defaultValues: {
      content: "",
    },
  });

  const params = useParams<{ username: string }>();
  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsSubmitting(true);
    try {
      // console.log(data);
      const { content } = data;
      // console.log(params);
      const { username } = params;
      const response = await axios.post<ApiResponse>("/api/send-message", {
        username,
        content,
      });
      // console.log(response);
      toast.success(`Message submitted successfully tp ${params.username}`, {
        description: response.data.message,
      });
    } catch (error) {
      console.log(error);
      console.error("Error in message submission", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;
      toast.error("Error in message submission", {
        description: errorMessage,
      });
    } finally {
      form.reset();
      setIsSubmitting(false);
    }
  };

  // Suggested message copier
  const { setValue } = form;

  const handSuggestClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const value = e.target.textContent;
    setValue("content", value);
  };

  return (
    <div className="flex flex-col justify-center items-center py-4 min-w-screen">
      <h1 className="m-6 text-4xl font-bold">Public Feedback Page</h1>
      <div className="w-full max-w-7/8 md:max-w-4/6 max-h-1/6 p-8 space-y-8 bg-white rounded-lg shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Message</FormLabel> */}
                  <FormControl>
                    <Input
                      type="content"
                      placeholder="Type your message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-center">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Send It"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="flex flex-col justify-center items-baseline py-4 w-full max-w-7/8 md:max-w-4/6">
        <Button disabled={isLoading} type="submit" onClick={handleSubmitAI}>
          Suggest Messages
        </Button>
        <Card
          className="px-2 my-3 py-1 cursor-pointer hover:bg-accent"
          onClick={handSuggestClick}
        >
          {" "}
          {isLoading ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <p>{answer1}</p>
          )}
        </Card>
        <Card
          className="px-2 my-3 py-1 cursor-pointer hover:bg-accent"
          onClick={handSuggestClick}
        >
          {" "}
          {isLoading ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <p>{answer2}</p>
          )}
        </Card>
        <Card
          className="px-2 my-3 py-1 cursor-pointer hover:bg-accent"
          onClick={handSuggestClick}
        >
          {" "}
          {isLoading ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <p>{answer3}</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Page;
