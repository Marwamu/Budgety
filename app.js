var selectOption = document.getElementById('add__type')
var addDescription = document.getElementById('add__description')
var addValue = document.getElementById('add__value')
var addBtn = document.getElementById('add__btn')
var expensesList = document.querySelector('.expenses__list')
var incomeList = document.querySelector('.income__list')
var expensesTitle = document.querySelector('.expenses__title')
var boolSelect = true;

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
    var whichList = expensesTitle.innerHTML
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
    if (!boolSelect) {
        expensesList.append(itemClearFix);
        let itemPercentage = document.createElement("div");
        itemPercentage.classList.add("item__percentage");
        rightClearfix.append(itemPercentage)
        console.log(itemPercentage);
    }
    else {
        incomeList.append(itemClearFix);
        console.log(incomeList);
    }
    // incomeList.append(itemClearFix);
    itemDescription.innerHTML = addDescription.value
    itemClearFix.append(itemDescription);
    itemClearFix.append(rightClearfix)
    itemValue.innerHTML = addValue.value
    rightClearfix.append(itemValue)
    rightClearfix.append(itemDelete)
    itemDelete.append(itemDeleteBtn)
    itemDeleteBtn.append(closeOutline)
    // console.log(itemClearFix);
})

// addItem();