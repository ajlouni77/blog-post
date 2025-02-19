// import React from "react";
// import { useSelector } from "react-redux";

// const PostList = () => {
//   const posts = useSelector((state) => state.posts);
//   return (
//     <div>
//       {posts.map((post) => (
//         <div key={post.id} className="p-4 border-b">
//           <h2 className="text-xl font-bold">{post.title}</h2>
//           <p>{post.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostList;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, addPostToFirebase } from "../slices/postsSlice";

const PostList = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // جلب المنشورات عند تحميل الصفحة
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      const newPost = { title, content, createdAt: new Date().toISOString() };
      dispatch(addPostToFirebase(newPost));
      setTitle("");
      setContent("");
      setShowForm(false);
    }
  };

  return (
    <div className="p-4">
      {/* زر إظهار وإخفاء نموذج إضافة منشور */}
      <button 
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
      >
        {showForm ? "إلغاء" : "إضافة منشور"}
      </button>

      {/* نموذج إضافة منشور */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
          <input 
            type="text" 
            placeholder="العنوان" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea 
            placeholder="المحتوى" 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <button 
            type="submit" 
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            نشر المنشور
          </button>
        </form>
      )}

      {/* عرض المنشورات */}
      <div>
        {posts.map((post) => (
          <div key={post.id} className="p-4 border-b">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
