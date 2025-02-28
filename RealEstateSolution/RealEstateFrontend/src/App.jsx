import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Typography, Button, TextField, Box, Stack } from "@mui/material";
import Navbar from "./components/Navbar";
import { checkAuth, loginUser, fetchLogs, logoutUser } from "./api";
import Estates from "./pages/Estates";
import EstateDetails from "./pages/EstateDetails";
import CreateEstate from "./pages/CreateEstate";
import Logs from "./pages/Logs";

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

    return (
        <Router>
            <Navbar
                isAuthenticated={isAuthenticated}
                handleLogout={handleLogout}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Stack maxWidth="md">
                                <Typography variant="h4">
                                    Welcome, {loggedInUserName}!
                                </Typography>
                                <Button
                                    onClick={handleFetchLogs}
                                    variant="contained"
                                >
                                    Fetch Logs
                                </Button>
                                <Box>
                                    <Typography variant="h6">
                                        {logFileName}
                                    </Typography>
                                    <pre>{logs}</pre>
                                </Box>
                            </Stack>
                        ) : (
                            <Stack maxWidth="md">
                                <Typography variant="h4">Login</Typography>
                                <form onSubmit={handleLogin}>
                                    <Box mb={2}>
                                        <TextField
                                            fullWidth
                                            label="Username"
                                            variant="outlined"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                    </Box>
                                    <Box mb={2}>
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            variant="outlined"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </Box>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={loading}
                                    >
                                        Login
                                    </Button>
                                </form>
                            </Stack>
                        )
                    }
                />
                <Route path="/logs" element={<Logs />} />
                <Route path="/estates" element={<Estates />} />
                <Route path="/estate/:id" element={<EstateDetails />} />
                <Route
                    path="/create-estate"
                    element={
                        isAuthenticated ? (
                            <CreateEstate />
                        ) : (
                            <Typography>Login required</Typography>
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
