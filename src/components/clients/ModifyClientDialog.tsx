"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil } from "lucide-react"
import { Prisma } from "@prisma/client"
import { useTransition } from "react"
import { updateClient } from "@/actions/client"

const formSchema = z.object({
  name: z.string().min(3).max(255),
}) satisfies z.ZodType<Prisma.ClientUpdateInput>

type ModifyClientDialogProps = {
  client: z.infer<typeof formSchema> & { id: string }
}

export default function ModifyClientDialog({ client }: ModifyClientDialogProps) {
  const [isPending, startTransition] = useTransition();
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: client.name,
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      await updateClient({ clientId: client.id, clientData: values });
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="gap-2">
          Modify Client
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                Modify client name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      </DialogContent>
    </Dialog>
    
  )
}
