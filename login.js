async function login(event) {
  event.preventDefault(); // evita que la página se recargue

  // Obtén los valores del formulario
  const correo = document.getElementById("correo").value;
  const contrasenia = document.getElementById("contrasenia").value;

  try {
    const res = await fetch("https://api.proyectosfranco.cl/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contrasenia })
    });

    const data = await res.json();

    if (data.ok) {
      alert("✅ Bienvenido " + data.user.nombre);

      // Guarda el correo en localStorage para usarlo en verify.html
      localStorage.setItem("email", correo);

      // Redirige a otra página (ej: verify.html o dashboard)
      window.location.href = "verify.html";
    } else {
      alert("❌ Error: " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("❌ No se pudo conectar con el servidor");
  }
}

