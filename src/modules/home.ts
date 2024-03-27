const homePage = document.querySelector('#home') as HTMLElement;
const loginForm = document.querySelector('#login-form') as HTMLElement;
const signupForm = document.querySelector('#signup-form') as HTMLElement;
const loginButton = document.querySelector('.home-login-button') as HTMLButtonElement;
const signupButton = document.querySelector('.home-signup-button') as HTMLButtonElement;
const loginSignupPage = document.querySelector('#login-signup') as HTMLElement;
const getStartedButton = document.querySelector('#home-signup-form') as HTMLButtonElement;

getStartedButton.addEventListener('submit', (event) => {
    event.preventDefault();

    loginSignupPage.style.display = 'block';
    signupForm.style.display = 'flex';
    homePage.style.display = 'none';
    console.log('get started');
})

loginButton.addEventListener('click', () => {
    loginSignupPage.style.display = 'block';
    loginForm.style.display = 'flex';
    homePage.style.display = 'none';

    const loginButton = document.createElement('p');
    loginButton.classList.add('loginButton');
    loginButton.textContent = 'Login';
    loginForm.prepend(loginButton);
    console.log('login page');
})

signupButton.addEventListener('click', () => {
    loginSignupPage.style.display = 'block';
    signupForm.style.display = 'flex';
    homePage.style.display = 'none';

    const signupButton = document.createElement('p');
    signupButton.classList.add('signupButton');
    signupButton.textContent = 'Sign Up';
    signupForm.prepend(signupButton);
    console.log('signup page');
})

// type User = {
//     "userImage": "string",
//     "username": "string",
//     "password": "string"
// }
