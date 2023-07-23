import { useLocation } from 'react-router-dom';


const usePathname = () => {
  const location = useLocation();
  return location.pathname.substring(1);
}

export default usePathname;