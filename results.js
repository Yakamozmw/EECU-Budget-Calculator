const arrayOfSelectors = document.querySelector(".Page-Selector").children;
let householdExpenses = JSON.parse(sessionStorage.getItem('householdExpenses')) || 0;
let livingExpenses = JSON.parse(sessionStorage.getItem('livingExpenses')) || 0;
let financeExpenses = JSON.parse(sessionStorage.getItem('financeExpenses')) || 0;
let familyExpenses = JSON.parse(sessionStorage.getItem('familyExpenses')) || 0;
let travelExpenses = JSON.parse(sessionStorage.getItem('travelExpenses')) || 0;
let leisureExpenses = JSON.parse(sessionStorage.getItem('leisureExpenses')) || 0;

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

setUpPageSelector();

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