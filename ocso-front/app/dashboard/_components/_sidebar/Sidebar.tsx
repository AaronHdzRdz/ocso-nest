import { LuStore, LuUser, LuUsers, LuWheat, LuTruck } from 'react-icons/lu';
import NavItem from './NavIterm';

export default function Sidebar() {
    return (
        <nav className="w-[10vw] h-[90vh] flex flex-col items-center py-5 bg-[#FEDCE1] justify-center gap-10">
            <NavItem icon={<LuStore className='text-4xl' />} path="/dashboard" />
            <NavItem icon={<LuTruck className='text-4xl' />} path="/dashboard/providers" />
            <NavItem icon={<LuWheat className='text-4xl' />} path="/dashboard/products" />
            <NavItem icon={<LuUser className='text-4xl' />} path="/dashboard/managers" />
            <NavItem icon={<LuUsers className='text-4xl' />} path="/dashboard/employees" />
        </nav>
    )
}