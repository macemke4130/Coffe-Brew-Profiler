const renavigateIfLoggedIn = () => {
    const isAuth = localStorage.getItem("authToken");
    if (isAuth) {
        console.log("Renavigate. Already logged in.");
        return true;
    } else {
        return false;
    }
}

export default renavigateIfLoggedIn;