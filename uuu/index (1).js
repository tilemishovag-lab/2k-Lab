const users = [
    { login: "user1", password: "123", name: "Алексей" },
    { login: "maria", password: "qwerty", name: "Мария" },
    { login: "admin", password: "adminpass", name: "Иван" },
    { login: "kate", password: "789", name: "Екатерина" },
    { login: "dev", password: "password", name: "Дмитрий" },
    { login: "alex", password: "555", name: "Александр" },
    { login: "olga", password: "abc", name: "Ольга" }
  ];
  
  const form = document.getElementById("authForm");
  const resultMsg = document.getElementById("result");
  
  form.addEventListener("submit", function (e) {
    e.preventDefault(); 
    const loginInput = document.getElementById("login").value;
    const passwordInput = document.getElementById("password").value;
  
    const foundUser = users.find(user => user.login === loginInput && user.password === passwordInput);
  
    if (foundUser) {
      resultMsg.textContent = `Добро пожаловать, ${foundUser.name}!`;
      resultMsg.className = "success";
    } else {
      resultMsg.textContent = "Неверный логин или пароль!";
      resultMsg.className = "error";
    }
  });
  
  

  function sumAll(...numbers) {
    let total = 0;
    for (let num of numbers) {
      total += num;
    }
    return total;
  }
  

  console.log(sumAll(2, 5, 6, 7)); 
  console.log(sumAll(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)); 