import { ReactTyped } from "react-typed";
import { IoMdSearch } from "react-icons/io";

function Header({ onSearchClick }) {
  return (
    <header className="header">
      <div className="header-left">
        <img src="/jway-col.png" alt="logo" className="logo" />
        <h1 className="company-name">
          J<span className="company-name-highlight">work</span>
        </h1>
      </div>

      <div className="header-right">
        <h1 className="solutions">
          <ReactTyped
            strings={["< Nos Solutions", "< Innovantes", "< Adaptées à Vous"]}
            typeSpeed={80}
            backSpeed={50}
            backDelay={1500}
            showCursor={true}
            cursorChar=" />"
            loop={true}
          />
        </h1>
      </div>
      <div className="search">
        <IoMdSearch
            className="search-icon"
            onClick={onSearchClick}
            title="Search"
        />
      </div>  
    </header>       
  );
}

export default Header;
