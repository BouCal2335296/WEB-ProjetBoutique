"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import db from "../../../lib/localbase";
import { notifyPanierChange } from '../../../lib/panierEvent';

export default function DetailArticle() {
    const params = useParams();
    const [article, setArticle] = useState(null);const [role, setRole] = useState(null);

    useEffect(() => {
        async function fetchToken() {
            try {
                const records = await db.collection('tokens').get();
                const tokenDoc = records.find(doc => doc.id === 'jwt');
                if (tokenDoc) {
                    setRole(tokenDoc.role);
                } else {
                    setRole(null);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du token", error);
                setRole(null);
            }
        }

        fetchToken();
    }, []);

    useEffect(() => {
        if (params?.id) {
            fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/article/${params.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setArticle(data);
                })
                .catch((error) => console.error("Erreur fetch:", error));
        }
    }, [params]);

    async function ajouterPanier(event) {
        event.preventDefault();

        fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/paniers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idUtilisateur: "1",
                idArticle: article.id.toString(),
                quantiteArticle: 1,
            }),
        })
            .then((res) => res.json())
            .then((data) => {    
                notifyPanierChange();
            })
            .catch((error) => console.error("Erreur fetch:", error));
    }

    if (!article) return <p>Chargement...</p>;

    function AjoutPanier() {
        fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/article/${params.id}`, { //MOFI API PANIER
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Erreur fetch:", error));
    }
    return (
        <>

            <div className="DetailsProduit">
                <div className="image-panel">
                    <img src={article.image} className="img-fluid" alt={article.nom} />
                </div>

                <div className="texte-panel">
                    <div className="titre-box">
                        <h1>{article.nom}</h1>
                    </div>
                    <div className="description-box borderDashed">
                        <p>{article.description}</p>
                    </div>

                    <div className="small-boxes">
                        <div>
                            <p>Quantité : {article.quantiteInventaire}</p>
                        </div>
                        <div>
                            <p>Prix : {article.prix}$</p>
                        </div>
                        {article.quantiteInventaire === 0 && (
                            <div className="alerte-indisponible">
                                <p>Indisponible</p>
                            </div>
                        )}

                    </div>

                    <div className="col-1 adminButton">
                        {role === "Administrateur" ? (
                            <Link href={`../../ModifierProduit/${params.id}`}>
                                <div className="bouton-box">
                                    <button className="btn btn-primary mt-3">Modifier</button>
                                </div>
                            </Link>) :
                            null}
                    </div>
                    <div className="bouton-box">
                        <button className="btn btn-primary mt-3" onClick={ajouterPanier}>Ajouter</button>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                </div>
            </div>
        </>



    );
}
