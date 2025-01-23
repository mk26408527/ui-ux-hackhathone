"use client";

import { useState, SetStateAction } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Blog1() {
  const [comments, setComments] = useState([
    { name: "John Doe", text: "This is such an inspiring post! Thanks for sharing." },
    { name: "Jane Smith", text: "I loved reading about this trend. Looking forward to more posts like this!" },
  ]);

  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleNameChange = (e: { target: { value: SetStateAction<string> } }) => {
    setName(e.target.value);
  };

  const handleCommentChange = (e: { target: { value: SetStateAction<string> } }) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (name && commentText) {
      setComments([...comments, { name, text: commentText }]);
      setName("");
      setCommentText("");
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Blog Title */}
      <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-800">Going all-in with Millennial Design</h1>

      {/* Blog Image */}
      <div className="mb-10 flex justify-center">
        <Image
          src="/mainlaptop.png"
          alt="Blog post 1 cover"
          width={800}
          height={400}
          className="rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
        />
      </div>

      {/* Blog Content */}
      <div className="prose lg:prose-xl mx-auto mb-12 text-gray-700 leading-relaxed">
        <p>
          Explore how millennial designs are shaping the future of spaces. This new era of aesthetics emphasizes
          simplicity, sustainability, and functionality, creating a blend of beauty and purpose.
        </p>
        <p>
          Whether it’s the choice of colors or the furniture arrangement, millennials are setting trends that are here to
          stay. Minimalist interiors with vibrant accents are becoming the hallmark of this movement.
        </p>
        <p>
          Join us as we dive deeper into why millennial design is not just a trend but a lifestyle that resonates with the
          modern world.
        </p>
      </div>

      {/* Comment Section */}
      <div className="bg-gray-100 rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Comments</h2>

        {/* Existing Comments */}
        <div className="space-y-6 mb-8">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm transition-transform duration-300 hover:shadow-lg"
            >
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
