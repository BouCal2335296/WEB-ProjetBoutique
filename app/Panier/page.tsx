"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../Composant/PaymentForm/PaymentForm";
import { useEffect, useState } from "react";

export default function Panier() {
    interface Article {
        id: string;
        nom: string;
        image: string;
        prix: number;
    }

    interface Panier {
        id: number;
        idUtilisateur: string;
        idArticle: string;
        quantiteArticle: number;
    }

    const [articlePanier, setArticlePanier] = useState<Article[]>([]);
    const [panier, setPanier] = useState<Panier[]>([]);

    const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );

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
    console.log(articlePanier);

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
                                <div key={index} className="d-flex color1 my-3">
                                    <div className="col-2">
                                        <img src={article.image} className="img-fluid" alt={article.nom} />
                                    </div>
                                    <div className="d-flex col-10">
                                        <div className="col-11 ps-3">
                                            <div><p className="fw-bold">{article.nom}</p></div>
                                            <div><p>{article.prix} $</p></div>
                                        </div>
                                        <div className="col-1 d-flex justify-content-center align-items-center">
                                            <p className="m-0 text-danger" style={{ cursor: "pointer" }}>X</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="col-4 border d-flex flex-column justify-content-center align-items-center">
                    <h1>Commande</h1>
                    <div className="d-flex flex-column color1" style={{ maxWidth: "25rem", minWidth: "25rem", maxHeight: "15rem", minHeight: "15rem" }}>
                        <p>Total commande</p>
                        <p>({articlePanier.length} article) : {articlePanier.reduce((total, article) => total + article.prix, 0)} $</p>
                        <div>
                            <button>Passer la commande</button>
                        </div>
                    </div>
                </div>
            </div>

            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
        </>
    );
}
