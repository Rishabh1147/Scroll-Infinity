import { z } from "zod";
import { Link, useNavigate} from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"

// import React from 'react';
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { SignupValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { useCreateUserAccount, useSignInAccount} from "@/lib/react-query/queriesandmutation";
import { useUserContext } from "@/context/AuthContext";



const SignUpForm = () => {
  const { toast } = useToast();
  const {checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();
 
  const { mutateAsync : createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn} = useSignInAccount();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })
 
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);

    if(!newUser){
      return  toast({ title: 'Sign up failed. Please try again.'})
    }
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if(!session){
      return  toast({ title: 'Sign up failed. Please try again.'})
    }
    const isLoggedIn = await checkAuthUser();
    console.log(isLoggedIn);
    if(isLoggedIn){
      navigate("/");
    }else{
      toast({ title: 'Sign up failed. Please try again.'});
      return;

    }
    
  }


  return (
     <Form {...form}>
      <div className= "sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md: h2-bold pt-5 sm:pt-12">Create Your Account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To Use Scroll Infinity enter your details</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                  <Input type="text" className="shad-input" {...field} />
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
              { isCreatingAccount ? (
                <div className="flex-center gap-2">
                  <Loader/> Loading...
                </div>
              ): "SignUp"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1"> LogIn </Link>
            </p>
        </form>
      </div>
    </Form>
  )
}

export default SignUpForm
