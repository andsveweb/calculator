const buttonsEl = document.querySelectorAll('button');
const inputFieldEl = document.getElementById('result');
const resultsListEl = document.getElementById('results-list');

window.addEventListener('load', () => {
    loadStoredCalculations();
});

for(let i = 0; i < buttonsEl.length; i++) {
    buttonsEl[i].addEventListener('click', () => {
        const buttonValue = buttonsEl[i].textContent;
        if(buttonValue === "C"){
            clearResult()
        } else if (buttonValue === "="){
            calculateResult()
            loadStoredCalculations();
        } else {
            appendValue(buttonValue)
        }
    })
}

function clearResult() {
    inputFieldEl.value = "";
}


function calculateResult() {
    const calculation = inputFieldEl.value;
    const result = eval(calculation);

    inputFieldEl.value = result;

    const resultItem = document.createElement('li');
    resultItem.textContent = `${calculation} = ${result}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button'); // Add the remove-button class
    removeButton.addEventListener('click', () => {
        removeCalculation(resultItem);
    });

    resultItem.appendChild(removeButton);
    resultsListEl.appendChild(resultItem);

    storeCalculation(calculation, result);
}  

 function appendValue(buttonValue) {
    inputFieldEl.value += buttonValue;
 }

 function storeCalculation(calculation, result) {
    const calculations = JSON.parse(localStorage.getItem('calculations')) || [];
    calculations.push({ calculation, result });
    localStorage.setItem('calculations', JSON.stringify(calculations));
}

function removeCalculation(resultItem) {
    const calculations = JSON.parse(localStorage.getItem('calculations')) || [];
    const index = Array.from(resultsListEl.children).indexOf(resultItem);
    
    if (index !== -1) {
        calculations.splice(index, 1);
        localStorage.setItem('calculations', JSON.stringify(calculations));
        resultItem.remove();
    }
}

function loadStoredCalculations() {
    resultsListEl.innerHTML = ''; // Clear the list before populating
    const calculations = JSON.parse(localStorage.getItem('calculations')) || [];
    calculations.forEach(({ calculation, result }) => {
        const resultItem = document.createElement('li');
        resultItem.textContent = `${calculation} = ${result}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => {
            removeCalculation(resultItem);
        });

        resultItem.appendChild(removeButton);
        resultsListEl.appendChild(resultItem);
    });
}


