const arrayOfSelectors = document.querySelector(".Page-Selector").children;
const arrayOfFields = document.querySelector('#inputFields').children;
const incomeInputs = document.querySelector('#incomes input');
const householdInputs = document.querySelector('#household input');
const livingInputs = document.querySelector('#living input');
const financeInputs = document.querySelector('#finance input');
const familyInputs = document.querySelector('#family input');
const travelInputs = document.querySelector('#travel input');
const leisureInputs = document.querySelector('#leisure input');

const nextBtn = document.querySelector('#nextStep');
console.log(incomeInputs);
// variables
let currentPageIndex = 0
let currentField = arrayOfFields[currentPageIndex];
let grossIncome = 0;

// functions
function renderNextField(newPageIndex) {
    // Visually show unselecting previous selector
    arrayOfSelectors[currentPageIndex].classList.remove("selected")

    currentPageIndex = newPageIndex;
    // Make previous field disappear
    currentField.classList.add("hidden")


    // Make wanted field appear
    const newField = arrayOfFields[currentPageIndex]
    newField.classList.remove("hidden")
    // Set current field as our grabbed new field
    currentField = newField

    // Visually show selecting new selector
    const selector = arrayOfSelectors[currentPageIndex]
    selector.classList.add("selected")
}

function setUpPageSelector() {
    for (const selector of arrayOfSelectors) {
        if (selector.getAttribute("navTo") === "7") {
            selector.addEventListener("click", () => {
                window.location.href = 'results.html';
            }); 
        } else {
            selector.addEventListener("click", () => {
                if (window.location.href === 'results.html') {
                    window.location.href = 'income.html';
                }
                renderNextField(selector.getAttribute("navTo"))
                currentPageIndex = Number(selector.getAttribute("navTo"));
            });
        }
        
    }
}

function findTaxableIncome() {

}


// event listeners
nextBtn.addEventListener("click", () => {
    // Move to next index & consequently next page
    if (currentPageIndex < 6) {
        renderNextField(currentPageIndex + 1);
    } else if (currentPageIndex >= 6) {
        window.location.href = 'results.html';
    }
})

// initialization
setUpPageSelector();

// Pie Chart
const inputs = document.querySelectorAll("input")

const canvas = document.querySelector('canvas')
let currentChart = null

document.body.addEventListener('input', () => {
    update();
});

update();

function update() {
    currentChart?.destroy();
    currentChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: document
                .querySelectorAll('article')
                .values()
                .map(article => article.firstElementChild.textContent),
            datasets: [
                {
                    label: 'Monthly (USD)',
                    data: all_da_inputs.map(inputs => sum(inputs))
                }
            ]
        }
    });
}