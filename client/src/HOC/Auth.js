import Cookies from 'js-cookie';
import decode from 'jwt-decode';

const Auth = {
    isAuthenticated: false,
    getToken() {
        const cookie = Cookies.get('Authorization');
        
        return cookie;
    },
    authenticate() {
        try {
            const tk = this.getToken();
            const decoded = decode(tk);
            if (decoded.iat < Date.now() / 1000) {
                return this.isAuthenticated = true;
            }
        } catch (error) {
            return this.isAuthenticated = false;
        }
    },
    logout() {
        this.isAuthenticated = false;
    },
    getAuth() {
        return this.isAuthenticated;
    }
};
export default Auth;