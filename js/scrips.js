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

Pizza.prototype.addToCart = function() {
    document.getElementById("cartArea").removeAttribute("class");
    document.querySelectorAll("#cartArea>label").forEach((label) => {
        label.removeEventListener("change", handleServiceChange);
    });
    document.getElementById("order").removeEventListener("click", handleSubmitOrder);

    //creates pizza to append to DOM cart area at bottom
    let div = document.createElement("div");
    let title = document.createElement("p");
    title.innerText = "Item: " + getCartNumber();
    div.append(title);
    let order = document.createElement("ul");
    let size = document.createElement("li");
    size.innerText = "Size: " + this.size.charAt(0).toUpperCase() + this.size.slice(1);
    order.append(size);
    let crust = document.createElement("li");
    crust.innerText = "Crust: " + this.crust.charAt(0).toUpperCase() + this.crust.slice(1);
    order.append(crust);
    let toppings = document.createElement("li");
    let toppingsUL = document.createElement("ul")
    toppings.innerText = "Toppings:";
    this.meat.forEach((meatTopping) => {
        let meatItem = document.createElement("li");
        meatItem.innerText = meatTopping.charAt(0).toUpperCase() + meatTopping.slice(1);
        toppingsUL.append(meatItem);
    });
    this.veggie.forEach((veggieTopping) => {
        let veggieItem = document.createElement("li");
        veggieItem.innerText = veggieTopping.charAt(0).toUpperCase() + veggieTopping.slice(1);
        toppingsUL.append(veggieItem);
    });
    toppings.append(toppingsUL);
    order.append(toppings);
    let sauce = document.createElement("li");
    sauce.innerText = "Sauce: " + this.sauce.charAt(0).toUpperCase() + this.sauce.slice(1);
    order.append(sauce);
    let instructions = document.createElement("li");
    instructions.innerText = "Special Instructions: " + this.instructions.charAt(0).toUpperCase() + this.instructions.slice(1);
    order.append(instructions);
    let price = document.createElement("li");
    price.innerText = "Item Cost: $" + this.price;
    order.append(price); 
    div.append(order);
    document.getElementById("items").append(div);

    updateCartTotal(this.price);

    //set up delivery option
    document.querySelectorAll("#cartArea>label").forEach((label) => {
        label.addEventListener("change", handleServiceChange);
    });
    document.getElementById("order").addEventListener("click", handleSubmitOrder);
}

function handleSubmitOrder() {

    const cloned = document.getElementById("cartArea").cloneNode(true);
    
    document.getElementById("ordered").removeAttribute("class");
    document.getElementById("ordering").remove();
    document.getElementById("reorder").addEventListener("click", () => {
        window.location.reload();
    });

    document.getElementById("previousOrder").append(cloned);
    document.querySelectorAll("#cartArea>label, #order").forEach((element) => {
        element.remove();
    });
    let time = document.createElement("p");
    let itemNum = "" + document.getElementById("items").lastElementChild.firstElementChild.innerText.slice(-1);
    switch(itemNum) {
        case("1"):
        case("2"):
            time.innerText = "Estimed wait time: 20 minutes";
            break;
        case("3"):
        case("4"):
            time.innerText = "Estimed wait time: 35 minutes";
            break;
        default:
            time.innerText = "Estimed wait time: over 45 minutes";
    }
    document.getElementById("timeEstimation").append(time);
}

function handleServiceChange(e) {
    if(e.target.id === "pickup") {
        updateCartTotal(-5);
    } else {
        updateCartTotal(5);
    }
}

function updateCartTotal(updatedPrice) {
    const previous = parseFloat(document.getElementById("subtotalCart").innerText);
    const total = (previous + parseFloat(updatedPrice)).toFixed(2);
    let tax = total*0.1;
    let totalAfter = total*1.1
    document.getElementById("subtotalCart").innerText = total;
    document.getElementById("tax").innerText = tax.toFixed(2);
    document.getElementById("total").innerText = totalAfter.toFixed(2);
}

function getCartNumber() {
    return document.querySelectorAll("#items>div").length + 1;
}


function handleCartSubmission(e) {
    let pizza = gatherUserInputs();

    pizza.addToCart();

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
        e.preventDefault();
        if(document.getElementById("sauceSelection").selectedIndex === 0) {
            document.getElementById("error").removeAttribute("class");
            let handleChange = function(e) {
                document.getElementById("error").setAttribute("class", "hidden");
                e.currentTarget.removeEventListener("change", handleChange);
            }
            document.getElementById("sauceSelection").addEventListener("change", handleChange);
        } else {
            handleCartSubmission(e);
        }
    });
    
});