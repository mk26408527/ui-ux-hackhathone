"use client";

/* eslint-disable react/no-unescaped-entities */
import { useState, SetStateAction } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Blog3() {
  const [comments, setComments] = useState([
    { name: "Eva Brown", text: "I found this post very enlightening. Keep up the good work!" },
    { name: "Michael Lee", text: "This topic is fascinating. I'd love to see more in-depth analysis." },
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
      <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-800">Handmade Pieces That Took Time to Make</h1>

      {/* Blog Image */}
      <div className="mb-10 flex justify-center">
        <Image
          src="/blog.png"
          alt="Blog post 3 cover"
          width={600} // Reduced width
          height={300} // Reduced height
          className="rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
        />
      </div>

      {/* Blog Content */}
      <div className="prose lg:prose-xl mx-auto mb-12 text-gray-700 leading-relaxed">
        <p>
          This is Blog Post 3. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
          nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit
          esse quam nihil molestiae consequatur.
        </p>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
          corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
          culpa qui officia deserunt mollitia animi.
        </p>
        <p>
          Handmade pieces are a timeless art form. They reflect the dedication and craftsmanship of their creators,
          making them unique and valuable. Each piece tells a story, connecting the creator's vision to the admirer’s
          heart.
        </p>
        <p>
          Embrace the charm of handmade items, and let them add warmth and character to your home or workspace.
        </p>
      </div>

      {/* Comment Section */}
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Comments</h2>

        {/* Existing Comments */}
        <div className="space-y-6 mb-8">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg shadow-sm transition-transform duration-300 hover:shadow-lg"
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
              Comment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
