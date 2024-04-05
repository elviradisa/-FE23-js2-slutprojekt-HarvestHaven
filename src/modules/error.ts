function errorMessage(message: string) {
    const overlay = document.createElement('div') as HTMLDivElement;
    overlay.classList.add('errorOverlay');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.551)';
    overlay.style.zIndex = '1000';

    const errorMessageContainer = document.querySelector('#errorMessageContainer') as HTMLDivElement;
    errorMessageContainer.style.color = 'white';
    errorMessageContainer.style.width = '600px';
    errorMessageContainer.style.height = '300px';
    errorMessageContainer.style.gap = '20px';
    errorMessageContainer.style.display = 'flex';
    errorMessageContainer.style.alignItems = 'center';
    errorMessageContainer.style.justifyContent = 'center';
    errorMessageContainer.style.flexDirection = 'column';
    errorMessageContainer.style.backgroundColor = 'rgb(115, 168, 115)';
    errorMessageContainer.style.borderRadius = '10px';

    const errorMessageText = document.createElement('p') as HTMLParagraphElement;
    errorMessageText.textContent = message;
    errorMessageText.style.fontSize = '25px';
    errorMessageText.style.textShadow = '1px 1px 2px black'

    const errorMessageButton = document.createElement('button') as HTMLButtonElement;
    errorMessageButton.textContent = 'Close';
    errorMessageButton.style.padding = '10px';
    errorMessageButton.style.fontSize = '20px';
    errorMessageButton.style.borderRadius = '10px';
    errorMessageButton.addEventListener('click', () => {
        overlay.style.display = 'none';
    })

    setTimeout(() => {
        overlay.style.display = 'none';
    }, 3000);

    overlay.appendChild(errorMessageContainer);
    errorMessageContainer.appendChild(errorMessageText);
    errorMessageContainer.appendChild(errorMessageButton);
    document.body.appendChild(overlay);
}

export { errorMessage };