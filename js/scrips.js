function Pizza(size, crust, meat, veggie, sauce, instructions) {
    this.size = size; //small medium or large
    this.crust = crust; //regular thin or stuffed
    this.meat = meat; //[sausage, pepperoni, bacon, meatball, ham, chicken]
    this.veggie = veggie; //[mushrooms, pineapple, onions, olives, peppers]
    this.sauce = sauce; //marinara or alfredo
    this.instructions = instructions; // custom string instructions
}

Pizza.prototype.getPrice = function() {
    let cost = 9;
    switch (this.size) {
        case ("medium"):
            cost += 3;
            break;
        case ("large"):
            cost += 4;
            break;
    }
    if(this.crust === "stuffed") {
        cost += 3;
    }
    cost += this.meat.length*1 + this.veggie.length*0.5;
    this.price = cost.toFixed(2);
    return cost;
}


function handleCartSubmission(e) {
    e.preventDefault();

    let pizza = gatherUserInputs();


    console.log(pizza);
    //takes the pizza and adds to cart


    resetDefault();
}

function updatePrice() {
    //set up event listeners on all form inputs and update pizza properties per form input
    //each event listener needs an get price method 

    document.getElementById("shop").addEventListener("change", (e) => {
        let pizza = gatherUserInputs();
        document.getElementById("price").innerText = pizza.price;
    });

}

function gatherUserInputs() {
    let pizza = new Pizza();
    //gathering user inputs
    pizza.size = document.querySelector("input[name='size']:checked").value;
    pizza.crust = document.querySelector("input[name='crust']:checked").value;
    let meatChecked = document.querySelectorAll("input[name=meat]:checked");
    meatChecked = Array.from(meatChecked);
    pizza.meat = meatChecked.map((input) => {
        return input.value;
    });
    let veggieChecked = document.querySelectorAll("input[name=veggie]:checked");
    veggieChecked = Array.from(veggieChecked);
    pizza.veggie = veggieChecked.map((input) => {
        return input.value;
    });
    pizza.sauce = document.getElementById("sauceSelection").value;
    pizza.instructions = document.getElementById("instructionsInput").value;
    pizza.getPrice();

    return pizza;
}

function resetDefault() {
    document.getElementById("small").checked = true;
    document.getElementById("regular").checked = true;
    document.getElementById("sauceSelection").selectedIndex = 0;
    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
    document.getElementById("instructionsInput").value = "";
    document.getElementById("price").innerText = "9.00";
}

window.addEventListener("load", function() {
    document.getElementById("sauceSelection").selectedIndex = 0;

    updatePrice();
    document.getElementById("shop").addEventListener("submit", (e) => {
        if(false) { //sauce index = 0;
            //error path
        } else {
            handleCartSubmission(e);
        }
    });
    
});