import './widgetLarge.css'

const WidgetLarge = () => {
  const Button = ({type}) => {
    return <button className={"widgetLgButton " + type}>{type}</button>
  }

  return (
    <div className='widgetLg'>
      <h3 className="widgetLgTitle">Latest Transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widhgetLgTh">Customer</th>
          <th className="widhgetLgTh">Date</th>
          <th className="widhgetLgTh">Amount</th>
          <th className="widhgetLgTh">Status</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img src="images/2.jpeg" alt="" className="widgetLgImg" />
            <span className="widgetLgName">Jeswin Mathew</span>
          </td>
          <td className="widgetLgDate">18 March 2023</td> 
          <td className="widgetLgAmount">$ 150.23</td> 
          <td className="widgetLgStatus">
            <Button type="Approved"/>
          </td> 
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img src="images/2.jpeg" alt="" className="widgetLgImg" />
            <span className="widgetLgName">Jeswin Mathew</span>
          </td>
          <td className="widgetLgDate">18 March 2023</td> 
          <td className="widgetLgAmount">$ 150.23</td> 
          <td className="widgetLgStatus">
            <Button type="Declined"/>
          </td> 
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img src="images/2.jpeg" alt="" className="widgetLgImg" />
            <span className="widgetLgName">Jeswin Mathew</span>
          </td>
          <td className="widgetLgDate">18 March 2023</td> 
          <td className="widgetLgAmount">$ 150.23</td> 
          <td className="widgetLgStatus">
            <Button type="Pending"/>
          </td> 
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img src="images/2.jpeg" alt="" className="widgetLgImg" />
            <span className="widgetLgName">Jeswin Mathew</span>
          </td>
          <td className="widgetLgDate">18 March 2023</td> 
          <td className="widgetLgAmount">$ 150.23</td> 
          <td className="widgetLgStatus">
            <Button type="Approved"/>
          </td> 
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img src="images/2.jpeg" alt="" className="widgetLgImg" />
            <span className="widgetLgName">Jeswin Mathew</span>
          </td>
          <td className="widgetLgDate">18 March 2023</td> 
          <td className="widgetLgAmount">$ 150.23</td> 
          <td className="widgetLgStatus">
            <Button type="Approved"/>
          </td> 
        </tr>
      </table>
    </div>
  )
}

export default WidgetLarge