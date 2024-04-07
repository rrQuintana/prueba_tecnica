import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { clearSession } from '../../../logic/auth/session.reducer';

function NavBar({ user }) {
  const dispatch = useDispatch()

  const { firstName, lastName, roleName } = user

  const handleLogout = () => {
    dispatch(clearSession())
  }
  return (
    <div className="w-full px-8 py-3 flex flex-row justify-between items-center bg-white border border-zinc-200 shadow-md">
      <p className="font-medium">User administration</p>
      <div className='flex flex-row space-x-4'>
        <div className="flex flex-col">
          <p className="font-medium mb-[-4px]">{firstName + ' ' + lastName}</p>
          <p className="text-right text-sm text-zinc-500">{roleName}</p>
        </div>
        <button onClick={handleLogout} className='cursor-pointer items-center justify-center aspect-square rounded-full'>
          <LogoutIcon />
        </button>
      </div>
    </div>
  )
}

export default NavBar