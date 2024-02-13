import "./header.css"

interface HeaderProps {
  newUser: string;
}
const Header: React.FC<HeaderProps> = (props) => {
  return ( 
      <div className="header-bar">
        <div className="header-bar-text-container">
        <img src="https://c.animaapp.com/IX1zE9E9/img/notification.svg"/>
          <p>Welcome, {props.newUser}</p>
        </div>
          
      </div>
  );
}

export default Header;