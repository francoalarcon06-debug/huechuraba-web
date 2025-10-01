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

      // Guardar en ambos storages por si acaso
      localStorage.setItem("email", emailToStore);
      sessionStorage.setItem("email", emailToStore);

      alert("✅ Bienvenido " + (data.user?.nombre || ""));

      // Redirige pasando también el correo por querystring (belt & suspenders)
      window.location.href = "verify.html?email=" + encodeURIComponent(emailToStore);
    } else {
      alert("❌ Error: " + (data?.error || "Credenciales inválidas"));
    }
  } catch (err) {
    console.error(err);
    alert("❌ No se pudo conectar con el servidor");
  }
}
