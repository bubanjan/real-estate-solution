export const API_BASE_URL = "https://localhost:7209/api";

export const checkAuth = async () => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/authentication/check-user`,
            {
                credentials: "include",
            }
        );

        if (!response.ok) throw new Error("Not authenticated");

        return await response.json();
    } catch (error) {
        console.log("User not logged in or session expired.");
        return null;
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/authentication/authenticate`,
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

        return true;
    } catch (error) {
        console.error("Login error:", error);
        return false;
    }
};

export const fetchLogs = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/logs`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok)
            throw new Error("Unauthorized or error fetching logs");

        return await response.json();
    } catch (error) {
        console.error("Error fetching logs:", error);
        return null;
    }
};

export const logoutUser = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/authentication/logout`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) throw new Error("Logout failed");

        return true;
    } catch (error) {
        console.error("Logout error:", error);
        return false;
    }
};
