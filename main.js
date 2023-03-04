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

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            income: 0
        },
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
        calculateBudget: function () {
            var budget, newBudget
            data.totals[type].push(newBudget)
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
        expensesContainer: '.expenses__list'
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
                Html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            else if (type == 'exp') {
                element = document.querySelector(DOMStrings.expensesContainer)
                Html = '<div class="item clearfix" id="expenses-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div> '
            }

            // Replace Html placeholder with actual data


            newHtml = Html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', obj.value)

            element.insertAdjacentHTML("beforeend", newHtml)
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
    };
    var updateBudget = function () {

        // 1- Calculate the Budget


        // 2- Return the Budget



        // 3- Display Budget on UI





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
    return {
        init: function () {
            console.log('App has started.');
            setuoEventListeners();
        },
    }

})(budgetController, UIController);


controller.init();