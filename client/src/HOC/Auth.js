import Cookies from 'universal-cookie';
import decode from 'jwt-decode';

const Auth = {
    isAuthenticated: false,
    getToken() {
        const cookies = new Cookies();
        const cookie = cookies.get('Authorization');
        return cookie;
    },
    authenticate() {
        try {
            const tk = this.getToken();
            const decoded = decode(tk);
            console.log(decoded.iat);
            console.log(Date.now() / 1000);

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