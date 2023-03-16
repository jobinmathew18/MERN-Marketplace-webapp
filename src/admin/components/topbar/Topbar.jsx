import './topbar.css'
import {NotificationsNone, Language, Settings} from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
function Topbar() {
  return (
    <div className='topbar'>
        <div className="topbarWrapper">
            <div className="topLeft">
                <NavLink to='/admin' className='link'>
                    <div className="logo">Admin</div>
                </NavLink>
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                    <NotificationsNone/>
                    <span className='topIconBadge'>2</span>
                </div>
                <div className="topbarIconContainer">
                    <Language/>
                </div>
                <div className="topbarIconContainer">
                    <Settings/>
                </div>
                <img src="/images/8.jpeg" alt="" className="topAvatar" />
            </div>
        </div>
    </div>
  )
}

export default Topbar