//--------------------- Task 2 (guessing game) -------------------
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const guessMessage = document.getElementById('guessMessage');
const playAgain = document.getElementById('playAgain');

//--------------------- Task 1-1 -------------------
const listInput = document.getElementById('listInput');
const addBtn = document.getElementById('addBtn');
const itemList = document.getElementById('itemList');

//--------------------- Task 1-2 -------------------
const charInput = document.getElementById('charInput');
const charCount = document.getElementById('charCount');

//--------------------- Task 1-3 -------------------
const colorPicker = document.getElementById('colorPicker');
const colorBox = document.getElementById('colorBox');



let randomNumber = Math.floor(Math.random() * 100) + 1;



guessBtn.addEventListener('click', checkGuess);
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        checkGuess();
    }
});

function checkGuess() {
    const guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      guessMessage.textContent = 'Please enter a number between 1 and 100.';
      guessMessage.style.color = 'red';
      return;
    }

    if (guess > randomNumber) {
      guessMessage.textContent = 'Too high!';
      guessMessage.style.color = 'orange';
    } else if (guess < randomNumber) {
      guessMessage.textContent = 'Too low!';
      guessMessage.style.color = 'blue';
    } else {
      guessMessage.textContent = 'Correct!';
      guessMessage.style.color = 'green';
      guessBtn.disabled = true;
      guessInput.disabled = true;
      playAgain.style.display = 'inline-block';
    }
    guessInput.value = '';
    guessInput.focus();
}

  playAgain.addEventListener('click', () => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    guessMessage.textContent = '';
    guessBtn.disabled = false;
    guessInput.disabled = false;
    guessInput.value = '';
    playAgain.style.display = 'none';
    guessInput.focus();
  });

  addBtn.addEventListener('click', () => {
    const value = listInput.value.trim();
    if (value) {
      const li = document.createElement('li');
      li.textContent = value;
      itemList.appendChild(li);
      listInput.value = '';
    }
  });

  listInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBtn.click();
  });

  charInput.addEventListener('input', () => {
    charCount.textContent = charInput.value.length;
  });

  colorPicker.addEventListener('input', () => {
    colorBox.style.backgroundColor = colorPicker.value;
  });

  colorBox.style.backgroundColor = colorPicker.value;
