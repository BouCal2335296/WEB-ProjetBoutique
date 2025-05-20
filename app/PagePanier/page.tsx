"use client";
import CheckoutPage from "../Composant/CheckoutPage/CheckoutPage";
import convertToSubcurrency from "../lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import DetailsCommande from "../Composant/Panier/DetailsCommande";

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
    }

    const [articlePanier, setArticlePanier] = useState<Article[]>([]);
    const [showModal, setShowModal] = useState(false);


    // Étape 1 : Récupérer le panier de l'utilisateur
    useEffect(() => {
        fetch("https://projet-prog4e07.cegepjonquiere.ca/api/paniers/idsArticle?id=1")
            .then((res) => res.json())
            .then((ids: number[]) => {
                // Pas besoin de setPanier ici car ce n'est pas un tableau de Panier
                if (ids.length === 0) return;
                console.log(ids);
    
                const queryString = ids.map(id => `id=${id}`).join("&");
                console.log(queryString);
                fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/article/categorie/articlePanier?${queryString}`)

                    .then(res => res.json())
                    .then((articles: Article[]) => setArticlePanier(articles))
                    .catch(err => console.error("Erreur fetch articlePanier:", err));
            })
            .catch(err => console.error("Erreur fetch idsArticle:", err));
    }, []);

    let amount = 0;
    articlePanier.forEach(article => {
        amount += article.prix;
    });

    function supprimerArticle(idArticle: string) {
        fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/paniers/supprimer?idUtilisateur=1&idProduit=${idArticle}`, {
            method: "DELETE",
        })
        .then(res => {
            if (!res.ok) throw new Error("Échec de la suppression");
            // Optionnel : Recharger le panier après suppression
            setArticlePanier(prev => prev.filter(article => article.id !== idArticle));
        })
        .catch(err => console.error("Erreur lors de la suppression :", err));
    }
    
    return (
        <>
            <div className="container-fluid d-flex">
                <div className="col-8 border d-flex justify-content-center align-items-center">
                    <div className="col-9">
                        <h1>Panier</h1>

                        {articlePanier.length === 0 ? (
                            <p>Votre panier est vide.</p>
                        ) : (
                            articlePanier.map((article, index) => (
                                <div key={index} className="d-flex bg-white rounded-3 my-3">
                                    <div className="col-2">
                                        <img src={article.image} className="img-fluid rounded-3" alt={article.nom} />
                                    </div>
                                    <div className="d-flex col-10">
                                        <div className="col-11 ps-3">
                                            <div><p className="fw-bold">{article.nom}</p></div>
                                            <div><p>{article.prix} $</p></div>
                                        </div>
                                        <div className="col-1 d-flex justify-content-center align-items-center">
                                            <button className="btn m-0 text-danger" onClick={() => supprimerArticle(article.id)} >X</button>
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
                    <div className="modal-content w-50 mt-3 mb-3">
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
