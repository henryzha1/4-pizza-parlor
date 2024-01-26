function Pizza(size, crust, meat, veggie, sauce, instructions) {
    this.size = size; //small medium or large
    this.crust = crust; //regular thin or stuffed
    this.meat = meat; //[sausage, pepperoni, bacon, meatball, ham, chicken]
    this.veggie = veggie; //[mushrooms, pineapple, onions, olives, peppers]
    this.sauce = sauce; //marinara or alfredo
    this.instructions = instructions; // custom string instructions
}

Pizza.prototype.getPrice() {
    let cost = 0;
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
    cost += this.meat.length*1 + Math.round(this.veggie.length*0.5);
    this.price = cost;
}


function handleCartSubmission() {
    e.preventDefault();





}

window.addEventListener("load", function() {
    document.getElementById("shop").addEventListener("submit", handleCartSubmission());
});