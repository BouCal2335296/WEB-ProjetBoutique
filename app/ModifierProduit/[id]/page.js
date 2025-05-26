"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import db from "../../lib/localbase";

export default function ModifierProduit() {
    const router = useRouter();
    const params = useParams();
    const [article, setArticle] = useState(null);
    const [formData, setFormData] = useState({
        nom: "",
        image: "",
        description: "",
        quantiteInventaire: 0,
        prix: 0,
        categorieArticleId: ""
    });

    useEffect(() => {
        if (params.id) {
            fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/article/${params.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setArticle(data);
                    setFormData({
                        nom: data.nom || "",
                        image: data.image || "",
                        description: data.description || "",
                        quantiteInventaire: data.quantiteInventaire || 0,
                        prix: data.prix || 0,
                        categorieArticleId: data.categorieArticleId || ""
                    });
                })
                .catch((error) => console.error("Erreur fetch:", error));
        }
    }, [params]);

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

    async function modifierProduit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const Image = formData.get('lienImage');
        const Nom = formData.get('nom');
        const Description = formData.get('description');
        const QuantiteInventaire = parseInt(formData.get('quantite'));
        const Prix = parseFloat(formData.get('prix'));
        const CategorieArticleId = parseInt(formData.get('categorie'));
        const token = await utiliserToken();

        fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/article/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                Id : params.id,
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
                else {
                    router.push("../PageArticle/Tout");
                    event.target.reset();
                }
            })
    }

    if (!article) return <p>Chargement...</p>;

    return (
        <form className="DetailsProduit" onSubmit={modifierProduit}>
            <div className="image-panel borderDashed">
                <input type="text" name="lienImage" placeholder="Lien Image..." value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })} required />
            </div>

            <div className="texte-panel">
                <div className="titre-box borderDashed">
                    <input type="text" name="nom" placeholder="Nom du produit..." value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })} required />
                </div>

                <div className="description-box borderDashed">
                    <textarea name="description" placeholder="Description du produit..." value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })} required></textarea>
                </div>

                <div className="small-boxes">
                    <div className='borderDashed'>
                        <input type="number" name="quantite" step="1" min="0" placeholder="Quantité : 12"  value={formData.quantiteInventaire}
                        onChange={(e) => setFormData({ ...formData, quantiteInventaire: e.target.value })} required />
                    </div>
                    <div className='borderDashed'>
                        <input type="number" name="prix" step="0.01" min="0" placeholder="Prix : 12.50" value={formData.prix}
                        onChange={(e) => setFormData({ ...formData, quantiteInventaire: e.target.prix })} required />
                    </div>
                </div>

                <div className="categorie-box borderDashed">
                    <select name="categorie" className="categorie" value={formData.categorieArticleId}
                        onChange={(e) => setFormData({ ...formData, categorieArticleId: e.target.prix })} required>
                        <option value="1">Productivité / Élégance</option>
                        <option value="2">Décoration / Ambiance</option>
                        <option value="3">Confort / Style</option>
                        <option value="4">Starter pack</option>
                        <option value="5">Accessoire</option>
                    </select>
                </div>

                <div className="bouton-box">
                    <button className="btn btn-primary" type="submit">Valider</button>
                </div>
            </div>
        </form>
    );
}