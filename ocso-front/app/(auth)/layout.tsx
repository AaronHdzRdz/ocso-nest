import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 bg-[#E70020] ">
            <Image src="oxxo-logo.svg" alt="OXXO Logo"
              width={200}
              height={100}
              className="mx-auto" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}