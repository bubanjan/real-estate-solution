import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Button,
    TextField,
    Box,
    Paper,
    Stack,
} from "@mui/material";

function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedInUserName, setLoggedInUserName] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [logs, setLogs] = useState("");
    const [logFileName, setLogFileName] = useState("");
    const [loading, setLoading] = useState(false);

    const styles = {
        container: {
            bgcolor: "black",
            color: "lightGreen",
            p: 2,
            fontFamily: "Courier New, monospace",
            minHeight: "100vh",
        },
        title: {
            color: "lightGreen",
        },
        loading: {
            color: "yellow",
        },
        inputField: {
            input: { color: "green" },
            bgcolor: "black",
            borderColor: "lightGreen",
            fieldset: { borderColor: "green" },
        },
        loginButton: {
            bgcolor: "green",
            color: "black",
        },
        fetchLogsButton: {
            bgcolor: "lightGreen",
            color: "black",
            m: 1,
        },
        logoutButton: {
            color: "orange",
            borderColor: "orange",
        },
        paper: {
            bgcolor: "black",
            color: "lightGreen",
            p: 2,
            mt: 2,
            fontSize: "18px",
        },
    };

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    "https://localhost:7209/api/authentication/me",
                    {
                        credentials: "include",
                    }
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
    };

    return (
        <Stack maxWidth="md" sx={styles.container}>
            <Typography variant="h4" sx={styles.title}>
                Application Logs Monitor
            </Typography>
            {loading && <Typography sx={styles.loading}>Loading...</Typography>}
            {!isAuthenticated ? (
                <form onSubmit={handleLogin}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={styles.inputField}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={styles.inputField}
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={styles.loginButton}
                        disabled={loading}
                    >
                        Login
                    </Button>
                </form>
            ) : (
                <Box>
                    <Typography variant="h6">
                        Welcome! You are logged in as {loggedInUserName}
                    </Typography>
                    <Button
                        onClick={handleFetchLogs}
                        variant="contained"
                        sx={styles.fetchLogsButton}
                        disabled={loading}
                    >
                        Fetch Logs
                    </Button>
                    <Button
                        onClick={handleLogout}
                        variant="outlined"
                        sx={styles.logoutButton}
                    >
                        Logout
                    </Button>
                    <Box sx={styles.paper}>
                        <Typography variant="h6">{logFileName}</Typography>
                        <pre>{logs}</pre>
                    </Box>
                </Box>
            )}
        </Stack>
    );
}

export default App;
