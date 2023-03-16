import { Visibility } from '@mui/icons-material'
import './widgetSmall.css'

const WidgetSmall = () => {
  
  return (
    <div className='widgetSm'>
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
            <li className="widgetSmListItem">
                <img src="images/1.jpeg" alt="" className='widgetSmImg' />
                <div className="widgetSmUser">
                  <div className="widgetSmUsername">Jobin Mathew</div>
                  <div className="widgetSmUserTitle">Software Engineer</div> 
                </div>
                <button className="widgetSmButton">
                  <Visibility className='widgetSmIcon'/>
                  Display
                </button>
            </li>
            <li className="widgetSmListItem">
                <img src="images/1.jpeg" alt="" className='widgetSmImg' />
                <div className="widgetSmUser">
                  <div className="widgetSmUsername">Jobin Mathew</div>
                  <div className="widgetSmUserTitle">Software Engineer</div> 
                </div>
                <button className="widgetSmButton">
                  <Visibility className='widgetSmIcon'/>
                  Display
                </button>
            </li>
            <li className="widgetSmListItem">
                <img src="images/1.jpeg" alt="" className='widgetSmImg' />
                <div className="widgetSmUser">
                  <div className="widgetSmUsername">Jobin Mathew</div>
                  <div className="widgetSmUserTitle">Software Engineer</div> 
                </div>
                <button className="widgetSmButton">
                  <Visibility className='widgetSmIcon'/>
                  Display
                </button>
            </li>
            <li className="widgetSmListItem">
                <img src="images/1.jpeg" alt="" className='widgetSmImg' />
                <div className="widgetSmUser">
                  <div className="widgetSmUsername">Jobin Mathew</div>
                  <div className="widgetSmUserTitle">Software Engineer</div> 
                </div>
                <button className="widgetSmButton">
                  <Visibility className='widgetSmIcon'/>
                  Display
                </button>
            </li>
            <li className="widgetSmListItem">
                <img src="images/1.jpeg" alt="" className='widgetSmImg' />
                <div className="widgetSmUser">
                  <div className="widgetSmUsername">Jobin Mathew</div>
                  <div className="widgetSmUserTitle">Software Engineer</div> 
                </div>
                <button className="widgetSmButton">
                  <Visibility className='widgetSmIcon'/>
                  Display
                </button>
            </li>
        </ul>
    </div>
  )
}

export default WidgetSmall