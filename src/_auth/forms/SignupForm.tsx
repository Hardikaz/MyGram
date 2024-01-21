import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { SingupValidation } from "@/lib/validation"
import { z } from "zod"
import { Loader } from "lucide-react"
import { createUserAccount } from "@/lib/appwrite/api"


const SignupForm = () => {
  const form = useForm<z.infer<typeof SingupValidation>>({
    resolver: zodResolver(SingupValidation),
    defaultValues: {
      name:'',
      username: '',
      email:'',
      password:'',
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SingupValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)

    const newUser=await createUserAccount(values);
    console.log(newUser);
  }
  const isLoading=false;
  return (
    
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="none"><path stroke="#000" stroke-linejoin="round" stroke-width="4" d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"/><circle cx="24" cy="24" r="6" fill="#2F88FF" stroke="#000" stroke-linejoin="round" stroke-width="4"/><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M30 24H44"/><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M4 24H18"/><circle cx="24" cy="24" r="2" fill="#fff"/></g></svg> */}

      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new user</h2>

      <p className="text-light-3 small-medium md:base-regular mt-2">To use MyGram enter your account details</p>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col gap-5 w-full mt-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text"className="shad-input" {...field} />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text"className="shad-input" {...field} />
            </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="Email"className="shad-input" {...field} />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password"className="shad-input" {...field} />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="shad-button_primary">
        {
          isLoading ? (
            <div className="flex-center gap-2">
             <Loader/> Loading...
            </div>
          ):"Sign up"
        }
      </Button>
      <p className="text-small-regular text-light-2 text-senter mt-2">
 Already have an account?
 <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
      </p>
    </form>
    </div>

  </Form>
  )
}

export default SignupForm