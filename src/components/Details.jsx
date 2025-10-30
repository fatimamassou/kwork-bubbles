import { useParams, useNavigate } from "react-router-dom";
import cardData from "../data/cardData";
import { IoReturnUpBackOutline } from "react-icons/io5";
import "../style/Details.css";

function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const card = cardData.find((c) => c.id === parseInt(id));

  if (!card) {
    return <h2 className="text-center mt-10">Solution not found</h2>;
  }

  return (
    <div className="details-content">
      <main className="bubbles-container">
        <div className="details-content-card">
          <IoReturnUpBackOutline 
            className="back-icon" 
            onClick={() => navigate("/")} 
          />  
          <div className="card">
            <div className="img-container">
              {card.img && <img src={card.img} alt={card.title} />}
            </div>
            <div className="text-container">
              <div className="title-section">
                <h1>{card.title}</h1>
                <h2>{card.subtitle}</h2>
              </div>
              <div className="body">
                <p>{card.description}</p>
                <h2>Fonctionnalités</h2>
                <div className="tags">
                  {card.Fonctionnalités.map((f,index)=><span key={index}>{f}</span>)}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default DetailsPage;
