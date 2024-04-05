import { postNewUser } from "./fetch";
import { errorMessage } from "./error";

type NewUser = {
    username: string,
    password: string,
    userImage: string      
}

let profileImage = ''; //global variabel för att spara bilden

const chooseProfilePicture = document.querySelector('.profile-images') as HTMLElement;
const signupPElement = document.querySelector('.signupPElement') as HTMLParagraphElement;
const chickenImg = document.querySelector('.chick-profile') as HTMLDivElement;
const cowImg = document.querySelector('.cow-profile') as HTMLDivElement;
const pigImg = document.querySelector('.pig-profile') as HTMLDivElement;

chooseProfilePicture.addEventListener('click', (event) => {
    if (event.target == chickenImg) {
        chickenImg.style.border = '3px solid rgb(115, 168, 115)';
        chickenImg.style.boxSizing = 'border-box';
        cowImg.style.border = 'none';
        pigImg.style.border = 'none';
        console.log('chicken')
    } else if (event.target == cowImg) {
        cowImg.style.border = '3px solid rgb(115, 168, 115)';
        cowImg.style.boxSizing = 'border-box';
        pigImg.style.border = 'none';
        chickenImg.style.border = 'none';
        console.log('cow')
    } else if (event.target === pigImg) {
        pigImg.style.border = '3px solid rgb(115, 168, 115)';
        pigImg.style.boxSizing = 'border-box';
        cowImg.style.border = 'none';
        chickenImg.style.border = 'none';
        console.log('pig');
    }
})

const signUpForm = document.querySelector('#signup-form') as HTMLFormElement;
signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const userInput = document.querySelector('#createUsername-form') as HTMLInputElement;
    const passwordInput = document.querySelector('#createPassword-form') as HTMLInputElement;

    const userInputValue = userInput.value;
    const passwordInputValue = passwordInput.value;
    console.log(userInputValue)
    console.log(passwordInputValue)

    if (!userInputValue || !passwordInputValue) {
        errorMessage('Please fill out both username and password!');
        signUpForm.reset();
        return;
    } 

    const newUser: NewUser = {
        username: userInputValue,
        password: passwordInputValue,
        userImage: profileImage //skickar med den valda bilden i objektet
    }
    console.log(newUser)

    try {
        const createNewUser = await postNewUser(newUser);
        if (createNewUser && createNewUser.name) {
            console.log('Successful signup!');
            localStorage.setItem('profileImage', profileImage);
            window.location.href = "http://localhost:1234/home.html";
        } else {
            throw new Error('Signup failed');
        }
    } catch (error) {
        errorMessage('Signup failed, please try again!');
    }
    signUpForm.reset();
});

const displayChickenImage = document.querySelector('.selected-chick') as HTMLElement;
const displayCowImage = document.querySelector('.selected-cow') as HTMLElement;
const displayPigImage = document.querySelector('.selected-pig') as HTMLElement;

chickenImg.addEventListener('click', () => {
    displayChickenImage.style.display = 'block';
    displayCowImage.style.display = 'none';
    displayPigImage.style.display = 'none';
    signupPElement.style.display = 'none';
    profileImage = 'chicken'; //sparar värdet i globala variabeln när man trycker på en bild
})

cowImg.addEventListener('click', () => {
    displayCowImage.style.display = 'block';
    displayPigImage.style.display = 'none';
    displayChickenImage.style.display = 'none';
    signupPElement.style.display = 'none';
    profileImage = 'cow';
})

pigImg.addEventListener('click', () => {
    displayPigImage.style.display = 'block';
    displayCowImage.style.display = 'none';
    displayChickenImage.style.display = 'none';
    signupPElement.style.display = 'none';
    profileImage = 'pig';
})
