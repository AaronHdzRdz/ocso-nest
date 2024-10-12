import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

export default function LoginPage() {
  return (


    <div>
      <p className="text-2xl my-4 text-center text-black font-bold mx-4">
        Inicio de Sesión<span></span>
      </p>
      <div className="flex flex-col gap-2 my-2">
        <Input label="Correo Electrónico" type="email" isRequired={true} size="sm" />
        <Input label="Contraseña" type="password" isRequired={true} size="sm" />
      </div>
      <div className="flex flex-col">
        <Button className="w-full bg-[#FBB110] hover:bg-[#E6A100] text-black">Iniciar seción</Button>
      </div>
      <p>
        ¿No tienes una cuenta? <Link href="/signup" className="text-[#E70020] hover:text-gray-400">Registrate</Link>
      </p>
    </div>


  );
}