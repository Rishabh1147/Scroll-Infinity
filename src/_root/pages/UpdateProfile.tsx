import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProfileValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById, useUpdateUser } from "@/lib/react-query/queriesandmutation";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import ProfileUploader from "@/components/shared/ProfileUploader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const UpdateProfile = () => {
  const { user, setUser } = useUserContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const {toast} = useToast();

  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  const { data: currentUser } = useGetUserById(id || "");
  const { mutateAsync: updateUser, isPending: isLoadingUpdate } =
    useUpdateUser();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

    const handleUpdate = async(value:z.infer<typeof ProfileValidation>) =>{
      const updatedUser = await updateUser({
        userId: currentUser.$id,
        name: value.name,
        bio: value.bio,
        file: value.file,
        imageURL: currentUser.imageURL,
        imageId: currentUser.imageId,
      });

      if (!updatedUser) {
        toast({
          title: `Update user failed. Please try again.`,
        });
      }

      setUser({
        ...user,
        name: updatedUser?.name,
        bio: updatedUser?.bio,
        imageURL: updatedUser?.imageURL,
      });
      return navigate(`/profile/${id}`);
    };

    // const handleUpdate = async (value: z.infer<typeof ProfileValidation>) => {
    //   const updatedUser = await updateUser({
    //     userId: currentUser.$id,
    //     name: value.name,
    //     bio: value.bio,
    //     file: value.file,
    //     imageUrl: currentUser.imageUrl,
    //     imageId: currentUser.imageId,
    //   });
  
    //   if (!updatedUser) {
    //     toast({
    //       title: `Update user failed. Please try again.`,
    //     });
    //   }
  
    //   setUser({
    //     ...user,
    //     name: updatedUser?.name,
    //     bio: updatedUser?.bio,
    //     imageUrl: updatedUser?.imageUrl,
    //   });
    //   return navigate(`/profile/${id}`);
    // };

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img 
            src="/assets/icons/edit.svg" 
            alt="Edit"
            width={36}
            height={36}
            className="invert-white" 
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex flex-col gap-7 w-full mt-4 max-w-5xl">
            
            <FormField
              control={form.control}
              name="file"
              render={({field}) => (
                <FormItem className="flex">
                  <FormLabel className="shad-form_label">Profile Picture</FormLabel>
                  <FormControl>
                    <ProfileUploader
                      fieldChange = {field.onChange}
                      mediaUrl = {currentUser.imageURL}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Name</FormLabel>
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
                  <FormLabel className="shad-form_label">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      {...field}
                      disabled
                    />
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
                  <FormLabel className="shad-form_label">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="shad-textarea custom-scrollbar"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <div className="flex gap-4 items-center justify-end">
              <Button
                type="button"
                className="shad-button_dark_4"
                onClick={() => navigate(-1)}>
                  Cancel
              </Button>

              <Button
               type="submit"
               className="shad-buttn-primary whitespace-nowrap"
               disabled = {isLoadingUpdate}
              >
                {isLoadingUpdate && <Loader/> }
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default UpdateProfile
