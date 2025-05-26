"use client";

export default function SessionExpiree() {
  return (
    <div className="flex flex-col text-center">
      <h1 className="descriptionErreur mt-4 mb-4">Session expirée</h1>
      <p className="descriptionErreur mb-6">
        Vous avez été déconnecté automatiquement car votre session a expiré.
      </p>
      <img className="imageErreur" src="https://projet-prog4e07.cegepjonquiere.ca/Error401.png" alt="Session Expiree"></img>
    </div>
  );
}
