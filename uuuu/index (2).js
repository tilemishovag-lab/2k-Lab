// Функция считает любое количество чисел
function sumAll(...numbers) {
    let sum = 0;
  
    for (let number of numbers) {
      sum += number;
    }
  
    return sum;
  }
  
  // Получаем числа и выводим результат
  function calculate() {
    let input = document.getElementById("numbers").value;
  
    let numbers = input.split(",").map(Number);
  
    let result = sumAll(...numbers);
  
    document.getElementById("result").textContent =
      "✨ Сумма: " + result;
  }
  