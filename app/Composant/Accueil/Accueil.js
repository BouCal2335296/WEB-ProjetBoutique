'use client';
import { useState, useEffect } from "react";

export default function Accueil() {

    return (
        <>
            <div className="panneauAccueil">
                <section className="texteAccueil">
                    <h1>Bienvenue sur StudioNex</h1>
                    <h5>Bienvenue chez StudioNex, que vous soyez un professionnel en télétravail à la recherche d’un espace de travail optimisé, ou un passionné de gaming désirant un setup performant et stylé, notre sélection répond à toutes vos attentes.</h5>
                    <br></br>
                    <h5>Explorez notre catalogue et imaginez un espace qui vous ressemble. Chez StudioNex, nous ne vendons pas simplement du matériel, nous façonnons votre environnement idéal, entre productivité et immersion.</h5>
                </section>
                <section className="logoAccueil">
                    <img src="https://projet-prog4e07.cegepjonquiere.ca/logoBoutique.png" className="rounded-4" alt="Gaming Store"></img>
                </section>
            </div>
        </>
    )
}