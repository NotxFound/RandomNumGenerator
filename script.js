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

    resultContainer.innerHTML = numbers.join(', ');
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


document.getElementById('copy-button').addEventListener('click', function() {
    const resultContainer = document.getElementById('result');
    const textToCopy = resultContainer.textContent;

    if (!textToCopy) {
        alert(translations[currentLang].nothingToCopy);
        return;
    }

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert(translations[currentLang].copiedToClipboard);
        })
        .catch(err => {
            alert(translations[currentLang].failedToCopy + err);
        });
});

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

function translatePage(Language) {
    currentLang = Language;
    document.getElementById('header-title').textContent = translations[Language].headerTitle;
    document.getElementById('legend-quantity').textContent = translations[Language].legendQuantity;
    document.getElementById('legend-min').textContent = translations[Language].legendMin;
    document.getElementById('legend-max').textContent = translations[Language].legendMax;
    document.getElementById('legend-sort').textContent = translations[Language].legendSort;
    document.getElementById('sort-no').textContent = translations[Language].sortNo;
    document.getElementById('sort-yes').textContent = translations[Language].sortYes;
    document.getElementById('legend-unique').textContent = translations[Language].legendUnique;
    document.getElementById('unique-no').textContent = translations[Language].uniqueNo;
    document.getElementById('unique-yes').textContent = translations[Language].uniqueYes;
    document.getElementById('generate-button').textContent = translations[Language].generateButton;
    document.getElementById('output-title').textContent = translations[Language].outputTitle;
    document.getElementById('copy-button').textContent = translations[Language].copyButton;
}

loadLanguage();