const incomeInput = document.getElementById("first-input");
const expenseDescriptionInput = document.getElementById("Second-input");
const expenseAmountInput = document.getElementById("Third-input");
const addButton = document.querySelector(".contener2 .button");
const expenseList = document.getElementById("list");
const totalAmountDisplay = document.getElementById("Total-Amount");
const remainingAmountDisplay = document.getElementById("remaining-Amount");
const expenseAmountDisplay = document.getElementById("Expense-Amount");

let budgetData = JSON.parse(localStorage.getItem("budgetData")) || {
  income: 0,
  expenses: [],
};

function updateDisplay() {
  totalAmountDisplay.textContent = `Rs ${budgetData.income.toFixed(2)}`;
  const expenseTotal = budgetData.expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  expenseAmountDisplay.textContent = `Rs ${expenseTotal.toFixed(2)}`;
  remainingAmountDisplay.textContent = `Rs ${(
    budgetData.income - expenseTotal
  ).toFixed(2)}`;
}

function addExpense() {
  const description = expenseDescriptionInput.value;
  const amount = parseFloat(expenseAmountInput.value);

  if (description && amount) {
    const newExpense = { description, amount };
    budgetData.expenses.push(newExpense);
    expenseDescriptionInput.value = "";
    expenseAmountInput.value = "";
    updateExpenseList();
    updateDisplay();
    saveDataToLocalStorage();
  }
}

function updateExpenseList() {
  expenseList.innerHTML = "";
  budgetData.expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${
      expense.description
    }</b><span><b>Rs ${expense.amount.toFixed(
      2
    )}</b></span><button class="delete-button" onclick="deleteExpense(${index})">Cancel</button>`;
    expenseList.appendChild(li);
  });
}

function deleteExpense(index) {
  budgetData.expenses.splice(index, 1);
  updateExpenseList();
  updateDisplay();
  saveDataToLocalStorage();
}

function saveDataToLocalStorage() {
  localStorage.setItem("budgetData", JSON.stringify(budgetData));
}

document.getElementById("button").addEventListener("click", () => {
  const income = parseFloat(incomeInput.value);
  if (income) {
    budgetData.income = income;
    updateDisplay();
    saveDataToLocalStorage();
  }
});

addButton.addEventListener("click", addExpense);

window.addEventListener("load", () => {
  updateExpenseList();
  updateDisplay();
});
