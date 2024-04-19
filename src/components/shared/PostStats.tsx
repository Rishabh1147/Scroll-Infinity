import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from '@/lib/react-query/queriesandmutation';
import { checkIsLiked } from '@/lib/utils';
import { Models } from 'appwrite';
import React, { useState, useEffect } from 'react'

type PostStatsProps ={
    post?: Models.Document;
    userId: string;
}
const PostStats = ({post,userId} : PostStatsProps) => {
    const likesList = post?.likes.map((user: Models.Document) => user.$id)
    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);
    const {mutate: likePost} = useLikePost();
    const {mutate: savePost} = useSavePost();
    const {mutate: deleteSavedPost} = useDeleteSavedPost();
    const {data: currentUser} = useGetCurrentUser();
    const savePostRecord = currentUser?.save.find((record : Models.Document) => record.post.$id ===
    post?.$id);

    useEffect(() => {
        setIsSaved(!!savePostRecord);
    }, [currentUser])

    const handleLikePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();

        let likesArray = [...likes];
        if (likesArray.includes(userId)) {
          likesArray = likesArray.filter((Id) => Id !== userId);
        } else {
          likesArray.push(userId);
        }
        setLikes(likesArray);
        likePost({ postId: post?.$id || ' ', likesArray });
      };

    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation();
        if(savePostRecord ){
            setIsSaved(false);
            deleteSavedPost(savePostRecord.$id);
        }else{
            savePost({postId:post?.$id || '', userId});
            setIsSaved(true);
        }
    }

    const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <div className="flex gap-2 mr-5">
        <img 
            src= {checkIsLiked(likes,userId) 
            ? "/assets/icons/liked.svg"
            : "/assets/icons/like.svg" 
        }
            alt="Like" 
            width={20}
            height={20}
            onClick={ handleLikePost }
            className="cursor-pointer"
        />
        <p className="small-medium lg: base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        <img 
            src= { isSaved 
                ? "/assets/icons/saved.svg"
                : "/assets/icons/save.svg" 
            } 
            alt="save" 
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={(e) => handleSavePost(e)}
        />
      </div>
    </div>
  )
}

export default PostStats
