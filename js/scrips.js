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
    this.price = cost;
    return cost;
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
}

function handleCartSubmission(e) {
    e.preventDefault();

    //gathering user inputs
    const size = document.querySelector("input[name='size']:checked").value;
    const crust = document.querySelector("input[name='crust']:checked").value;
    let meatChecked = document.querySelectorAll("input[name=meat]:checked");
    meatChecked = Array.from(meatChecked);
    const meat = meatChecked.map((input) => {
        return input.value;
    });
    let veggieChecked = document.querySelectorAll("input[name=veggie]:checked");
    veggieChecked = Array.from(veggieChecked);
    const veggie = veggieChecked.map((input) => {
        return input.value;
    });
    const sauce = document.getElementById("sauceSelection").value;
    const instructions = document.getElementById("instructionsInput").value;

    let pizza = new Pizza(size, crust, meat, veggie, sauce, instructions);
    console.log(pizza.getPrice());


    resetDefault();
}

window.addEventListener("load", function() {
    document.getElementById("sauceSelection").selectedIndex = 0;
    document.getElementById("shop").addEventListener("submit", handleCartSubmission);
    
});