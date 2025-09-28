async function login(event) {
  event.preventDefault(); // evita que la página se recargue

  // Obtén los valores del formulario
  const correo = document.getElementById("correo").value.trim();
  const contrasenia = document.getElementById("contrasenia").value;

  try {
    const res = await fetch("https://api.proyectosfranco.cl/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contrasenia })
    });

    const data = await res.json();

    if (data && data.ok) {
      // Usa el correo del backend si viene; si no, usa el del input
      const emailToStore = (data.user && data.user.correo ? String(data.user.correo) : correo).trim();
      localStorage.setItem("email", emailToStore);

      alert("✅ Bienvenido " + (data.user?.nombre || ""));

      // Redirige a la página del ciudadano
      window.location.href = "verify.html";
    } else {
      alert("❌ Error: " + (data?.error || "Credenciales inválidas"));
    }
  } catch (err) {
    console.error(err);
    alert("❌ No se pudo conectar con el servidor");
  }
}
