document.getElementById('number-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const quantity = parseInt(document.getElementById('quantity').value);
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);
    const canRepeat = document.getElementById('unique').value === 'false';
    const sort = document.getElementById('sort').value === 'true';

    const resultContainer = document.getElementById('result');

    if (min > max) {
        resultContainer.textContent = translations[currentLang].invalidRange;
        return;
    }

    if (!canRepeat && quantity > (max - min + 1)) {
        resultContainer.textContent = translations[currentLang].invalidRequest;
        return;
    }

    const numbers = generateRandomNumbers(quantity, min, max, canRepeat);
    if (sort) {
        numbers.sort((a, b) => a - b);
    }

    resultContainer.innerHTML = formatNumbers(numbers);
});

function generateRandomNumbers(quantity, min, max, canRepeat) {
    const numbers = [];
    const numberSet = new Set();

    while (numbers.length < quantity) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

        if (canRepeat) {
            numbers.push(randomNum);
        } else {
            if (!numberSet.has(randomNum)) {
                numberSet.add(randomNum);
                numbers.push(randomNum);
            }
        }
    }
    return numbers;
}

function formatNumbers(numbers) {
    return numbers.join(', ');
}

// // // // // // // // 
// Translation Code
// // // // // // // // 

let translations = {};

async function loadLanguage() {
    const response = await fetch('language.json');
    translations = await response.json();
    translatePage('en');
}

document.querySelectorAll('.lang-button').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        translatePage(lang);
    });
});

function translatePage(currentLang) {
    document.getElementById('header-title').textContent = translations[currentLang].headerTitle;
    document.getElementById('legend-quantity').textContent = translations[currentLang].legendQuantity;
    document.getElementById('legend-min').textContent = translations[currentLang].legendMin;
    document.getElementById('legend-max').textContent = translations[currentLang].legendMax;
    document.getElementById('legend-sort').textContent = translations[currentLang].legendSort;
    document.getElementById('sort-no').textContent = translations[currentLang].sortNo;
    document.getElementById('sort-yes').textContent = translations[currentLang].sortYes;
    document.getElementById('legend-unique').textContent = translations[currentLang].legendUnique;
    document.getElementById('unique-no').textContent = translations[currentLang].uniqueNo;
    document.getElementById('unique-yes').textContent = translations[currentLang].uniqueYes;
    document.getElementById('generate-button').textContent = translations[currentLang].generateButton;
    document.getElementById('output-title').textContent = translations[currentLang].outputTitle;
    document.getElementById('sort').title = translations[currentLang].sortTitle;
    document.getElementById('unique').title = translations[currentLang].uniqueTitle;
}

loadLanguage();