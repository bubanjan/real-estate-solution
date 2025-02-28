import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, handleLogout }) => {
    return (
        <AppBar position="sticky">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6">Real Estate Management</Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    {isAuthenticated && (
                        <>
                            <Button color="inherit" component={Link} to="/logs">
                                Logs
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/estates"
                            >
                                Estates
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/create-estate"
                            >
                                Add Estate
                            </Button>
                            <Button color="secondary" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
