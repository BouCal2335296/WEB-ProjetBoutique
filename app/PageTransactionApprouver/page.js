"use client";
import { useState, useEffect } from "react";
import db from "../lib/localbase";

export default function TransactionAprrouver() {
  const [idUtilisateur, setIdUtilisateur] = useState(0);
  const [userToken, setUserToken] = useState("");
  const [panierVide, setPanierVide] = useState(false); // pour éviter double appel

  // Récupère les infos du token à partir de localbase
  useEffect(() => {
    async function fetchUserInfo() {
      const tokenDoc = await db.collection("tokens").doc("jwt").get();
      if (tokenDoc && tokenDoc.userId && tokenDoc.token) {
        setIdUtilisateur(tokenDoc.userId);
        setUserToken(tokenDoc.token);
      }
    }

    fetchUserInfo();
  }, []);

  // Vide le panier dès que les données utilisateur sont prêtes
  useEffect(() => {
    async function viderPanier() {
      if (!userToken || !idUtilisateur || panierVide) return;

      try {
        const res = await fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/paniers/viderPanier?idUtilisateur=${idUtilisateur}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${userToken}`,
          }
        });
        

        if (!res.ok) {
          console.error("Erreur lors du vidage du panier");
        } else {
          setPanierVide(true); // évite de le refaire plusieurs fois
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    }

    viderPanier();
  }, [userToken, idUtilisateur, panierVide]);

  return (
    <div className="flex flex-col text-center">
      <h1 className="descriptionErreur mt-4 mb-4">Merci pour votre commande !</h1>
      <p className="descriptionErreur mb-6">
        Une confirmation de commande vous a été envoyée par mail.
      </p>
      <img
        className="imageErreur"
        src="https://projet-prog4e07.cegepjonquiere.ca/confirmation.png"
        alt="Commande Confirmée"
      />
    </div>
  );
}
