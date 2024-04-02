const homePage = document.querySelector('#home') as HTMLElement;
const loginForm = document.querySelector('#login-form') as HTMLElement;
const signupForm = document.querySelector('#signup-form') as HTMLElement;
const loginButton = document.querySelector('.home-login-button') as HTMLButtonElement;
const signupButton = document.querySelector('.home-signup-button') as HTMLButtonElement;
const getStartedForm = document.querySelector('#home-signup-form') as HTMLButtonElement;
const loginSignupPage = document.querySelector('#login-signup') as HTMLElement;
const getStartedUsername = document.querySelector('#createUsername-form') as HTMLInputElement;

getStartedForm.addEventListener('submit', (event) => {
    event.preventDefault();
    loginSignupPage.style.display = 'block';
    signupForm.style.display = 'flex';
    homePage.style.display = 'none';
    console.log('get started');

    const userInput = getStartedForm.value;
    getStartedUsername.innerText = userInput;
})

loginButton.addEventListener('click', () => {
    loginSignupPage.style.display = 'block';
    loginForm.style.display = 'flex';
    signupForm.style.display = 'none';
    homePage.style.display = 'none';
    console.log('login page');
})

signupButton.addEventListener('click', () => {
    loginSignupPage.style.display = 'block';
    signupForm.style.display = 'flex';
    loginForm.style.display = 'none';
    homePage.style.display = 'none';
    console.log('signup page');
})
