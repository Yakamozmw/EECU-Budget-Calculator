const arrayOfSelectors = document.querySelector(".Page-Selector").children
const arrayOfFields = document.querySelector('#inputFields').children

const nextBtn = document.querySelector('#nextStep')

// Grab first field we see (income)
let currentPageIndex = 0
let currentField = arrayOfFields[currentPageIndex]

function renderNextField(newPageIndex) {
    // Visually show unselecting previous selector
    arrayOfSelectors[currentPageIndex].classList.remove("selected")

    currentPageIndex = newPageIndex
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

for (const selector of arrayOfSelectors) {
    selector.addEventListener("click", () => {
        renderNextField(selector.getAttribute("navTo"))
        currentPageIndex = 0;
        // LOWKEY DOESNT WORK MAN.  It resets to 0 instead of the page youre on
    })
}

nextBtn.addEventListener("click", () => {
    // Move to next index & consequently next page
    if (currentPageIndex < 7) {
        renderNextField(currentPageIndex + 1)
    }
})




// Pie Chart //
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