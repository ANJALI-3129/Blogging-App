import { useState, useRef, useEffect } from "react";
import "./blog.css";

import { db } from "./firebaseinit";

import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";

export default function Blog() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Blog",
  });

  const [blogs, setBlogs] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);

  const titleRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    try {
      if (isEditing) {
        const blogRef = doc(db, "blogs", currentBlogId);

        await updateDoc(blogRef, {
          title: formData.title,
          content: formData.content,
          category: formData.category || "Blog",
        });

        setIsEditing(false);
        setCurrentBlogId(null);
      } else {
        const docRef = doc(collection(db, "blogs"));

        await setDoc(docRef, {
          title: formData.title,
          content: formData.content,
          category: formData.category,
          createdOn: new Date(),
        });
      }

      setFormData({
        title: "",
        content: "",
        category: "Blog",
      });

      titleRef.current.focus();
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function removeBlog(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "blogs", id));
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  }

  function editBlog(blog) {
    setFormData({
      title: blog.title,
      content: blog.content,
      category: blog.category || "Blog",
    });

    setIsEditing(true);
    setCurrentBlogId(blog.id);

    titleRef.current.focus();
  }

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdOn", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blogData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBlogs(blogData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.title =
      blogs.length > 0 ? blogs[0].title : "Developer Community Platform";
  }, [blogs]);

  return (
    <div className="container">
      <div className="navbar">
        <div className="logo">
          <h2>Blogging Platform</h2>
          <p>Write • Share • Showcase</p>
        </div>
      </div>

      <h1>Write a Blog</h1>

      <div className="section">
        <form onSubmit={handleSubmit}>
          <Row label="Title">
            <input
              type="text"
              name="title"
              className="input"
              placeholder="Enter title..."
              value={formData.title}
              onChange={handleChange}
              ref={titleRef}
              required
            />
          </Row>

          <Row label="Content">
            <textarea
              name="content"
              className="input content"
              placeholder="Write your content..."
              value={formData.content}
              onChange={handleChange}
              maxLength={500}
              required
            />
          </Row>

          <p className="char-count">{formData.content.length}/500 Characters</p>

          <button type="submit" className="btn">
            {isEditing ? "Update Post" : "Add Post"}
          </button>
        </form>
      </div>

      <hr />

      <h2>Blogs</h2>

      {blogs.length === 0 ? (
        <p className="empty">No blogs available</p>
      ) : (
        blogs.map((blog) => (
          <div className="blog" key={blog.id}>
            <h3>{blog.title}</h3>

            <p>{blog.content}</p>

            <div className="blog-btn">
              <button className="btn edit" onClick={() => editBlog(blog)}>
                Edit
              </button>

              <button
                className="btn remove"
                onClick={() => removeBlog(blog.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="row">
      <label>
        {label}
        <br />
        {children}
      </label>
    </div>
  );
}
