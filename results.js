const arrayOfSelectors = document.querySelector(".Page-Selector").children;
const incomeDisplay = document.querySelector('#Total-Monthly-Income p');
const expenseDisplay = document.querySelector('#Total-Monthly-Expenses p');
const remainderDisplay = document.querySelector('#Remaining p');
const savingsTipDisplay = document.querySelector('#savingsTip');
const expenseTipDisplay = document.querySelector('#expenseTip');
const ExportResultsBtn = document.querySelector('#expResult');
let householdExpenses = JSON.parse(sessionStorage.getItem('householdExpenses')) || 0;
let livingExpenses = JSON.parse(sessionStorage.getItem('livingExpenses')) || 0;
let financeExpenses = JSON.parse(sessionStorage.getItem('financeExpenses')) || 0;
let familyExpenses = JSON.parse(sessionStorage.getItem('familyExpenses')) || 0;
let travelExpenses = JSON.parse(sessionStorage.getItem('travelExpenses')) || 0;
let leisureExpenses = JSON.parse(sessionStorage.getItem('leisureExpenses')) || 0;
let monthlyIncome = JSON.parse(sessionStorage.getItem('monthlyIncome')) || 0;
let monthlyExpenses = JSON.parse(sessionStorage.getItem('monthlyExpenses')) || 0;
let savingsExpenses = JSON.parse(sessionStorage.getItem('savingsExpenses')) || 0;


function setUpPageSelector() {
    for (const selector of arrayOfSelectors) { 
            selector.addEventListener("click", () => {
                if (document.URL.includes('results.html') && Number(selector.getAttribute("navTo")) < 7) {
                    sessionStorage.setItem("currentPageIndex", Number(selector.getAttribute("navTo")));
                    window.location.href = 'income.html';
                }
            });
        }
}

function displayAnalysis() {
    incomeDisplay.textContent = `$${monthlyIncome}`;
    expenseDisplay.textContent = `$${monthlyExpenses}`;
    remainderDisplay.textContent = `$${(monthlyIncome - monthlyExpenses).toFixed(2)}`;
    if (monthlyIncome - monthlyExpenses < 0) {
        remainderDisplay.style.color = "#d20000";
    } else {
        remainderDisplay.style.color = "#00D200";
    }
    if (savingsExpenses < monthlyIncome * 0.1) {
        savingsTipDisplay.classList.remove('hidden');
    } else if (!savingsTipDisplay.classList.contains('hidden')) {
        savingsTipDisplay.classList.add('hidden');
    }
    if (monthlyIncome - monthlyExpenses < 0) {
        expenseTipDisplay.classList.remove('hidden');
    } else if (!expenseTipDisplay.classList.contains('hidden')) {
        expenseTipDisplay.classList.add('hidden');
    }
}

function exportResults() {
    const totalIncome = monthlyIncome;
    const totalExpenses = monthlyExpenses;
    const remaining = (monthlyIncome - monthlyExpenses).toFixed(2);
    
    const breakdown = `
Household: $${householdExpenses}
Living: $${livingExpenses}
Finance: $${financeExpenses}
Family: $${familyExpenses}
Travel: $${travelExpenses}
Leisure: $${leisureExpenses}
Savings: $${savingsExpenses}
    `.trim();
    
    const summary = `
Wise-Up Budget Calculator Results

Annual Income: $${totalIncome}
Total Monthly Expenses: $${totalExpenses}
Remaining Budget: $${remaining}

Expense Breakdown:
${breakdown}

Generated on: ${new Date().toLocaleDateString()}
    `.trim();
    
    // Create a blob with the summary text
    const blob = new Blob([summary], { type: 'text/plain' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'budget-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

setUpPageSelector();
displayAnalysis();

ExportResultsBtn.addEventListener('click', exportResults);

// Pie Chart
const canvas = document.querySelector('#chartResultPg');
let currentChart = null;

chartUpdate();

function chartUpdate() {
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