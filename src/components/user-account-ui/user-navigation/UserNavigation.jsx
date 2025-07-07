import './user-navigation.scss'
import {Link} from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import {motion} from 'framer-motion'
import { useState } from 'react';
import {HiChevronRight,HiChevronLeft} from 'react-icons/hi'
import useMobileView from './../../stores-component/WindowWidthState';

function UserNavigation(){
    const [navOpen, setNavOpen] = useState(false)
    const {mobileView} = useMobileView()
    useState(()=>{
        mobileView ? setNavOpen(false) : null
    }, [])
    return(
        <>
        {mobileView && (<div onClick={()=>setNavOpen(!navOpen)} className='menu-toggle'>
            {!navOpen ? <HiChevronRight /> : <HiChevronLeft />}
        </div>)}
        <motion.nav
        variants={{
            hidden: {opacity: 0,
            x: '-200%'},
            visible: {
                opacity: 1,
                x: 0
            }
        }}
        initial='hidden'
        animate={!navOpen ? 'hidden' : 'visible'}
        transition={{
            duration: 1.2
        }}
        className="user-account-navigation">
            <ul>
                <li><Link to={"/admin/dashboard"}>DashBoard</Link></li>
                <li><Link to={"/admin/quiz"}>Quiz</Link></li>
                <li>Profile</li>
                <li>Settings</li>
            </ul>
        </motion.nav>
        </>
    )
}

export default UserNavigation