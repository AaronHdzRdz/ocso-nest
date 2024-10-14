"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import axios from "axios";

export default function LoginPage() {
  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); // Usar e.currentTarget en lugar de e.target
    let authData: any = {};
    authData.userEmail = formData.get('userEmail');
    authData.userPassword = formData.get('userPassword');
    // Enviar solicitud POST a la API de autenticación
    const { data } = await axios.post("http://127.0.0.1:4000/auth/login", {
      ...authData
    });
    console.log(authData.userPassword)
    console.log(authData.userEmail)
    return;
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-2xl my-4 text-center text-black font-bold mx-4">
        Inicio de Sesión<span></span>
      </p>
      <div className="flex flex-col gap-2 my-2">
        <Input label="Correo Electrónico" name="userEmail" type="email" isRequired={true} size="sm" />
        <Input label="Contraseña" type="password" name="userPassword" isRequired={true} size="sm" />
      </div>
      <div className="flex flex-col">
        <Button type="submit" className="w-full bg-[#FBB110] hover:bg-[#E6A100] text-black">Iniciar sesión</Button>
      </div>
      <p className="text-center">
        ¿No tienes una cuenta? <Link href="/signup" className="text-[#E70020] hover:text-gray-400">Regístrate</Link>
      </p>
    </form>
  );
}