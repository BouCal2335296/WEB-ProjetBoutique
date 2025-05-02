"use client";
import { useState, useEffect } from "react";

const languages = [
  { code: "FR", label: "Français", icon: "/flag-for-flag-france-svgrepo-com.svg" },
  { code: "USA", label: "USA", icon: "/flag-for-flag-us-outlying-islands-svgrepo-com.svg" },
];

export default function LanguageSelector() {
  const [selected, setSelected] = useState("FR");
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour basculer l'état du dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Fonction pour sélectionner une langue
  const selectLanguage = (code) => {
    setSelected(code);
    setIsOpen(false);
  };

  // Fermer le dropdown si l'utilisateur clique ailleurs
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.dropdown')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="dropdown">
      <button 
        className="btn btn-secondary dropdown-toggle d-flex align-items-center gap-2" 
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <img 
          src={languages.find(l => l.code === selected)?.icon} 
          width="20" 
          height="15" 
          alt={selected}
        />
        {selected}
      </button>
      <ul className={`color4 dropdown-menu ${isOpen ? 'show' : ''}`}>
        {languages.map((lang) => (
          <li key={lang.code}>
            <button
              className="dropdown-item d-flex align-items-center gap-2"
              onClick={() => selectLanguage(lang.code)}
            >
              <img src={lang.icon} width="20" height="15" alt={lang.label} />
              {lang.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}