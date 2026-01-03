import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      textAlign: 'center', 
      padding: '20px 0', 
      marginTop: '40px',
      borderTop: '1px solid #eee',
      color: '#666'
    }}>
      <p>&copy; {currentYear} Revolution Basketball Stats. Made by James Hare.</p>
    </footer>
  );
};

export default Footer;