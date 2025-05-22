"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import db from "../../../lib/localbase";
import { notifyPanierChange } from '../../../lib/panierEvent';

export default function DetailArticle() {
    const params = useParams();
    const [article, setArticle] = useState(null);

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

    return (
        <div className="d-flex row min-vh-100">
            <div className="col-6">
                <div className="d-flex justify-content-center pt-5">
                    <img src={article.image} style={{ width: "80%" }} className="img-fluid" alt={article.nom} />
                </div>
            </div>
            <div className="col-6">
                <div style={{ paddingTop: "20%" }}>
                    <div className="" style={{ width: "80%" }}>
                        <div>
                            <h1>{article.nom}</h1>
                        </div>
                        <div>
                            <p>{article.description}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Qty : {article.quantiteInventaire}</p>
                            <p>{article.prix}$</p>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary mt-3" onClick={ajouterPanier}>Ajouter</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
