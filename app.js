var selectOption = document.getElementById('add__type')
var addDescription = document.getElementById('add__description')
var addValue = document.getElementById('add__value')
var addBtn = document.getElementById('add__btn')
var expensesList = document.querySelector('.expenses__list')
var incomeList = document.querySelector('.income__list')
var expensesTitle = document.querySelector('.expenses__title')
var budgetValue = document.querySelector('.budget__value')
var totalBudget = 0.00
// console.log(totalBudget);
// var budgetValue = document.querySelector('.budget__value')
var boolSelect = true;
// function totalBudget(val) {
//     return budgetValue.innerHTML += val.value;
// }
function compareTotalBudget() {
    if (totalBudget >= 0.00) {
        budgetValue.innerHTML = '+' + totalBudget.toLocaleString("en-US");
    }
    else {
        budgetValue.innerHTML = totalBudget.toLocaleString("en-US");
    }
}
function clacPercentage(val, oldBudget) {
    if (val > oldBudget && oldBudget) {
        return parseInt((val - oldBudget) / oldBudget * 100) + ' %';
    }
    else if (oldBudget === 0) {
        return 0 + '%'
    }
    else {
        return parseInt((oldBudget - val) / oldBudget * 100) + ' %';
    }

}
selectOption.addEventListener('change', function (e) {
    if (e.target.value === 'exp') {
        selectOption.style.borderColor = '#FF5049';
        addDescription.addEventListener('focus', (e) => {
            addDescription.style.borderColor = '#FF5049';
        })
        addDescription.addEventListener('focusout', (e) => {
            addDescription.style.borderColor = '#e7e7e7';
        })
        addValue.addEventListener('focus', (e) => {
            addValue.style.borderColor = '#FF5049';
        })
        addValue.addEventListener('focusout', (e) => {
            addValue.style.borderColor = '#e7e7e7';
        })
        addBtn.style.color = '#FF5049';
        boolSelect = false; console.log(boolSelect);
    }
    else {
        selectOption.style.border = '1px solid #28B9B5';
        addDescription.addEventListener('focus', (e) => {
            addDescription.style.borderColor = '#28B9B5';
        })
        addDescription.addEventListener('focusout', (e) => {
            addDescription.style.borderColor = '#e7e7e7';
        })
        addValue.addEventListener('focus', (e) => {
            addValue.style.borderColor = '#28B9B5';
        })
        addValue.addEventListener('focusout', (e) => {
            addValue.style.borderColor = '#e7e7e7';
        })
        addBtn.style.color = '#28B9B5';
        boolSelect = true; console.log(boolSelect);

    }

})
addBtn.addEventListener('click', function (e) {
    var budget = totalBudget;
    console.log(budget);
    // console.log(whichList);
    let itemClearFix = document.createElement("div");
    itemClearFix.classList.add("item", 'clearfix');
    let itemDescription = document.createElement("div");
    itemDescription.classList.add("item__description");
    let rightClearfix = document.createElement("div");
    rightClearfix.classList.add("right", "clearfix");
    let itemValue = document.createElement("div");
    itemValue.classList.add("item__value");
    let itemDelete = document.createElement("div");
    itemDelete.classList.add("item__delete");
    let itemDeleteBtn = document.createElement("button");
    itemDeleteBtn.classList.add("item__delete--btn");
    let closeOutline = document.createElement("i");
    closeOutline.classList.add("ion-ios-close-outline");
    itemDescription.innerHTML = addDescription.value
    itemClearFix.append(itemDescription);
    var totalValue = parseFloat(addValue.value)

    if (!boolSelect) {
        itemValue.innerHTML = '- ' + totalValue.toLocaleString("en-US")
        rightClearfix.append(itemValue)
        totalBudget -= totalValue;
        compareTotalBudget()
        let itemPercentage = document.createElement("div");
        itemPercentage.classList.add("item__percentage");
        console.log(budget);
        console.log(totalValue);
        var percantage = clacPercentage(totalValue, budget);
        // console.log(parseFloat(itemValue.innerHTML));
        console.log(percantage);
        itemPercentage.innerHTML = percantage.toString();
        rightClearfix.append(itemPercentage)
        itemDeleteBtn.append(closeOutline)
        itemDelete.append(itemDeleteBtn)
        rightClearfix.append(itemDelete)
        itemClearFix.append(rightClearfix)
        expensesList.append(itemClearFix);


    }
    else {
        itemValue.innerHTML = '+ ' + totalValue.toLocaleString("en-US")
        rightClearfix.append(itemValue)
        itemDeleteBtn.append(closeOutline)
        itemDelete.append(itemDeleteBtn)
        rightClearfix.append(itemDelete)
        itemClearFix.append(rightClearfix)
        incomeList.append(itemClearFix);
        totalBudget += totalValue;
        console.log(totalBudget);
        compareTotalBudget()
    }
    // budget = totalBudget;
    // console.log(totalBudget);
    // console.log(itemClearFix);
})