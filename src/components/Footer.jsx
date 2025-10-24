import "../style/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
          <p> +212 633-130-204</p>
          <p> +212 612-456-789</p>
          <p> contact@jway.ma</p>
        </div>
      <p className="footer-bottom">
        © {new Date().getFullYear()} JWORK — Tous Droits Réservés 🚀
      </p>
    </footer>
  );
}

export default Footer;

