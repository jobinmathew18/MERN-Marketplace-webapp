import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./newUser.css";

const NewUser = () => {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newUser">
          <h1 className="newUserTitle">New User</h1>
          <form className="newUserForm">
            <div className="newUserItem">
              <label>Username</label>
              <input type="text" placeholder="Jeswin" />
            </div>
            <div className="newUserItem">
              <label>Full Name</label>
              <input type="text" placeholder="Jeswin Mathew" />
            </div>
            <div className="newUserItem">
              <label>Email</label>
              <input type="email" placeholder="jeswin02@gmail.com" />
            </div>
            <div className="newUserItem">
              <label>Password</label>
              <input type="password" placeholder="password" />
            </div>
            <div className="newUserItem">
              <label>Phone</label>
              <input type="text" placeholder="+91 987456321" />
            </div>
            <div className="newUserItem">
              <label>Address</label>
              <input type="text" placeholder="address" />
            </div>
            <div className="newUserItem">
              <label>Gender</label>
              <div className="newUserGender">
                <input type="radio" name="gender" id="male" value="male" />
                <label for="male">Male</label>
                <input type="radio" name="gender" id="female" value="female" />
                <label for="female">Female</label>
                <input type="radio" name="gender" id="other" value="other" />
                <label for="Other">Other</label>
              </div>
            </div>
            <div className="newUserItem">
              <label>Active</label>
              <select name="active" id="active" className="newUserSelect">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <button className="newUserButton">Create</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewUser;
