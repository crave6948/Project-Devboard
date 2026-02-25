import PostCard from "./PostCard";
import PostCount from "./PostCount";

function PostList({ posts }) {
    return (
        <section>
            <div style={{
                        borderBottom: "2px solid #1e40af",
                        paddingBottom: "0.5rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
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
            {posts.map((post) => (
                <PostCard key={post.id} title={post.title} body={post.body} />
            ))}
        </section>
    );
}

export default PostList;