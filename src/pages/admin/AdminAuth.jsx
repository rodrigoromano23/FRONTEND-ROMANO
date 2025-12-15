


//=====================================================================
//=====================================================================
//=====================================================================

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-romano.onrender.com";
export default function AdminAuth() {
  const navigate = useNavigate();
  const [modo, setModo] = useState("");
  const [showTarjeta, setShowTarjeta] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    celular: "",
    clave: "",
    nuevaClave: "",
    edad: "",
    dni: "",
    fechaNacimiento: "",
    domicilio: "",
    rol: "empleado",
    foto: null,
  });

  const handleChange = (e) => {
    console.log("Cambio en input:", e.target.name, "=>", e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (modo) {
      setShowTarjeta(false);
      const timer = setTimeout(() => setShowTarjeta(true), 50);
      return () => clearTimeout(timer);
    }
  }, [modo]);

  // ================================
  // LOGIN
  // ================================
  const login = async () => {
    console.log("Intentando login con:", form.nombre, form.clave);

    if (!form.nombre || !form.clave) {
      Swal.fire("Error", "Completa todos los campos antes de continuar.", "error");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: form.nombre.trim(), clave: form.clave }),
      });

      const data = await response.json();
      console.log("Respuesta login:", data);

      if (!response.ok) {
        Swal.fire("Error", data.msg || "Error al iniciar sesión", "error");
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Usuario encontrado",
        text: `Rol: ${data.user.rol}`,
        confirmButtonText: "Ingresar",
      }).then(() => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // fuerza React a recargar el estado
        window.dispatchEvent(new Event("storage"));
        navigate("/admin/dashboard");
      });
    } catch (err) {
      console.error("ERROR LOGIN FRONTEND:", err);
      Swal.fire("Error", "Error inesperado en el login", "error");
    }
  };

  // ================================
  // RECUPERAR CLAVE
  // ================================
  const forgotPaso1 = async () => {
 console.log("Intentando forgotPaso1 con:", form.nombre, form.correo, form.celular);

 if (!form.nombre || !form.correo || !form.celular) {
   Swal.fire("Error", "Completa todos los campos antes de continuar.", "error");
   return;
 }

 try {
   const res = await axios.post(`${API_BASE_URL}/api/auth/forgot`, {
     nombre: form.nombre,
     correo: form.correo,
     celular: form.celular,
   });

   console.log("Respuesta forgotPaso1:", res.data);
   Swal.fire("Verificado", "Identidad verificada, ingresar nueva clave", "success");
   setModo("forgot2");
 } catch (e) {
   console.error("ERROR forgotPaso1:", e);
   Swal.fire("Error", e.response?.data?.msg || "Error al verificar datos", "error");
 }
};


  const forgotPaso2 = async () => {
    console.log("Intentando forgotPaso2 con:", form.correo, form.nuevaClave);

    if (!form.nuevaClave || form.nuevaClave.length < 6) {
      Swal.fire("Error", "La nueva clave debe tener al menos 6 caracteres", "error");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        correo: form.correo,
        nuevaClave: form.nuevaClave,
      });
      console.log("Respuesta forgotPaso2:", res.data);
      Swal.fire("Clave actualizada", "Clave actualizada correctamente", "success");
      setModo("");
    } catch (e) {
      console.error("ERROR forgotPaso2:", e);
      Swal.fire("Error", e.response?.data?.msg || "Error al actualizar clave", "error");
    }
  };

  // ================================
  // REGISTRO
  // ================================
  const register = async () => {
  console.log("Intentando register con:", form);

  // VALIDACIONES BÁSICAS
  if (!form.nombre || !form.correo || !form.clave || !form.edad || !form.dni || !form.fechaNacimiento || !form.domicilio) {
    Swal.fire("Error", "Completa todos los campos obligatorios", "error");
    return;
  }
  if (!/\S+@\S+\.\S+/.test(form.correo)) {
    Swal.fire("Error", "Correo inválido", "error");
    return;
  }
  if (isNaN(form.edad) || form.edad <= 0) {
    Swal.fire("Error", "Edad inválida", "error");
    return;
  }

  // Fecha ya viene en formato YYYY-MM-DD
  const fechaObj = new Date(form.fechaNacimiento);
  if (isNaN(fechaObj.getTime())) {
    Swal.fire("Error", "Fecha de nacimiento inválida", "error");
    return;
  }

  // ARMAR FormData de manera explícita
  const data = new FormData();
  data.append("nombre", form.nombre);
  data.append("correo", form.correo);
  data.append("clave", form.clave);
  data.append("edad", form.edad);
  data.append("dni", form.dni);
  data.append("fechaNacimiento", form.fechaNacimiento);
  data.append("domicilio", form.domicilio);
  data.append("celular", form.celular);
  data.append("rol", form.rol);
  if (form.foto) data.append("foto", form.foto);

  try {
    const res = await axios.post("http://localhost:4000/api/auth/register", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Respuesta register:", res.data);
    Swal.fire("Usuario creado", "Usuario registrado correctamente", "success");
    setModo("");
  } catch (e) {
    console.error("REGISTER ERROR:", e);
    Swal.fire("Error", e.response?.data?.msg || "Error al crear usuario", "error");
  }
};

  // ================================
  // TARJETA PRINCIPAL
  // ================================
  const TarjetaInicial = () => (
    <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 shadow-lg p-6 rounded-2xl w-60 h-[300px] flex flex-col gap-2 relative z-20 right-[130px]">
      <h2 className="text-xl font-bold mb-1 text-center text-blue-700">Panel Administrativo</h2>
      <button onClick={() => setModo("login")} className="w-full bg-purple-400 text-white py-2 rounded-lg hover:bg-gray-500 transition duration-300">Iniciar sesión</button>
      <button onClick={() => setModo("register")} className="w-full bg-pink-400 text-white py-2 rounded-lg hover:bg-gray-500 transition duration-300">Crear cuenta</button>
      <button onClick={() => setModo("forgot1")} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-gray-500 transition duration-300">Olvidé mi clave</button>
    </div>
  );

  // ================================
  // TARJETAS DERECHA
  // ================================
  const tarjetas = {
    login: (
      <div className={`absolute top-12 left-[250px] w-62 h-[280px] bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 shadow-lg p-6 rounded-2xl flex flex-col gap-2 overflow-hidden transform transition-transform duration-500 ${showTarjeta ? "translate-x-105 opacity-100" : "-translate-x-0 opacity-0"}`}>
        <h2 className="text-xl font-semibold mb-2 text-left text-blue-700">Iniciar sesión</h2>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="w-full border p-2 rounded-lg mb-2 text-sm"/>
        <input name="clave" type="password" placeholder="Clave" value={form.clave} onChange={handleChange} className="w-full border p-2 rounded-lg mb-2 text-sm"/>
        <button onClick={login} className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300 text-sm">Entrar</button>
      </div>
    ),
    register: (
      <div className={`absolute top-12 left-[250px] w-80 h-[490px] bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 shadow-lg p-2 rounded-2xl flex flex-col gap-1 overflow-hidden transform transition-transform duration-400 ${showTarjeta ? "translate-x-105 opacity-100" : "-translate-x-0 opacity-0"}`}>
        <h2 className="text-xl font-semibold mb-1 text-center text-blue-700">Crear cuenta</h2>
        
        {["nombre","correo","celular","edad","dni","domicilio"].map((campo) => (
          <input 
            key={campo} 
            name={campo} 
            placeholder={campo} 
            value={form[campo]} 
            onChange={handleChange} 
            className="w-full border p-1 rounded mb-1 text-sm"
          />
        ))}

        {/* Campo de fecha de nacimiento con calendario */}
        <input 
          type="date" 
          name="fechaNacimiento" 
          placeholder="Selecciona tu fecha de nacimiento" 
          value={form.fechaNacimiento} 
          onChange={handleChange} 
          className="w-full border p-1 rounded mb-1 text-sm"
        />

        <input 
          name="clave" 
          type="password" 
          placeholder="Clave" 
          value={form.clave} 
          onChange={handleChange} 
          className="w-full border p-2 rounded mb-1 text-sm"
        />

        <input 
          type="file" 
          name="foto" 
          accept="image/*" 
          onChange={(e) => { 
            console.log("Archivo seleccionado:", e.target.files[0]); 
            setForm({...form, foto: e.target.files[0]})
          }} 
          className="w-full border p-2 rounded mb-2 text-sm"
        />

        <div className="flex gap-4 mb-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="rol" value="jefe" checked={form.rol==="jefe"} onChange={handleChange}/>Jefe
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="rol" value="empleado" checked={form.rol==="empleado"} onChange={handleChange}/>Empleado
          </label>
        </div>

        <button 
          onClick={register} 
          className="w-full bg-green-400 text-white py-2 rounded-lg hover:bg-green-500 transition duration-300 text-sm"
        >
          Crear cuenta
        </button>
      </div>
    ),

    forgot1: (
      <div className={`absolute top-12 left-[250px] w-79 h-[280px] bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 shadow-lg p-5 rounded-2xl flex flex-col gap-1 overflow-hidden transform transition-transform duration-500 ${showTarjeta ? "translate-x-105 opacity-100" : "-translate-x-0 opacity-0"}`}>
        <h2 className="text-xl font-semibold mb-1 text-center text-blue-700">Olvidé mi clave</h2>
        <p className="text-gray-600 text-center mb-2">Verificar identidad</p>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="w-full border p-2 rounded mb-1 text-sm"/>
        <input name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} className="w-full border p-2 rounded mb-1 text-sm"/>
        <input name="celular" placeholder="Celular" value={form.celular} onChange={handleChange} className="w-full border p-2 rounded mb-2 text-sm"/>
        <button onClick={forgotPaso1} className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition duration-300 text-sm">Verificar</button>
      </div>
    ),
    forgot2: (
      <div className={`absolute top-12 left-[250px] w-76 h-[250px] bg-gradient-to-br from-pink-200 via-yellow-200 to-green-200 shadow-lg p-6 rounded-2xl flex flex-col gap-2 overflow-hidden transform transition-transform duration-500 ${showTarjeta ? "translate-x-105 opacity-100" : "-translate-x-0 opacity-0"}`}>
        <h2 className="text-xl font-semibold mb-2 text-center text-blue-700">Nueva clave</h2>
        <input name="nuevaClave" type="password" placeholder="Nueva clave" value={form.nuevaClave} onChange={handleChange} className="w-full border p-2 rounded mb-2 text-sm"/>
        <button onClick={forgotPaso2} className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition duration-300 text-sm">Guardar nueva clave</button>
      </div>
    ),
  };

  return (
    <div className="min-h-screen flex justify-center items-start gap-10 bg-pink-50 p-10 relative">
      <TarjetaInicial />
      {modo !== "" && tarjetas[modo]}
    </div>
  );
}

