'use client';

import db from '../lib/localbase';
import { useRouter } from "next/navigation";

export default function AddProduit() {
  const router = useRouter();

  async function recupererToken() {
    try {
      const record = await db.collection('tokens').doc('jwt').get();
      if (record) {
        const { token, username, role } = record;
        return { token, username, role };
      } else {
        return null; // Aucun token trouvé
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du token :", error);
      return null;
    }
  }

  async function utiliserToken() {
    const result = await recupererToken();
    if (result) {
      return result.token;
    }
    else {
      window.location.href = "../SessionExpirer";
      db.collection('tokens').delete();
    }
  }



  async function envoyerProduit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const Image = formData.get('lienImage');
    const Nom = formData.get('nom');
    const Description = formData.get('description');
    const QuantiteInventaire = parseInt(formData.get('quantite'));
    const Prix = parseFloat(formData.get('prix'));
    const CategorieArticleId = parseInt(formData.get('categorie'));
    const token = await utiliserToken();

    fetch('https://projet-prog4e07.cegepjonquiere.ca/api/article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        Nom,
        Prix,
        Image,
        Description,
        QuantiteInventaire,
        CategorieArticleId
      })
    })
      .then(res => {
        if (!res.ok) {
          window.location.href = "../SessionExpirer";
          db.collection('tokens').delete();
        }
        else{          
        router.push("../PageArticle/Tout");
        event.target.reset();
        }
        return res.json();
      })
  }

  return (
    <form className="DetailsProduit" onSubmit={envoyerProduit}>
      <div className="image-panel borderDashed">
        <input type="text" name="lienImage" placeholder="Lien Image..." required />
      </div>

      <div className="texte-panel">
        <div className="titre-box borderDashed">
          <input type="text" name="nom" placeholder="Nom du produit..." required />
        </div>

        <div className="description-box borderDashed">
          <textarea name="description" placeholder="Description du produit..." required></textarea>
        </div>

        <div className="small-boxes">
          <div className='borderDashed'>
            <input type="number" name="quantite" step="1" min="0" placeholder="Quantité : 12" required />
          </div>
          <div className='borderDashed'>
            <input type="number" name="prix" step="0.01" min="0" placeholder="Prix : 12.50" required />
          </div>
        </div>

        <div className="categorie-box borderDashed">
          <select name="categorie" className="categorie" required>
            <option value="1">Productivité / Élégance</option>
            <option value="2">Décoration / Ambiance</option>
            <option value="3">Confort / Style</option>
            <option value="4">Starter pack</option>
            <option value="5">Accessoire</option>
          </select>
        </div>

        <div className="bouton-box">
          <button className="btn btn-primary" type="submit">Ajouter</button>
        </div>
      </div>
    </form>
  );
}
