import { useState, useEffect } from "react";
import db from '../../lib/localbase';

export default function Connexion({ onClose }) {

  async function login(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const identifiant = formData.get('identifiant');
    const motDePasse = formData.get('motDePasse');

    try {
      const response = await fetch('https://projet-prog4e07.cegepjonquiere.ca/api/Accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Username: identifiant,
          Password: motDePasse
        })
      });

      const data = await response.json();

      if (data.token) {
        await stockerToken(data.token, data.role, data.userId, data.username);
        if (onClose) onClose();
        window.location.reload();
      } else {
        console.error("Token manquant dans la réponse");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion");
    }
  }


  return (
    <div className="formulaire p-3 shadow-sm">
      <form onSubmit={login}>
        <div className="mb-3">
          <label htmlFor="identifiant" className="form-label fw-semibold">Identifiant</label>
          <input
            type="text"
            id="identifiant"
            name="identifiant"
            className="form-control"
            placeholder="Votre identifiant"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="motDePasse" className="form-label fw-semibold">Mot de passe</label>
          <input
            type="password"
            id="motDePasse"
            name="motDePasse"
            className="form-control"
            placeholder="Votre mot de passe"
            required
          />
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-primary ">Connexion</button>
        </div>
      </form>
    </div>

  );
}

async function stockerToken(token, role, userId, username) {
  return db.collection('tokens').doc('jwt').set({
    id: 'jwt',
    token,
    role,
    userId,
    username
  });
}

