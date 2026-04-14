let cart = {};
let total = 0;

// TOGGLE CATEGORY
function toggle(id){
  let section = document.getElementById(id);
  let arrow = document.getElementById("arrow-" + id);

  if(section.style.display === "block"){
    section.style.display = "none";
    arrow.innerHTML = "⬇️";
  } else {
    section.style.display = "block";
    arrow.innerHTML = "⬆️";
  }
}

// ADD ITEM
function add(name, price){
  price = Number(price);

  if(!cart[name]){
    cart[name] = {price: price, qty: 0};
  }

  cart[name].qty++;
  total += price;

  updateTotal();
}

// REMOVE ITEM
function remove(name, price){
  if(cart[name] && cart[name].qty > 0){
    cart[name].qty--;
    total -= price;

    if(cart[name].qty === 0){
      delete cart[name];
    }
  }

  updateTotal();
}

// UPDATE TOTAL
function updateTotal(){
  document.getElementById("total").innerText = total;
}

// CONFIRM ORDER
function confirmOrder(){
  if(total === 0){
    showMessage("Please select item first!");
    return;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalAmount", total);

  window.location.href = "confirm.html";
}

// MESSAGE
function showMessage(msg){
  let box = document.getElementById("msgBox");
  box.innerText = msg;
  box.style.display = "block";

  setTimeout(()=>{
    box.style.display = "none";
  },2000);
}


// SHOW AMOUNT (from menu/confirmation page)
window.onload = function () {
  let amt = localStorage.getItem("totalAmount") || 0;
  document.getElementById("amountBox").innerText = "₹ " + amt;
};


// PAYMENT FUNCTION (NO MESSAGE, DIRECT NAV)
function makePayment() {

  let amount = localStorage.getItem("totalAmount") || 0;

  if (amount == 0) {
    alert("No items selected");
    return;
  }

  // generate ORDER ID (5 digit)
  let orderId = Math.floor(10000 + Math.random() * 90000);

  // store data for tracking page
  localStorage.setItem("orderId", orderId);
  localStorage.setItem("finalAmount", amount);
  localStorage.setItem("status", "Cooking");

  // go to tracking page
  window.location.href = "tracking.html";
}

// HISTORY BUTTON
function goHistory() {
  window.location.href = "history.html";
}
