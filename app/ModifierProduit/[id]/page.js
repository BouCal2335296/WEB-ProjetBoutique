"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
                return record.token;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du token :", error);
            return null;
        }
    }

    async function utiliserToken() {
        const token = await recupererToken();
        if (token) {
            return token;
        } else {
            db.collection('tokens').delete();
            router.push("../SessionExpirer");
            return null;
        }
    }

    async function modifierProduit(event) {
        event.preventDefault();
        const token = await utiliserToken();
        if (!token) return;

        fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/article/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                Id: params.id,
                Nom: formData.nom,
                Prix: parseFloat(formData.prix),
                Image: formData.image,
                Description: formData.description,
                QuantiteInventaire: parseInt(formData.quantiteInventaire),
                CategorieArticleId: parseInt(formData.categorieArticleId)
            })
        })
            .then(res => {
                if (!res.ok) {
                    db.collection('tokens').delete();
                    router.push("../SessionExpirer");
                } else {
                    router.push("../PageArticle/Tout");
                }
            });
    }

    async function supprimerProduit() {
        const confirmDelete = confirm("Voulez-vous vraiment supprimer ce produit ?");
        if (!confirmDelete) return;

        const token = await utiliserToken();
        if (!token) return;

        fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/article/${params.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    db.collection('tokens').delete();
                    router.push("../SessionExpirer");
                } else {
                    router.push("../PageArticle/Tout");
                }
            });
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
                        <input type="number" name="quantite" step="1" min="0" placeholder="Quantité : 12" value={formData.quantiteInventaire}
                            onChange={(e) => setFormData({ ...formData, quantiteInventaire: e.target.value })} required />
                    </div>
                    <div className='borderDashed'>
                        <input type="number" name="prix" step="0.01" min="0" placeholder="Prix : 12.50" value={formData.prix}
                            onChange={(e) => setFormData({ ...formData, prix: e.target.value })} required />
                    </div>
                </div>

                <div className="categorie-box borderDashed">
                    <select name="categorie" className="categorie" value={formData.categorieArticleId}
                        onChange={(e) => setFormData({ ...formData, categorieArticleId: e.target.value })} required>
                        <option value="1">Productivité / Élégance</option>
                        <option value="2">Décoration / Ambiance</option>
                        <option value="3">Confort / Style</option>
                        <option value="4">Starter pack</option>
                        <option value="5">Accessoire</option>
                    </select>
                </div>

                <div className="bouton-box">
                    <button className="btn btn-danger me-3" type="button" onClick={supprimerProduit}>Supprimer</button>
                    <button className="btn btn-primary" type="submit">Modifier</button>
                </div>
            </div>
        </form>
    );
}
