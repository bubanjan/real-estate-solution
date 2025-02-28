import React, { useState } from "react";
import { fetchLogs } from "../api.js";
import { Container, Typography, Button, Box, Stack } from "@mui/material";

const Logs = () => {
    const [logs, setLogs] = useState("");
    const [logFileName, setLogFileName] = useState("");

    const handleFetchLogs = async () => {
        const data = await fetchLogs();
        if (data) {
            setLogs(data.content);
            setLogFileName(data.fileName);
        } else {
            alert("Failed to fetch logs.");
        }
    };

    return (
        <Stack>
            <Typography variant="h4">Application Logs</Typography>
            <Button onClick={handleFetchLogs} variant="contained">
                Fetch Logs
            </Button>
            <Box sx={{ bgcolor: "black", color: "lightGreen", p: 2, mt: 2 }}>
                <Typography variant="h6">{logFileName}</Typography>
                <pre>{logs}</pre>
            </Box>
        </Stack>
    );
};

export default Logs;
