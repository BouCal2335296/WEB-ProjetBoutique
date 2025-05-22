"use client";
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


    // Étape 1 : Récupérer le panier de l'utilisateur
    useEffect(() => {
        fetch("https://projet-prog4e07.cegepjonquiere.ca/api/paniers/idsArticle?id=1")
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
    }, []);
    
    

    let amount = 0;
    articlePanier.forEach(article => {
        amount += article.prix;
    });

    function supprimerArticle(idPanier: number) {
        fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/paniers/supprimer?idUtilisateur=1&id=${idPanier}`, {
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

                        {articlePanier.length === 0 ? (
                            <p>Votre panier est vide.</p>
                        ) : (
                            articlePanier.map((article, index) => (
                                <div key={index} className="d-flex bg-white rounded-3 my-3">
                                    <div className="col-6 col-md-2">
                                        <img src={article.image} className="img-fluid rounded-3" alt={article.nom} />
                                    </div>
                                    <div className="col-6 col-md-10 d-flex">
                                        <div className="col-11 ps-3">
                                            <div><p className="fw-bold">{article.nom}</p></div>
                                            <div><p>{article.prix} $</p></div>
                                            <div><p>Quantité : {article.quantiteArticle}</p></div>
                                        </div>
                                        <div className="col-1 d-flex justify-content-center align-items-center">
                                            <button className="btn m-0 text-danger" onClick={() => supprimerArticle(article.idPanier)} >X</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Affiche le module de paiement */}
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
