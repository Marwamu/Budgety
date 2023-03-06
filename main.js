//BUDGET CONTROLLER
var budgetController = (function () {

    //some code

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    Expense.prototype.calculatePercentage = function (totalIncome) {

        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100)
        } else {
            this.percentage = -1;
        }

    };

    Expense.prototype.getPercentage = function () {
        return this.percentage
    };

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

        calculatePercentages: function () {
            /*
            a = 20
            b = 10
            c = 40
            income = 100
            a = 20 /100 = 20%
            b = 10 /100 = 10%
            c = 30 /100 = 40%
            */
            data.allItems.exp.forEach(function (cur) {
                cur.calculatePercentage(data.totals.inc);
            });
        },

        getPercentages: function () {
            var allPerc = data.allItems.exp.map(function (cur) {
                return cur.getPercentage()
            });
            return allPerc
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
        expensesPercLabel: '.item__percentage',
        container: '.container'
    };
    //some code
    var formatNumber = function (num, type) {
        var numSplit, int, dec, type
        /* 
        - or + befor number
        exactly two decimal points
        comms separating the thousands 
         */
        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.')

        int = numSplit[0]
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); // 23510 out 23,510
        } else {

        }


        dec = numSplit[1]

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value),

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
                Html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%percentage%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div> '
            }

            // Replace Html placeholder with actual data


            newHtml = Html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type))
            // newHtml = newHtml.replace('%percentage%', obj.percentage)

            element.insertAdjacentHTML("beforeend", newHtml)
        },

        displayBudget: function (obj) {
            var type
            obj.budget > 0 ? type = 'inc' : type = 'exp'
            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type)
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc')
            document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp')

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

        displayPercentages: function (percentages) {
            var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);
            var nodeListForEach = function (list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i)
                }
            };



            nodeListForEach(fields, function (current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%'

                } else {
                    current.textContent = '--'
                }
            })


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

    var updatePercentages = function () {

        // 1- Calculate percanteges 
        budgetCtrl.calculatePercentages();

        // 2- Read percenteges from the budget controller
        var percentages = budgetCtrl.getPercentages();

        // 3- Update the UI with the new percentages 
        UICtrl.displayPercentages(percentages);
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

            // 5- Calculate and Update the budget
            updateBudget();

            // 6- Calculate and Update percentages
            updatePercentages();

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

            // 4- Calculate and Update percentages
            updatePercentages();

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