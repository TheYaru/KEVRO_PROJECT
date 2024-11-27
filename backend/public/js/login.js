document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Login exitoso: redirigir
        window.location.href = 'frontend/Kevro.html'; 
      } else {
        // Mostrar mensaje de error
        document.getElementById('message').innerText = data.message || 'Login failed';
      }
    } catch (error) {
      document.getElementById('message').innerText = 'Error connecting to the server.';
      console.error(error);
    }
  });
  