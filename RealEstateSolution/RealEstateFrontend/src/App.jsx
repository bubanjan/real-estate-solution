import React, { useState, useEffect } from "react";
import { Typography, Button, TextField, Box, Stack } from "@mui/material";
import { checkAuth, loginUser, fetchLogs, logoutUser } from "./api";

function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedInUserName, setLoggedInUserName] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [logs, setLogs] = useState("");
    const [logFileName, setLogFileName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            setLoading(true);
            const data = await checkAuth();
            if (data) {
                setIsAuthenticated(true);
                setLoggedInUserName(data.username);
            }
            setLoading(false);
        };
        verifyAuth();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await loginUser(username, password);
        if (success) {
            setIsAuthenticated(true);
        } else {
            alert("Login failed. Check credentials.");
        }
        setLoading(false);
    };

    const handleFetchLogs = async () => {
        setLoading(true);
        const data = await fetchLogs();
        if (data) {
            setLogs(data.content);
            setLogFileName(data.fileName);
        } else {
            alert("Failed to fetch logs.");
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        setLoading(true);
        const success = await logoutUser();
        if (success) {
            setIsAuthenticated(false);
            setLoggedInUserName("");
            setLogs("");
        } else {
            alert("Failed to log out.");
        }
        setLoading(false);
    };

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
