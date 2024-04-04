export function errorMessage(message: string) {
    const errorMessageContainer = document.querySelector('#errorMessageContainer') as HTMLDivElement;
    const errorMessageDiv = document.createElement('div') as HTMLDivElement;
    const errorMessageText = document.createElement('p') as HTMLParagraphElement;
    const errorMessageButton = document.createElement('button') as HTMLButtonElement;

    errorMessageButton.textContent = 'Close';

    errorMessageContainer.innerHTML = '';

    errorMessageContainer.style.color = 'white';
    errorMessageContainer.style.width = '300px';
    errorMessageContainer.style.height = '300px';
    errorMessageContainer.style.gap = '20px';
    errorMessageContainer.style.display = 'flex';
    errorMessageContainer.style.alignItems = 'center';
    errorMessageContainer.style.justifyContent = 'center';
    errorMessageContainer.style.flexDirection = 'column';
    errorMessageContainer.style.backgroundColor = 'rgb(115, 168, 115)';

    errorMessageButton.addEventListener('click', () => {
        errorMessageContainer.style.display = 'none';
    })

    errorMessageContainer.appendChild(errorMessageDiv);
    errorMessageDiv.appendChild(errorMessageText);
    errorMessageDiv.appendChild(errorMessageButton);
}