

const Logout = () => {
    sessionStorage.setItem('kinoToken', '');
    window.location.href= "/login";
    return;
}
export default Logout;