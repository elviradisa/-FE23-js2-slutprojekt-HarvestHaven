const getStartedButton = document.querySelector('.home-signup-form-button') as HTMLButtonElement;
const loginSignupPage = document.querySelector('#login-signup') as HTMLElement;
const loginButton = document.querySelector('.home-login-button') as HTMLButtonElement;
const signupButton = document.querySelector('.home-signup-button') as HTMLButtonElement;

const homePage = document.querySelector('#home') as HTMLElement;

getStartedButton.addEventListener('click', (event) => {
    event.preventDefault();

    loginSignupPage.style.display = 'block';
    homePage.style.display = 'none';
    console.log('get started');
})

loginButton.addEventListener('click', () => {
    loginSignupPage.style.display = 'block';
    homePage.style.display = 'none';
    console.log('login page');
})

signupButton.addEventListener('click', () => {
    loginSignupPage.style.display = 'block';
    homePage.style.display = 'none';
    console.log('signup page');
})

type User = {
    "userImage": "string",
    "username": "string",
    "password": "string"
}

