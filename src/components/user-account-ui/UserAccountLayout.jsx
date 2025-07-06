import UserNavigation from "./user-navigation/UserNavigation";
import './user-account-layout.scss'

function UserAccountLayout({children}){
    return(
        <div className="account-layout">
        <UserNavigation />
        <main>{children}</main>
        </div>
    )
}

export default UserAccountLayout