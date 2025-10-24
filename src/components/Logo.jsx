import { motion } from "framer-motion";
import "../style/Logo.css"; 

function Logo() {
  return (
    <motion.div
      className="logo-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      onClick={() => {}}
    >
      <motion.img
        src="/favicon.png"
        alt="logo"
        className="favicon"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <h3 className="logo-text">
        <span className="logo-highlight">J</span>WORK
      </h3>
    </motion.div>
  );
}

export default Logo;