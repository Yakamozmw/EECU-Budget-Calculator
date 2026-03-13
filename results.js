const arrayOfSelectors = document.querySelector(".Page-Selector").children;

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