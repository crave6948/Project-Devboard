import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";
import PostCount from "./PostCount";
import useFetch from "../hooks/useFetch";
import { useFavorites } from "../context/FavoritesContext";

function PostList() {
  const { favorites, toggleFavorite } = useFavorites();
  const { data: posts, loading, error } = useFetch("https://jsonplaceholder.typicode.com/posts");

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
  <div
  style={{
    padding: "1.5rem",
    background: "#fff5f5",
    border: "1px solid #fc8181",
    borderRadius: "8px",
    color: "#c53030",
  }}
  >
      เกิดข้อผิดพลาด: {error}
    </div>
  );
  const limitedPosts = posts.slice(0, 20);

  // กรองโพสต์ตาม search
  const filtered = limitedPosts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  // เรียงโพสต์ตาม id (id มากกว่า = ใหม่กว่า)
  const sortedPosts = [...filtered].sort((a, b) =>
    sortOrder === "desc" ? b.id - a.id : a.id - b.id,
  );

  function handleToggleSort() {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  }

  return (
    <div>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #1e40af",
        marginBottom: "1rem",
      }}>
        <h2
          style={{
            color: "#2d3748",
          }}
        >
          โพสต์ล่าสุด
        </h2>
        <PostCount count={posts.length} />
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={handleToggleSort}
        style={{
          background: "#eff6ff",
          color: "#1e40af",
          border: "1px solid #bfdbfe",
          borderRadius: "6px",
          padding: "0.45rem 0.8rem",
          cursor: "pointer",
          marginBottom: "1rem",
          fontSize: "0.95rem",
          fontWeight: 600,
        }}
      >
        {sortOrder === "desc" ? "🔽 ใหม่สุดก่อน" : "🔼 เก่าสุดก่อน"}
      </button>

      {/* ถ้าไม่พบโพสต์ */}
      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* แสดงรายการโพสต์ */}
      {sortedPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => toggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;