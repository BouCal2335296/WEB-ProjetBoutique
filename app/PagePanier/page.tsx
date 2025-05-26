"use client";

import db from "../lib/localbase";

import CheckoutPage from "../Composant/CheckoutPage/CheckoutPage";
import convertToSubcurrency from "../lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import DetailsCommande from "../Composant/Panier/DetailsCommande";
import { notifyPanierChange } from '../lib/panierEvent';


if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Panier() {

    interface Article {
        id: string;
        nom: string;
        image: string;
        prix: number;
        quantiteArticle: number;
        idPanier: number;
    }

    const [articlePanier, setArticlePanier] = useState<Article[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [idUtilisateur, setIdUtilisateur] = useState(0);

    useEffect(() => {

        async function fetchUserId() {
            const tokenDoc = await db.collection('tokens').doc('jwt').get();
            if (tokenDoc && tokenDoc.userId) {
                setIdUtilisateur(tokenDoc.userId);
            }
        }
    
        fetchUserId();
    }, []);

    // Étape 1 : Récupérer le panier de l'utilisateur
    useEffect(() => {
        if (idUtilisateur === 0) return;
        fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/paniers/idsArticle?id=${idUtilisateur}`)
            .then((res) => res.json())
            .then((panier: { id: number; idArticle: number; quantiteArticle: number }[]) => {
                if (panier.length === 0) return;
    
                const queryString = panier.map(item => `id=${item.idArticle}`).join("&");
    
                fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/article/categorie/articlePanier?${queryString}`)
                    .then(res => res.json())
                    .then((articles: Article[]) => {
                        // Créer un tableau avec chaque ligne du panier enrichie de son article
                        const articlesAvecQuantite: Article[] = panier.map(p => {
                            const article = articles.find(a => Number(a.id) === p.idArticle);
                            return {
                                ...article!,
                                quantiteArticle: p.quantiteArticle,
                                idPanier: p.id
                            };
                        });
    
                        setArticlePanier(articlesAvecQuantite);
                    })
                    .catch(err => console.error("Erreur fetch articlePanier:", err));
            })
            .catch(err => console.error("Erreur fetch idsArticle:", err));
    }, [idUtilisateur]);
    
    

    let amount = 0;
    articlePanier.forEach(article => {
        amount += article.prix;
    });

    function supprimerArticle(idPanier: number) {
        fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/paniers/supprimer?idUtilisateur=${idUtilisateur}&id=${idPanier}`, {
            method: "DELETE",
        })
        .then(res => {
            if (!res.ok) throw new Error("Échec de la suppression");
            // Optionnel : Recharger le panier après suppression
            setArticlePanier(prev => prev.filter(article => article.idPanier !== idPanier));
            notifyPanierChange();
        })
        .catch(err => console.error("Erreur lors de la suppression :", err));
    }
      
    return (
        <>
            <div className="container-fluid d-flex">
                <div className="col-7 col-md-8 border d-flex justify-content-center align-items-center">
                    <div className="col-11 col-md-9">
                        <h1>Panier</h1>

                        {articlePanier.map((article, index) => (
                            <div key={index} className="d-flex bg-white rounded-4 shadow-sm p-2 my-3 align-items-center">
                                
                                <div className="col-4 col-md-2">
                                    <img src={article.image} alt={article.nom} className="img-fluid rounded-3" style={{ objectFit: "cover", width: "100%", height: "100px" }} />
                                </div>

                                <div className="col-7 col-md-9 ps-3">
                                    <h6 className="fw-bold mb-1 text-truncate">{article.nom}</h6>
                                    <p className="mb-1 text-muted">{article.prix} $</p>
                                    <p className="mb-0">Quantité : <strong>{article.quantiteArticle}</strong></p>
                                </div>

                                <div className="col-1 text-end">
                                    <button className="btn btn-sm btn-outline-danger" title="Retirer" onClick={() => supprimerArticle(article.idPanier)} >
                                        <i className="bi bi-x-lg">X</i>
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                <DetailsCommande articlePanier={articlePanier} onClickCommande={() => setShowModal(true)} />
            </div>

            {showModal && (
                <>
                    <div className="modal-overlay"></div>
                    <div className="modal-content w-75 w-md-50">
                        <div className="d-flex justify-content-end">
                            <button className="btn text-danger" onClick={() => setShowModal(false)}>X</button>
                        </div>
                        <h2>Confirmation de commande</h2>
                        <Elements 
                            stripe={stripePromise}
                            options={{
                                mode: "payment",
                                amount: convertToSubcurrency(10),
                                currency: "cad",
                            }}>
                            <CheckoutPage amount={amount} />
                        </Elements>
                    </div>
                </>
            )}
        </>
    );
}
