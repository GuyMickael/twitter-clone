import React from 'react';
import { api } from '~/utils/api';
import Loading from './Loading';
import PostView from './PostView';

const Feed = () => {
  const {data, isLoading : postsLoading} =  api.post.getAll.useQuery();
 
  if (postsLoading) return <Loading />
  
  return (       
      <div className="flex flex-col">
      {data?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id}/>
        ))}
    </div>  
  );
};

export default Feed;