import { z } from "zod";
import { Link, useNavigate} from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"

// import React from 'react';
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { SigninValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { useSignInAccount} from "@/lib/react-query/queriesandmutation";
import { useUserContext } from "@/context/AuthContext";



const SignInForm = () => {
  const { toast } = useToast();
  const {checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })
 
   
  const { mutateAsync: signInAccount} = useSignInAccount();
  
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if(!session){
      return  toast({ title: 'Sign in failed. Please try again.'})
    }
    const isLoggedIn = await checkAuthUser();
    console.log(isLoggedIn);
    if(isLoggedIn){
      navigate("/");
    }else{
      toast({ title: 'Sign in failed. Please try again.'});
      return;

    }
    
  }


  return (
     <Form {...form}>
      <div className= "sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md: h2-bold pt-5 sm:pt-12">Login to your Account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Welcome back! Please enter your details</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
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
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="shad-button_primary" type="submit">
              { isUserLoading ? (
                <div className="flex-center gap-2">
                  <Loader/> Loading...
                </div>
              ): "SignIn"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1"> SignUp</Link>
            </p>
        </form>
      </div>
    </Form>
  )
}

export default SignInForm
