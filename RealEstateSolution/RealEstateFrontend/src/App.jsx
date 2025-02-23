import React, { useState, useEffect } from "react";

function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedInUserName, setLoggedInUserName] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [logs, setLogs] = useState("");
    const [logFileName, setLogFileName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    "https://localhost:7209/api/authentication/me",
                    { credentials: "include" }
                );

                if (!response.ok) throw new Error("Not authenticated");

                const data = await response.json();
                setIsAuthenticated(true);
                setLoggedInUserName(data.username);
            } catch (error) {
                console.log("User not logged in or session expired.");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(
                "https://localhost:7209/api/authentication/authenticate",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userName: username,
                        password: password,
                    }),
                    credentials: "include",
                }
            );

            if (!response.ok) throw new Error("Invalid username or password");

            alert("Login successful!");
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Check credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleFetchLogs = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                "https://localhost:7209/api/admin/logs",
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!response.ok)
                throw new Error("Unauthorized or error fetching logs");

            const data = await response.json();
            setLogs(data.content);
            setLogFileName(data.fileName);
        } catch (error) {
            console.error("Error fetching logs:", error);
            alert("Failed to fetch logs.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setLogs("");
        alert("Logged out successfully!");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Application Logs monitor</h1>
            {loading && <p>Loading...</p>}
            {!isAuthenticated ? (
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        Login
                    </button>
                </form>
            ) : (
                <div>
                    <h2>Welcome! You are logged in as {loggedInUserName}.</h2>
                    <button onClick={handleFetchLogs} disabled={loading}>
                        Fetch Logs
                    </button>
                    <button onClick={handleLogout}>Logout</button>
                    <h2>{logFileName}</h2>
                    <pre>{logs}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
