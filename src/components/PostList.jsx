import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";
import PostCount from "./PostCount";

function PostList({ favorites, onToggleFavorite }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
      const data = await res.json();
      setPosts(data.slice(0, 20)); // เอาแค่ 20 รายการแรก
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  fetchPosts();
  }, []); // [] = ทำครั้งเดียวตอน component mount

  // กรองโพสต์ตาม search
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

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
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;