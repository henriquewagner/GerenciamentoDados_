document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
  
    const resultDiv = document.getElementById('result');
    if (response.ok) {
      const token = data.token;
      localStorage.setItem('token', token);
      resultDiv.textContent = 'Login successful. Token saved. Token: ' + token;
    } else {
      resultDiv.textContent = 'Login failed. Check your credentials.';
    }
  });
  