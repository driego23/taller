document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById('board');
    const resetButton = document.getElementById('reset');
    const message = document.getElementById('message');
  
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    function checkWinner() {
      const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          gameActive = false;
          message.innerText = `¡El jugador ${currentPlayer} ha ganado!`;
          return;
        }
      }
  
      if (!gameBoard.includes('')) {
        gameActive = false;
        message.innerText = "¡Es un empate!";
      }
    }
  
    function handleCellClick(index) {
      if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        render();
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  
    function render() {
      board.innerHTML = '';
      gameBoard.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.innerText = value;
        cell.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cell);
      });
    }
  
    function resetGame() {
      currentPlayer = 'X';
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      message.innerText = '';
      render();
    }
  
    resetButton.addEventListener('click', resetGame);

    resetGame();
  });