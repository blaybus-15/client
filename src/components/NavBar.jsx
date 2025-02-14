import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

const NavBar = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate('/');
  };

  // TODO: 상단바 추후 디자인 보고 수정 필요
  return (
    <nav style={styles.nav}>
      <button onClick={goBack} style={styles.button}>
        <FaArrowLeft />
      </button>
      <span style={styles.text}>텍스트</span>
      <button onClick={goHome} style={styles.button}>
        <FaHome />
      </button>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #dee2e6',
  },
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
  },
  text: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default NavBar;
