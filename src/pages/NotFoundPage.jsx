import { Link } from 'react-router-dom';


function NotFoundPage() {
    return (
        <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">← กลับหน้าหลัก</Link>
        </div>
    );
}

export default NotFoundPage;