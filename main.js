//BUDGET CONTROLLER
var budgetController = (function () {

    //some code

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            income: 0
        },
        budget: 0,
        percentage: -1,
    };
    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            //create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // create new item based on 'inc' or 'exp'  type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val)
            }
            else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }

            //Push it into our data structure 
            data.allItems[type].push(newItem)

            //return the new element
            return newItem;
        },
        deleteItem: function (type, id) {
            var ids, index
            // id = 6
            // data.allItems[type][id]
            // ids = [1 2 4 6 8]
            // index = 3

            ids = data.allItems[type].map(function (current) {
                return current.id;

            })

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },
        calculateBudget: function () {
            // Calculate the total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');
            // Calculate the budget income - expenses 
            data.budget = data.totals.inc - data.totals.exp;
            // Calculate the percentage of the income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
            } else {
                data.percentage = -1;
            }

        },
        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },


        testing: function () {
            console.log(data);
        }
    }

})();

//UI CONTROLLER 
var UIController = (function () {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    };
    //some code
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },

        addListItem: function (obj, type) {
            var Html, newHtml, element
            // Create Html string with placeholder text
            if (type == 'inc') {
                element = document.querySelector(DOMStrings.incomeContainer)
                Html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            else if (type == 'exp') {
                element = document.querySelector(DOMStrings.expensesContainer)
                Html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div> '
            }

            // Replace Html placeholder with actual data


            newHtml = Html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', obj.value)

            element.insertAdjacentHTML("beforeend", newHtml)
        },

        displayBudget: function (obj) {

            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc
            document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp

            if (obj.percentage > 0) {

                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%'

            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '--'

            }

        },

        deleteListItem: function (selectorID) {
            var el = document.getElementById(selectorID)
            el.parentNode.removeChild(el)
        },

        clearFileds: function () {
            var fileds, fieldsArr;
            fileds = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fileds);
            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });
            fieldsArr[0].focus();
        },

        getDOMStrings: function () {
            return DOMStrings
        }

    }
})();

//GLOBAL CONTROLLER APP
var controller = (function (budgetCtrl, UICtrl) {
    //some code
    var setuoEventListeners = function () {
        var DOM = UICtrl.getDOMStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        })
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };
    var updateBudget = function () {

        // 1- Calculate the Budget
        budgetCtrl.calculateBudget();

        // 2- Return the Budget
        var budget = budgetCtrl.getBudget();
        //  console.log(budget);
        // 3- Display Budget on UI
        UICtrl.displayBudget(budget);

    };
    var ctrlAddItem = function () {
        var input, newItem

        // 1- Get the field input data
        input = UICtrl.getInput();
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2- Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3- Add the item to the UI
            UICtrl.addListItem(newItem, input.type)

            // 4- Clear the item from input filed
            UICtrl.clearFileds();

            // 4- Calculate and Update the budget
            updateBudget();

        }
        else {
            UICtrl.clearFileds();
        }

    };
    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        // console.log(itemID);
        if (itemID) {
            splitID = itemID.split('-')
            // console.log(splitID);
            type = splitID[0]
            ID = parseInt(splitID[1])

            // 1- Delete item from data structure
            budgetCtrl.deleteItem(type, ID)
            // 2- Delete item from UI
            UICtrl.deleteListItem(itemID);
            // 3- Update snd show the new budget
            updateBudget();

        }


    }
    return {
        init: function () {
            console.log('App has started.');
            setuoEventListeners();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
        },
    }

})(budgetController, UIController);


controller.init();