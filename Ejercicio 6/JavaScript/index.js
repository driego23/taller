let expression = '';
let history = [];

function addToDisplay(value) {
  expression += value;
  document.getElementById('display').value = expression;
}

function clearDisplay() {
  expression = '';
  document.getElementById('display').value = '';
}

function operation(operator) {
  expression += operator;
  document.getElementById('display').value = expression;
}

function calculate() {
  try {
    const result = eval(expression);
    history.push(expression + ' = ' + result);
    expression = result.toString();
    document.getElementById('display').value = expression;
  } catch (error) {
    alert('Error en la expresión');
  }
}

function toggleHistory() {
  const historyList = document.getElementById('history-list');
  historyList.classList.toggle('hidden');
  fillHistory(); 
}

function fillHistory() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';

  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  });
}