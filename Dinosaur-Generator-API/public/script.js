console.log('script.js loaded');

document.querySelector('#btnGen').addEventListener('click', () => {
    if (document.querySelector('#dinoName') !== null) {
        document.querySelector('#dinoName').remove();
    };
    if (document.querySelector('#dinoImage') !== null) {
        document.querySelector('#dinoImage').remove();
    };
    
    getDinoName();
})



async function getDinoName() {
    const response = await fetch('/dinoname');
    const data = await response.json();
    let dinoName = data[0].join(' ');
    console.log(dinoName);
    
    let dinoNameDiv = document.createElement('div');
    dinoNameDiv.id = 'dinoName';
    dinoNameDiv.textContent = dinoName;
    document.querySelector('#dinoWrapper').appendChild(dinoNameDiv);

    getDinoImage();
};

async function getDinoImage() {
    const response = await fetch('/dinoimage');
    const data = await response.json();
    let randomNum = Math.floor(Math.random() * data.value.length);
    console.log(randomNum);
    let dinoImageData = data.value[randomNum];
    let dinoImageUrl = dinoImageData.contentUrl;
    console.log(dinoImageUrl);
    let dinoAlt = dinoImageData.name;

    let dinoImg = document.createElement('img');
    dinoImg.id = 'dinoImage';
    dinoImg.src = dinoImageUrl;
    dinoImg.alt = dinoAlt;
    document.querySelector('#dinoWrapper').appendChild(dinoImg);
    console.log(dinoImg);
};

