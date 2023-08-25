"use client";

import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

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

const Feed = () => {
  const [searchText, setsearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleTagClick = (e) => {
    setsearchText(e);
  }

  const handleSearchChange = (e) => {
    setsearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
    console.log(posts);
  }, []);

  useEffect(() =>{
    if (searchText.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => {
        const lowercaseSearch = searchText.toLowerCase();
        const lowercasePrompt = post.prompt.toLowerCase();
        const lowercaseCreator = post.creator.username.toLowerCase();
        const lowercaseCreatorEmail = post.creator.email.toLowerCase();
        const lowercaseTag = post.tag.toLowerCase();
        return lowercasePrompt.includes(lowercaseSearch) || lowercaseCreator.includes(lowercaseSearch) || lowercaseTag.includes(lowercaseSearch) || lowercaseCreatorEmail.includes(lowercaseSearch);
      });
      setFilteredPosts(filtered);
    }
  }, [searchText, posts]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>


      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
