"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import db from "../../../lib/localbase";
import { notifyPanierChange } from '../../../lib/panierEvent';

export default function DetailArticle() {
    const params = useParams();
    const [article, setArticle] = useState(null);
    const [idUtilisateur, setIdUtilisateur] = useState(0);
    const [userToken, setUserToken] = useState("");

    useEffect(() => {
        async function fetchUserId() {
            const tokenDoc = await db.collection('tokens').doc('jwt').get();
            if (tokenDoc && tokenDoc.userId) {
                setIdUtilisateur(tokenDoc.userId);
                setUserToken(tokenDoc.token);
            }
        }
        fetchUserId();
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

    function afficherAlerte(message, success) {
        const alerteDiv = document.getElementById("alerteErreur");
        const texteErreur = document.getElementById("texteErreur");
    
        texteErreur.textContent = message;
        alerteDiv.classList.remove("d-none"); // Affiche l'alerte
        if (success) {
            alerteDiv.classList.add("alert-success");
        } else {
            alerteDiv.classList.add("alert-danger");
        }
    }

    function masquerAlerte(message) {
        const alerteDiv = document.getElementById("alerteErreur");
        alerteDiv.classList.add("d-none"); // Supprime l'alerte
    }
    
    async function ajouterPanier(event) {
        event.preventDefault();
        
        try {
            const response = await fetch("https://projet-prog4e07.cegepjonquiere.ca/api/paniers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    idUtilisateur: idUtilisateur,
                    idArticle: article.id.toString(),
                    quantiteArticle: 1,
                }),
            });
    
            if (!response.ok) {
                afficherAlerte("Erreur : vous devez être connecté et avoir sélectionné un article.");
                throw new Error("Utilisateur ou article non défini");
            }else{
                afficherAlerte("Article ajouté au panier.", true);
            }
    
            const data = await response.json();
            notifyPanierChange();
        } catch (error) {
            console.error("Erreur fetch:", error);
            afficherAlerte("Impossible d’ajouter l’article au panier. Veuillez réessayer.");
        }
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

                        <div id="alerteErreur" className="alert alert-dismissible fade show d-none mt-3" role="alert">
                            <span id="texteErreur"></span>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Fermer" onClick={masquerAlerte}></button>
                        </div>
                    </div>
                </div>


            </div>
        </div>



    );
}
