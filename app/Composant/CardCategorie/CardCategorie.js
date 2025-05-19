'use client';
import { useState, useEffect } from "react";

export default function CardCategorie(props) {

    return (
        <>
            <div className="panneauAccueil">
                <section className="texteAccueil">
                    <h1>Gaming Store</h1>
                    <h6>Bienvenue au gaming store, que vous soyez un joueur passionné à la recherche d'équipement spécifique ou simplement à la recherche d'accessoires pour améliorer votre confort pendant vos sessions de jeu, notre sélection soigneusement choisie répond à toutes vos attentes.</h6>
                    <br></br>
                    <h6>Explorez notre catalogue et transformez votre expérience de jeu. Au gaming store, nous ne vendons pas simplement des produits – nous créons des expériences.</h6>
                </section>
                <section className="logoAccueil">
                    <img src="logo3-.png" alt="Gaming Store"></img>
                </section>
            </div>
        </>
    )
}