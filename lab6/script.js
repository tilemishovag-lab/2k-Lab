document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
  
    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
  
        const contents = document.querySelectorAll('.tab-content');
        contents.forEach(content => content.classList.remove('active'));
  
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  });
  
  function checkAnswer(buttonElement, isCorrect) {
    const resultText = buttonElement.parentElement.nextElementSibling;
    
    if (isCorrect) {
      resultText.textContent = 'Правильно! 👍';
      resultText.style.color = '#2e7d32';
    } else {
      resultText.textContent = 'Неверно, попробуйте ещё раз! ❌';
      resultText.style.color = '#c2185b';
    }
  }