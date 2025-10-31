import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cardData from "../data/cardData";
import { RiCloseLine } from "react-icons/ri";
import { TbDatabaseSearch } from "react-icons/tb";

function SearchPopup({ isOpen, onClose, query, setQuery }) {
  const navigate = useNavigate();
  const inputRef = useRef(null); 

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = cardData.filter(
    (card) =>
      card.title.toLowerCase().includes(query.toLowerCase()) ||
      (card.description &&
        card.description.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelect = (id) => {
    setQuery("");  // clear input on selection
    onClose();
    navigate(`/details/${id}`);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <RiCloseLine 
          className="close-btn"
          onClick={() => {
            setQuery(""); 
            onClose();
          }} 
        />
        <div className="search-block">
          <TbDatabaseSearch className="search-input-icon" />
          <input
            ref={inputRef} 
            type="text"
            placeholder="Search a solution..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            id="search-id"
          />
        </div>

        <ul className="search-results">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <li
                key={item.id}
                className="search-item"
                onClick={() => handleSelect(item.id)}
              >
                <span>{item.title}</span>
                {item.subtitle && <p>{item.subtitle}</p>}
              </li>
            ))
          ) : (
            <p className="no-results">
              {query ? "No results found" : "Type to search..."}
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SearchPopup;
