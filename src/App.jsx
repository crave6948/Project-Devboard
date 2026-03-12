import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import UserList from "./components/UserList";
import AddPostForm from "./components/AddPostForm";

function App() {
  const [favorites, setFavorites] = useState([]); // เก็บ id ที่ถูกใจ

  function loadFavorites() {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }
  function saveFavorites(favList) {
    localStorage.setItem("favorites", JSON.stringify(favList));
  }

  let once = false;
  // เมื่อตอนโหลดแอป ให้โหลดข้อมูลถูกใจจาก localStorage
  useEffect(() => {
    if (!once) {
      loadFavorites();
      once = true;
    }
  }, []);

  // เมื่อ favorites เปลี่ยนแปลง ให้บันทึกลง localStorage ทันที
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]); // ติดตามเฉพาะ favorites

  // Toggle ถูกใจ/ยกเลิก
  function handleToggleFavorite(postId) {
    setFavorites(
      (prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId) // ลบออก
          : [...prev, postId], // เพิ่มเข้า
    );
  }

  // เพิ่มโพสต์ใหม่
  function handleAddPost({ title, body }) {
    const newPost = {
      id: Date.now(), // ใช้ timestamp เป็น id ชั่วคราว
      title,
      body,
    };
    setPosts((prev) => [newPost, ...prev]); // เพิ่มไว้ด้านบน
  }

  return (
    <div>
      <Navbar favoriteCount={favorites.length} />
      <div
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "0 1rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
        }}
      >
        {/* คอลัมน์ซ้าย */}
        <div>
          <AddPostForm onAddPost={handleAddPost} />
          <PostList
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>

        {/* คอลัมน์ขวา */}
        <div>
          <UserList />
        </div>
      </div>
    </div>
  );
}

export default App;
