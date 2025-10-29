import { useParams, useNavigate } from "react-router-dom";
import cardData from "../data/cardData";
import { IoReturnUpBackOutline } from "react-icons/io5";

function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const card = cardData.find((c) => c.id === parseInt(id));

  if (!card) {
    return <h2 className="text-center mt-10">Solution not found</h2>;
  }

  return (
    <div className="bubbles-container">
      <main className="details-content">
        <div className="details-content-card">
          <IoReturnUpBackOutline 
            className="back-icon" 
            onClick={() => navigate("/")} 
          />  
          {card.image && <img src={card.image} alt={card.title} />}
          <div className="title-section">
            <h1>{card.title}</h1>
            <h2>{card.subtitle}</h2>
          </div>
          <p>{card.description}</p>
          <div className="tags">
            <p>{card.tags[0]}</p>
            <p>{card.tags[1]}</p>
          </div>

        </div>
      </main>
    </div>
  );
}

export default DetailsPage;
