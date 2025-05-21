import { useState, useEffect } from "react";
import db from '../../lib/localbase';

export default function Connexion() {

  function login(event) {
    event.preventDefault(); // ✅ à faire en premier

    const formData = new FormData(event.target);
    const identifiant = formData.get('identifiant');
    const motDePasse = formData.get('motDePasse');

    fetch('https://projet-prog4e07.cegepjonquiere.ca/api/Accounts/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Username: identifiant,
        Password: motDePasse
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          stockerToken(data.token, data.userName, data.role);
        }
      })
      .catch(err => {
        console.error("Erreur lors de la connexion");
      });
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
          <button type="submit" className="buttonBurger">Connexion</button>
        </div>
      </form>
    </div>

  );
}

function stockerToken(token, userName, role) {
  db.collection('tokens').set([
    { id: 'jwt', token: token, username: userName, role: role }
  ]);

}
