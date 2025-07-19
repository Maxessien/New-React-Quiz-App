import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import UserAccountLayout from "../../layout-components/UserAccountLayout";
import "./scss/user-profile.scss";
import { useState } from "react";

function UserProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const [editForm, setEditForm] = useState(true);
  const handleSave = () => {
    setEditForm(true);
    setShowPassword(false);
  };
  return (
    <>
      {console.log(editForm)}
      <UserAccountLayout>
        <section className="user-profile-section">
          <h1>Profile</h1>
          <div className="user-profile-image">
            <FaUser />
          </div>
          <form
            className="user-profile-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="display-name">
              <span className="input-tag">Display Name</span>
              <input
                disabled={editForm}
                type="text"
                id="display-name"
                value={"Max Essien"}
              />
            </label>
            <label htmlFor="email">
              <span className="input-tag">Email</span>
              <input
                disabled={editForm}
                type="email"
                id="email"
                value={"admin@gmail.com"}
              />
            </label>
            <label htmlFor="username">
              <span className="input-tag">Username</span>
              <input
                disabled={editForm}
                type="text"
                id="username"
                value={"maxessien"}
              />
            </label>
            <label htmlFor="password">
              <span className="input-tag">Password</span>
              {/* <span className="password-input-wrapper">
              </span> */}
                <input
                  disabled={editForm}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={"maxessien"}
                />
                {showPassword ? (
                    <div>
                  <FaEye
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      editForm ? true : setShowPassword(!showPassword)
                    }
                    size={20}
                  /> <span style={{marginLeft: `${10/16}rem`}}>Hide Password</span>
                    </div>
                ) : (
                    <div>
                  <FaEyeSlash
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      editForm ? true : setShowPassword(!showPassword)
                    }
                    size={20}
                  /> <span style={{marginLeft: `${10/16}rem`}}>Show Password</span>
                    </div>
                )}
            </label>

            <div className="form-btns">
              <button onClick={() => setEditForm(false)}>Edit</button>
              <button onClick={() => handleSave()}>Save</button>
            </div>
          </form>
        </section>
      </UserAccountLayout>
    </>
  );
}

export default UserProfile;
