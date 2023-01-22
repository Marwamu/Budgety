var selectOption = document.getElementById('add__type')
var addDescription = document.getElementById('add__description')
var addValue = document.getElementById('add__value')
var addBtn = document.getElementById('add__btn')
var expensesList = document.getElementsByClassName('expenses__list')

function selectOpt() {
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
            return false;
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
        }
    })

}

addBtn.addEventListener('click', function (e) {
    for (var i = 0; i < 10; i++) {
        let itemClearFix = document.ele
    }
})


selectOpt();

