import Header from "./_components/Header";
import Sidebar from "./_components/_sidebar/Sidebar";

export default function LayoutDashboard({
    children,
    cout,
}: Readonly<{
    children: React.ReactNode;
    cout: React.ReactNode;
}>) {
    return (
        <div className="">
            <Header />
            <div className="flex flex-rew items-center bg-[f0f0f0]">
                <Sidebar />
                {children}
                {cout}
            </div>

        </div>
    )
}