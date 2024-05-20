document.getElementById('number-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const quantity = parseInt(document.getElementById('quantity').value);
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);
    const canRepeat = document.getElementById('unique').value === 'false';
    const sort = document.getElementById('sort').value === 'true';

    const resultContainer = document.getElementById('result');

    if (min > max) {
        resultContainer.textContent = 'Invalid range: min should be less than or equal to max.';
        return;
    }

    if (!canRepeat && quantity > (max - min + 1)) {
        resultContainer.textContent = 'Invalid request: not enough unique numbers in the specified range.';
        return;
    }

    const numbers = generateRandomNumbers(quantity, min, max, canRepeat);
    if (sort) {
        numbers.sort((a, b) => a - b);
    }
    resultContainer.textContent = numbers.join(', ');
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

// Language JSON file
const translations = {
    en: {
        title: "Random Number Generator",
        headerTitle: "Random Number Generator",
        legendQuantity: "Numbers to generate",
        legendMin: "Minimum number",
        legendMax: "Maximum number",
        legendSort: "Sort",
        sortNo: "No",
        sortYes: "Yes",
        legendUnique: "Unique",
        uniqueNo: "No",
        uniqueYes: "Yes",
        generateButton: "Generate",
        outputTitle: "Generated Numbers:",
    },
    pl: {
        title: "Generator Liczb Losowych",
        headerTitle: "Generator Liczb Losowych",
        legendQuantity: "Liczby do wygenerowania",
        legendMin: "Minimalna liczba",
        legendMax: "Maksymalna liczba",
        legendSort: "Sortuj",
        sortNo: "Nie",
        sortYes: "Tak",
        legendUnique: "Unikalne",
        uniqueNo: "Nie",
        uniqueYes: "Tak",
        generateButton: "Generuj",
        outputTitle: "Wygenerowane liczby:",
    }
};

document.querySelectorAll('.lang-button').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        translatePage(lang);
    });
});

function translatePage(lang) {
    document.getElementById('title').textContent = translations[lang].title;
    document.getElementById('header-title').textContent = translations[lang].headerTitle;
    document.getElementById('legend-quantity').textContent = translations[lang].legendQuantity;
    document.getElementById('legend-min').textContent = translations[lang].legendMin;
    document.getElementById('legend-max').textContent = translations[lang].legendMax;
    document.getElementById('legend-sort').textContent = translations[lang].legendSort;
    document.getElementById('sort-no').textContent = translations[lang].sortNo;
    document.getElementById('sort-yes').textContent = translations[lang].sortYes;
    document.getElementById('legend-unique').textContent = translations[lang].legendUnique;
    document.getElementById('unique-no').textContent = translations[lang].uniqueNo;
    document.getElementById('unique-yes').textContent = translations[lang].uniqueYes;
    document.getElementById('generate-button').textContent = translations[lang].generateButton;
    document.getElementById('output-title').textContent = translations[lang].outputTitle;
}

// Initialize the page with English language
translatePage('en');
