import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cardData from "../data/cardData";
import { RiCloseLine } from "react-icons/ri";
import { TbDatabaseSearch } from "react-icons/tb";

function SearchPopup({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null); // 👈 ref for input

  // 🧠 Focus input whenever popup opens
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
    onClose();
    navigate(`/details/${id}`);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <RiCloseLine className="close-btn" onClick={onClose} />

        <div className="search-block">
          <TbDatabaseSearch className="search-input-icon" />
          <input
            ref={inputRef} // 👈 auto-focus input
            type="text"
            placeholder="Search a solution..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
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
