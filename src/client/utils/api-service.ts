const apiService = async <T = any>(uri: string, method: "GET" | "POST" | "PUT" = "GET", body?: {}) => {
    const headers: any = {    };
    const options: any = {
        method,
        headers
    };

    const token = localStorage.getItem("token");

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (method === "POST" || method === "PUT") {
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    try {
        const res = await fetch(uri, options);

        if (res.status === 404) {
            throw new Error("Check URI and Server Path.");
        }

        if (res.status === 401) {
            localStorage.removeItem('token');
            throw new Error("Check Local Storage or Server Endpoint.");
        }

        if (res.status === 500) {
            throw new Error("Check Server Terminal.");
        }

        if (res.ok) {
            return <T>await res.json();
        }
    } catch (e) {
        console.error(e);
    }
};

export default apiService;