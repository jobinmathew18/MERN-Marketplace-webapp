import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../../../requestMethods";
import "./widgetSmall.css";

const WidgetSmall = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/users?new=true");
        setUsers(res.data);
      } catch (error) {
        console.log(error)
      }
    };
    getUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {
          users.map((user)=> (
            <li className="widgetSmListItem" key={user._id}>
            <img src= {user.img || "images/noAvatar.png"} alt="" className="widgetSmImg" />
            <div className="widgetSmUser">
              <div className="widgetSmUsername">{user.username}</div>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
          ))
        }
      </ul>
    </div>
  );
};

export default WidgetSmall;
