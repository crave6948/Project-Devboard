function UserCard({ name, email }) {
    // ดึงตัวอักษรแรกมาทำ avatar
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("");

    let avatarColor = "#1e40af"; // A-G = น้ำเงิน (default)
    const firstChar = email.charAt(0).toUpperCase();
    if (firstChar >= "H" && firstChar <= "N") {
        avatarColor = "#16a34a"; // H-N = เขียว
    } else if (firstChar >= "O" && firstChar <= "Z") {
        avatarColor = "#7e22ce"; // O-Z = ม่วง
    }

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                marginBottom: "0.75rem",
                background: "white",
            }}
        >
            <div
                style={{
                    width: "40px",
                    height: "40px",
                    background: avatarColor,
                    color: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                }}
            >
                {initials}
            </div>
            <div>
                <div style={{ fontWeight: "bold", color: "#2d3748" }}>{name}</div>
                <div style={{ fontSize: "0.85rem", color: "#718096" }}>{email}</div>
            </div>
        </div>
    );
}

export default UserCard;
