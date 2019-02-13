import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'dev-w4qh6-qv.eu.auth0.com',
      clientID: 'aywzpahQ4VKJNy0Xrv3RCoUnOxhgRwK3',
      redirectUri: 'http://localhost:3000/callback',
      audience: 'https://dev-w4qh6-qv.eu.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid email'
    });
    this.authFlag = 'isLoggedIn';
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  signIn() {
    this.auth0.authorize();
  }

  login() {
    this.auth0.authorize();
  }

  signOut() {
    localStorage.setItem(this.authFlag, JSON.stringify(false));
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: 'aywzpahQ4VKJNy0Xrv3RCoUnOxhgRwK3',
    });
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    })
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    localStorage.setItem(this.authFlag, JSON.stringify(true));
  }

  logout() {
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: 'aywzpahQ4VKJNy0Xrv3RCoUnOxhgRwK3',
    });
  }

  silentAuth() {
    if(this.isAuthenticated()) {
      return new Promise((resolve, reject) => {
        this.auth0.checkSession({}, (err, authResult) => {
          if (err) {
            localStorage.removeItem(this.authFlag);
            return reject(err);
          }
          this.setSession(authResult);
          resolve();
        });
      });
    }
  }

  isAuthenticated() {
    // Check whether the current time is past the token's expiry time
    return JSON.parse(localStorage.getItem(this.authFlag));
  }
}

const auth = new Auth();

export default auth;