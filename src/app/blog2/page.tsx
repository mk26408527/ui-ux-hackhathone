'use client'

/* eslint-disable react/no-unescaped-entities */
import { SetStateAction, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Blog2() {
  const [comments, setComments] = useState([
    { name: "Alice Johnson", text: "Amazing insights on decorating! I loved this blog." },
    { name: "Mark Thompson", text: "Great ideas for modern interior decor. Thanks for sharing!" },
  ]);
  
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleNameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setName(e.target.value);
  };

  const handleCommentChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (name && commentText) {
      setComments([...comments, { name, text: commentText }]);
      setName(""); // Clear the name input
      setCommentText(""); // Clear the comment input
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Blog Title */}
      <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-800">Exploring New Ways of Decorating</h1>

      {/* Blog Image */}
      <div className="mb-10 flex justify-center">
        <Image
          src="/blogbook.png"
          alt="Blog post 2 cover"
          width={600} // Reduced width
          height={300} // Reduced height
          className="rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
        />
      </div>

      {/* Blog Content */}
      <div className="prose lg:prose-xl mx-auto mb-12 text-gray-700 leading-relaxed">
        <p>
          Welcome to Blog Post 2. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
        <p>
          In this blog post, we will explore various innovative ways to decorate your living space. From minimalistic
          designs to vibrant color palettes, the possibilities are endless. Whether you prefer a cozy, rustic feel or a
          sleek, modern aesthetic, there are countless ideas to inspire your next home project.
        </p>
        <p>
          One popular trend is the use of natural materials. Incorporating wood, stone, and plants can create a warm and
          inviting atmosphere. Additionally, mixing textures can add depth and interest to your decor. Consider using
          woven baskets, soft textiles, and metallic accents to achieve a balanced look.
        </p>
        <p>
          Another approach is to personalize your space with art and photographs. Displaying pieces that resonate with you
          can make your home feel uniquely yours. Don't be afraid to experiment with different arrangements and styles
          to find what works best for you.
        </p>
      </div>

      {/* Comment Section */}
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Comments</h2>

        {/* Existing Comments */}
        <div className="space-y-6 mb-8">
          {comments.map((comment, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded -lg shadow-sm transition-transform duration-300 hover:shadow-lg">
              <h3 className="font-semibold text-gray-800">{comment.name}</h3>
              <p className="text-gray-600">{comment.text}</p>
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Add a Comment</h3>
          <div className="space-y-4">
            <Input 
              value={name} 
              onChange={handleNameChange} 
              placeholder="Your Name" 
              className="w-full border-gray-300 focus:ring-primary focus:border-primary" 
            />
            <textarea
              value={commentText}
              onChange={handleCommentChange}
              className="w-full rounded-lg border-gray-300 shadow-sm p-3 focus:ring-primary focus:border-primary"
              rows={4}
              placeholder="Your Comment"
            />
            <Button 
              type="submit" 
              className="w-full bg-primary text-white hover:bg-primary/90 transition-colors duration-300 rounded-lg shadow-md"
            >
              Submit Comment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}