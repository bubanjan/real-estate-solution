export const API_BASE_URL = "https://localhost:7209/api";

// Authentication and logs functions
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

// Estates functions
export const getEstates = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/estates`);
        if (!response.ok) throw new Error("Error fetching estates");
        return await response.json();
    } catch (error) {
        console.error("Error fetching estates:", error);
        return null;
    }
};

export const getEstateById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/estates/${id}`);
        if (!response.ok) throw new Error("Estate not found");
        return await response.json();
    } catch (error) {
        console.error("Error fetching estate:", error);
        return null;
    }
};

export const createEstate = async (estateData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/estates`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(estateData),
            credentials: "include",
        });
        if (!response.ok) throw new Error("Error creating estate");
        return await response.json();
    } catch (error) {
        console.error("Error creating estate:", error);
        return null;
    }
};
