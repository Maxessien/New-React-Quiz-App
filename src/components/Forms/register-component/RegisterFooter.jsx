import { Link } from 'react-router-dom';
import '../scss/form-footer.scss';

function RegisterFooter(){
    const pStyles = {
        fontSize: `${17/16}rem`,
        color: 'rgb(102, 102, 102)',
        textAlign: 'center'
    }

    const aStyles = {
        color: 'rgb(74, 2, 92)',
        fontWeight: '600'   
    }
    return(
        <>
        <p style={pStyles}>Already have an account <Link style={aStyles} to={"/login"}>Log In</Link> </p>
        </>
    )
}

export default RegisterFooter

