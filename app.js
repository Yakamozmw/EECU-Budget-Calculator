const arrayOfSelectors = document.querySelector(".Page-Selector").children;
const arrayOfFields = document.querySelector('#inputFields').children;
const incomeInputs = document.querySelectorAll('#incomes input');
const householdInputs = document.querySelectorAll('#household input');
const livingInputs = document.querySelectorAll('#living input');
const financeInputs = document.querySelectorAll('#finance input');
const familyInputs = document.querySelectorAll('#family input');
const travelInputs = document.querySelectorAll('#travel input');
const leisureInputs = document.querySelectorAll('#leisure input');
const careerSelector = document.querySelector('#careerSelector');
const allInputs = Array.from(document.querySelectorAll('input')).concat(Array.from(document.querySelectorAll('select')));

const nextBtn = document.querySelector('#nextStep');
const incomeDisplay = document.querySelector('#Total-Monthly-Income p');
const expenseDisplay = document.querySelector('#Total-Monthly-Expenses p');
// variables
let currentPageIndex = Number(sessionStorage.getItem("currentPageIndex")) || 0;
let currentField = arrayOfFields[currentPageIndex];
let grossIncome = 0;
let monthlyIncome = 0;
let householdExpenses = 0;
let livingExpenses = 0;
let financeExpenses = 0;
let familyExpenses = 0;
let travelExpenses = 0;
let leisureExpenses = 0;
let savingsExpenses = 0;

// functions
function saveInputValues() {
    localStorage.setItem('grossIncome', incomeInputs[0].value);
    localStorage.setItem('careerValue', careerSelector.value);
    let values = [];
    for (let input of incomeInputs) {
        if (input.value) {
            values.push(input.value);
        } else {
            values.push('');
        }
    }
    localStorage.setItem('incomeValues', JSON.stringify(values));
    values = [];
    for (let input of householdInputs) {

        if (input.value) {
            values.push(input.value);
        } else {
            values.push('');
        }
    }
    localStorage.setItem('householdValues', JSON.stringify(values));
    values = [];
    for (let input of livingInputs) {
        if (input.value) {
            values.push(input.value);
        } else {
            values.push('');
        }
    }
    localStorage.setItem('livingValues', JSON.stringify(values));
    values = [];
    for (let input of financeInputs) {

        if (input.value) {
            values.push(input.value);
        } else {
            values.push('');
        }
    }
    localStorage.setItem('financeValues', JSON.stringify(values));
    values = [];
    for (let input of familyInputs) {
        if (input.value) {
            values.push(input.value);
        } else {
            values.push('');
        }
    }
    localStorage.setItem('familyValues', JSON.stringify(values));
    values = [];
    for (let input of travelInputs) {
        if (input.value) {
            values.push(input.value);
        } else {
            values.push('');
        }
    }
    localStorage.setItem('travelValues', JSON.stringify(values));
    values = [];
    for (let input of leisureInputs) {
        if (input.value) {
            values.push(input.value);
        } else {
            values.push('');
        }
    }
    localStorage.setItem('leisureValues', JSON.stringify(values));
}

function saveExpenseValues() {
    sessionStorage.setItem('householdExpenses', householdExpenses);
    sessionStorage.setItem('livingExpenses', livingExpenses);
    sessionStorage.setItem('financeExpenses', financeExpenses);
    sessionStorage.setItem('familyExpenses', familyExpenses);
    sessionStorage.setItem('travelExpenses', travelExpenses);
    sessionStorage.setItem('leisureExpenses', leisureExpenses);
    sessionStorage.setItem('savingsExpenses', savingsExpenses);
}

function saveAnalysisValues() {
    sessionStorage.setItem('monthlyIncome', monthlyIncome);
    sessionStorage.setItem('monthlyExpenses', householdExpenses + livingExpenses + financeExpenses + familyExpenses + travelExpenses + leisureExpenses);
}

async function populateValues() {
    let incomeValues = JSON.parse(localStorage.getItem('incomeValues')) || 0;
    let householdValues = JSON.parse(localStorage.getItem('householdValues')) || 0;
    let livingValues = JSON.parse(localStorage.getItem('livingValues')) || 0;
    let financeValues = JSON.parse(localStorage.getItem('financeValues')) || 0;
    let familyValues = JSON.parse(localStorage.getItem('familyValues')) || 0;
    let travelValues = JSON.parse(localStorage.getItem('travelValues')) || 0;
    let leisureValues = JSON.parse(localStorage.getItem('leisureValues')) || 0;
    await addJobs();
    careerSelector.value = localStorage.getItem('careerValue');
    for (let i = 0; i < incomeInputs.length; i++) {
        if (incomeValues[i]) {
        incomeInputs[i].value = incomeValues[i];
        }
    }
    for (let i = 0; i < householdInputs.length; i++) {
        if (householdValues[i]) {
        householdInputs[i].value = householdValues[i];
        }
    }
    for (let i = 0; i < livingInputs.length; i++) {
        if (livingValues[i]) {
        livingInputs[i].value = livingValues[i];
        }
    }
    for (let i = 0; i < financeInputs.length; i++) {
        if (financeValues[i]) {
        financeInputs[i].value = financeValues[i];
        }
    }
    for (let i = 0; i < familyInputs.length; i++) {
        if (familyValues[i]) {
        familyInputs[i].value = familyValues[i];
        }
    }
    for (let i = 0; i < travelInputs.length; i++) {
        if (travelValues[i]) {
        travelInputs[i].value = travelValues[i];
        }
    }
    for (let i = 0; i < leisureInputs.length; i++) {
        if (leisureValues[i]) {
        leisureInputs[i].value = leisureValues[i];
        }
    }
}

function calculateIncomeAndExpenses() {
    householdExpenses = 0;
    livingExpenses = 0;
    financeExpenses = 0;
    familyExpenses = 0;
    travelExpenses = 0;
    leisureExpenses = 0;
    savingsExpenses = 0;
    grossIncome = incomeInputs[0].value ? Number(incomeInputs[0].value) : 0;
    monthlyIncome = ((grossIncome - federalTax(grossIncome))/12).toFixed(2);
    for (let input of householdInputs) {
        if (input.value) {
            householdExpenses += Number(input.value);
        }
    }
    for (let input of livingInputs) {
        if (input.value) {
            livingExpenses += Number(input.value);
        }
    }
    for (let input of financeInputs) {
        if (input.value) {
            financeExpenses += Number(input.value);
        }
    }
    for (let input of familyInputs) {
        if (input.value) {
            familyExpenses += Number(input.value);
        }
    }
    for (let input of travelInputs) {
        if (input.value) {
            travelExpenses += Number(input.value);
        }
    }
    for (let input of leisureInputs) {
        if (input.value) {
            leisureExpenses += Number(input.value);
        }
    }
    savingsExpenses = (financeInputs[7].value + financeInputs[8].value) || 0;
}

function renderNextField(newPageIndex) {
    for (let selector of arrayOfSelectors) {
        if (selector.classList.contains("selected")) {
            selector.classList.remove("selected");
        }
        if (selector.getAttribute("navTo") === String(newPageIndex)) {
            selector.classList.add("selected");
        }
    }
    for (let field of arrayOfFields) {
        if (!field.classList.contains("hidden")) {
            field.classList.add("hidden");
        }
        arrayOfFields[Number(newPageIndex)].classList.remove("hidden");
    }
}

function setUpPageSelector() {
    for (const selector of arrayOfSelectors) {
        if (selector.getAttribute("navTo") === "7") {
            selector.addEventListener("click", () => {
                saveInputValues();
                saveExpenseValues();
                saveAnalysisValues();
                window.location.href = 'results.html';
            }); 
        } else {
            selector.addEventListener("click", () => {
                saveInputValues();
                renderNextField(selector.getAttribute("navTo"))
                currentPageIndex = Number(selector.getAttribute("navTo"));
            });
        }
    }
}

function setUpInputs() {
    for (let input of allInputs) {
        input.addEventListener("change", () => {
            saveInputValues();
            calculateIncomeAndExpenses();
            update();
        });
    }
}

function federalTax(incomeAmount) { 
    let tax = 0;
    if (incomeAmount <= 12400) {
        tax = incomeAmount * 0.10;
    }
    else if (incomeAmount <= 50400) {
        tax = (12400 * 0.10) +
            ((incomeAmount - 12400) * 0.12);
    }
    else {
        tax = (12400 * 0.10) +
            ((50400 - 12400) * 0.12) +
            ((incomeAmount - 50400) * 0.22);
    }
    return tax;
}

async function addJobs() {
    const careerSelect = document.getElementById('careerSelector');
    const careerSalaryMap = new Map();

    try {
        const response = await fetch('https://eecu-data-server.vercel.app/data');
        if (!response.ok) {
            throw new Error('Network response was not okay');
        }
        const users = await response.json();

        users.forEach(user => {
            careerSalaryMap.set(user["Occupation"], user["Salary"]);
            const option = new Option(user["Occupation"], user["Occupation"]);
            careerSelect.add(option);
        });

        careerSelect.addEventListener('change', () => {
            incomeInputs[0].value = careerSalaryMap.get(careerSelect.value) || 0;
        });
    }
    catch (error) {
        console.error(error.message);
    }
}


// event listeners
nextBtn.addEventListener("click", () => {
    saveInputValues();
    calculateIncomeAndExpenses();
    update();
    // Move to next index & consequently next page
    if (currentPageIndex < 6) {
        renderNextField(Number(currentPageIndex) + 1);
        currentPageIndex = currentPageIndex + 1;
    } else if (currentPageIndex >= 6) {
        saveExpenseValues();
        saveAnalysisValues();
        window.location.href = 'results.html';
    }
})

// initialization
window.onload = async function() {
        await addJobs();
        await populateValues();
        calculateIncomeAndExpenses();
        renderNextField(currentPageIndex);
        setUpPageSelector();
        setUpInputs();
        update();
}

// Pie Chart
const canvas = document.querySelector('#chart');
let currentChart = null;

function update() {
    incomeDisplay.textContent = `$${monthlyIncome}`;
    expenseDisplay.textContent = `$${householdExpenses + livingExpenses + financeExpenses + familyExpenses + travelExpenses + leisureExpenses}`;

    currentChart?.destroy();
    currentChart = new Chart(canvas, {
        type: 'doughnut',
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Your Monthly Expenses'
                }
            }

        },
        data: {
            labels: ['Household', 'Living', 'Finance', 'Family', 'Travel', 'Leisure'],
            datasets: [
                {
                    label: 'Monthly (USD)',
                    data: [householdExpenses, livingExpenses, financeExpenses, familyExpenses, travelExpenses, leisureExpenses]
                }
            ]
        }
    });
}