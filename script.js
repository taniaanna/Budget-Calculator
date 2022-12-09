var budget = {
    earn: 0,
    avail: 0,
    spent: 0
}
var incomeArray = [];
var expenseArray = [];
function checkEarn() {

    if (budgetLocal() === null) {
        mEarn.innerHTML = `<h3 class="text-center mt-2">0</h3>`
    }
    else {
        mEarn.innerHTML = `<h3 class="text-center text-success mt-1">${budgetLocal().earn}</h3>`
    }
}

function checkAvail() {

    if (budgetLocal() === null) {
        mAvail.innerHTML = `<h3 class="text-center mt-2">0</h3>`
    }
    else {
        mAvail.innerHTML = `<h3 class="text-center text-primary mt-2">${budgetLocal().avail}</h3>`
    }
}

function checkSpent() {

    if (budgetLocal() === null) {
        mSpent.innerHTML = `<h3 class="text-center mt-2">0</h3>`
    }
    else {
        mSpent.innerHTML = `<h3 class="text-center text-danger mt-2">${budgetLocal().spent}</h3>`
    }
}

console.log(budget);

function addIncome() {

    var incBudget = {
        desc: desc.value,
        amnt: amount.value
    };

    if (incBudget.desc == "") {
        alert('Please enter the description !');
    }
    else if (incBudget.amnt == "") {
        alert('Please enter the amount !');
    }
    else {
        incomeArray= [...incomeArray, { desc: desc.value, amnt: amount.value }];
        console.log("income:", incomeArray);

        clearField();
      
        budget.earn += parseInt(incBudget.amnt);
        budget.avail += parseInt(incBudget.amnt);

        localStorage.setItem("income", JSON.stringify(incomeArray));

        localStorage.setItem("budget", JSON.stringify(budget));

        incHistory.innerHTML += `<h3 class="text-center text-success">${incBudget.desc} - ${incBudget.amnt}</h3>`

    }


}

const addExpense = () => {

    var expBudget = {
        desc: desc.value,
        amnt: amount.value
    };

    if (expBudget.desc == "") {
        alert('Please enter the description !');
    }
    else if (expBudget.amnt == "") {
        alert('Please enter the amount !');
    }
    else {
        expenseArray = [...expenseArray, { desc: desc.value, amnt: amount.value }];
        console.log("expense:", expenseArray);

        clearField();

        budget.spent += parseInt(expBudget.amnt);
        budget.avail -= parseInt(expBudget.amnt);

        localStorage.setItem("expense", JSON.stringify(expenseArray));

        localStorage.setItem("budget", JSON.stringify(budget));

        expHistory.innerHTML += `<h3 class="text-center text-danger">${expBudget.desc} - ${expBudget.amnt}</h3>`

    }


}

const show = () => {

    if (incLocal() === null && expLocal() ===null){
        histMsg.innerHTML = `<h6 class="text-center text-primary mt-3 mb-4">Local Storage is empty!</h6>`;
        setTimeout(removeHistoryBanner, 1000);
    }
    else{
    document.getElementById("incHistory").innerHTML = "";
    document.getElementById("expHistory").innerHTML = "";

    let income = localStorage.getItem("income");

    console.log("income:", JSON.parse(income));

    JSON.parse(income).map((item) => {
        incHistory.innerHTML += `<h3 class="text-center text-success">${item.desc} - ${item.amnt}</h3>`
    });

    let expense = localStorage.getItem("expense");

    console.log("expense:", JSON.parse(expense));

    JSON.parse(expense).map((item) => {
        expHistory.innerHTML += `<h3 class="text-center text-danger">${item.desc} - ${item.amnt}</h3>`
    });

    }
}

const budgetLocal = () => {
    var budgetInLocal = localStorage.getItem("budget");
    return JSON.parse(budgetInLocal);
}

const incLocal = () => {
    var incInLocal = localStorage.getItem("income");
    return JSON.parse(incInLocal);
}

const expLocal = () => {
    var expInLocal = localStorage.getItem("expense");
    return JSON.parse(expInLocal);
}


const clearStorage = () => {
    localStorage.clear();

    mEarn.innerHTML = "";
    mAvail.innerHTML = "";
    mSpent.innerHTML = "";

    document.getElementById("incHistory").innerHTML = "";
    document.getElementById("expHistory").innerHTML = "";

    locMsg.innerHTML = `<h6 class="text-center text-danger mt-3">Local Storage Cleared!</h6>`;

    setTimeout(removeBottomBanner, 1000);

}

const removeBottomBanner = () => {
    locMsg.innerHTML = "";
}

const removeHistoryBanner = () => {
    histMsg.innerHTML = "";
}

const clearField=()=>{
    const descField = document.getElementById("desc");
    const amountField = document.getElementById("amount");
        

    btnInc.addEventListener('click', () => {
        descField.value = "";
        amountField.value = "";
        btnInc.removeEventListener('click',arguments.callee,false);
    });

    btnExp.addEventListener('click', () => {
        descField.value = "";
        amountField.value = "";
        btnExp.removeEventListener('click',arguments.callee,false);
    });
}