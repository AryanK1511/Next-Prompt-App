"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PromptCard from '@components/PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const UserProfile = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get("id");
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch(`/api/users/${userId}/posts`);
        const data = await response.json();
        setPosts(data);
      };
  
      fetchPosts();
      console.log(posts);
    }, []);

  return (
    <section className='feed'>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  )
}

export default UserProfile