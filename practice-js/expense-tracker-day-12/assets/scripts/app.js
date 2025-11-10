const expenseTitle  = document.getElementById("expenseTitle");
const expenseAmount = document.getElementById("expenseAmount");
const addExpenseBtn = document.getElementById("addExpense");
const expenseList   = document.getElementById("expenseList");
const totalAmount   = document.getElementById("totalAmount");

let expenses        = JSON.parse(localStorage.getItem("expenses")) || [];

function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.title} - Rs.${expense.amount}
      <button class="delete-btn" onclick="deleteExpense(${index})">🗑️</button>
    `;
    expenseList.appendChild(li);
  });

  totalAmount.textContent = total;
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

addExpenseBtn.addEventListener("click", () => {
  const title = expenseTitle.value.trim();
  const amount = parseInt(expenseAmount.value);

  if (title === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid title and amount.");
    return;
  }

  const newExpense = { title, amount };
  expenses.push(newExpense);
  expenseTitle.value = "";
  expenseAmount.value = "";

  renderExpenses();
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

renderExpenses();