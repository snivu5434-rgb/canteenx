// cancel.js
function showCancelRefund() {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  let lastOrder = history[history.length - 1] || {};

  let amount = Number(lastOrder.amount) || 0;
  let fee   = amount * 0.05;
  let refund = amount - fee;

  let refundBox = document.getElementById("refundBox");
  let msg       = document.getElementById("msg");

  if (refundBox && msg) {
    refundBox.innerHTML =
      "Amount: ₹" + amount + "<br>" +
      "Fee (5%): ₹" + fee.toFixed(2) + "<br>" +
      "<b>Refund: ₹" + refund.toFixed(2) + "</b>";

    setTimeout(() => {
      msg.innerText = "✅ Amount will be credited...";
    }, 3000);
  }
}

function goHome() {
  window.location.href = "index.html";
}