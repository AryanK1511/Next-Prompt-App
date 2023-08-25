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
    const userName = searchParams.get("name");

    const [posts, setPosts] = useState([]);
    const [name, setName] = useState(userName);

    useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch(`/api/users/${userId}/posts`);
        const data = await response.json();
        setPosts(data);
      };
  
      fetchPosts();
    }, []);

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}'s Posts</span>
      </h1>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  )
}

export default UserProfile