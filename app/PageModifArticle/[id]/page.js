'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import db from '../../lib/localbase';

export default function PageModifArticle() {
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  const router = useRouter();

  async function recupererToken() {
    try {
      const record = await db.collection('tokens').doc('jwt').get();
      if (record) {
        const { token, username, role } = record;
        if (role !== 'Administrateur') {
          router.push('/'); // Rediriger si pas admin
        }
        return token;
      } else {
        router.push('/'); // Rediriger si pas connecté
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du token :", error);
      return null;
    }
  }

  useEffect(() => {
    async function fetchArticle() {
      const token = await recupererToken();
      if (!token) return;

      try {
        const res = await fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/article/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setArticle(data);
        } else {
          console.error("Erreur lors de la récupération de l'article");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    }

    fetchArticle();
  }, [id]);

  async function modifierProduit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const token = await recupererToken();

    const updatedArticle = {
      id: parseInt(id),
      Nom: formData.get('nom'),
      Prix: parseFloat(formData.get('prix')),
      Image: formData.get('lienImage'),
      Description: formData.get('description'),
      QuantiteInventaire: parseInt(formData.get('quantite')),
      CategorieArticleId: parseInt(formData.get('categorie'))
    };

    try {
      const res = await fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/article/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedArticle)
      });

      if (res.ok) {
        afficherAlerte("Article modifié avec succès.");
      } else {
        console.error("Erreur lors de la modification :", await res.text());
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  }

  async function supprimerProduit(event) {
    event.preventDefault();
    const token = await recupererToken();

    try {
      const res = await fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/article/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        afficherAlerte("Article supprimé avec succès.");
      } else {
        console.error("Erreur lors de la suppression :", await res.text());
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  }

  function afficherAlerte(message) {
    const alerteDiv = document.getElementById("alerteSucces");
    const texteErreur = document.getElementById("texteSucces");

    texteErreur.textContent = message;
    alerteDiv.classList.remove("d-none"); // Affiche l'alerte
  }

  function masquerAlerte(message) {
      const alerteDiv = document.getElementById("alerteSucces");
      alerteDiv.classList.add("d-none"); // Supprime l'alerte
  }

  if (!article) return <div>Chargement...</div>;

  return (
    <form className="ajoutProduit" onSubmit={modifierProduit}>
      <div className="image-panel">
        <input type="text" name="lienImage" defaultValue={article.image} placeholder="Lien Image..." required />
      </div>

      <div className="texte-panel">
        <div className="titre-box">
          <input type="text" name="nom" defaultValue={article.nom} placeholder="Nom du produit..." required />
        </div>

        <div className="description-box">
          <textarea name="description" defaultValue={article.description} placeholder="Description du produit..." required></textarea>
        </div>

        <div className="small-boxes">
          <div>
            <input type="number" name="quantite" defaultValue={article.quantiteInventaire} step="1" min="0" placeholder="Quantité" required />
          </div>
          <div>
            <input type="number" name="prix" defaultValue={article.prix} step="0.01" min="0" placeholder="Prix" required />
          </div>
        </div>

        <div className="categorie-box">
          <select name="categorie" className="categorie" defaultValue={article.categorieArticleId} required>
            <option value="1">Productivité / Élégance</option>
            <option value="2">Décoration / Ambiance</option>
            <option value="3">Confort / Style</option>
            <option value="4">Starter pack</option>
            <option value="5">Accessoire</option>
          </select>
        </div>

        <div className="bouton-box">
          <button className="btn btn-danger me-2" onClick={supprimerProduit}>Supprimer</button>
          <button className="btn btn-primary" type="submit">Modifier</button>
        </div>

        <div id="alerteSucces" className="alert alert-success alert-dismissible fade show d-none mt-3" role="alert">
          <span id="texteSucces"></span>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Fermer" onClick={masquerAlerte}></button>
        </div>
      </div>
    </form>
  );
}
