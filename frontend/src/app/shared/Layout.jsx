import AnimatedPage from './AnimatedPage'
import NavBar from '../screens/home/components/NavBar'
import { useSelector } from 'react-redux';

function Layout({children}) {
  const user = useSelector(state => state.session.user);

  return (
    <AnimatedPage>
      <div className="flex flex-col w-full h-full bg-white">
        <NavBar user={user} />
        {children}
      </div>
    </AnimatedPage>
  )
}

export default Layout