import { useState, useEffect } from "react";

export default function Connexion() {

    function login(param) {

        const identifiant = param.get('identifiant');
        const motDePasse = param.get('motDePasse');

        // fetch('http://localhost:3000/utilisateurs')
        //     .then(response => response.json())
        //     .then();
    }


    return (
        <div>
            <form action={login}>
                <div className="d-flex justify-content-between mt-3">
                    <div className="d-flex flex-column">
                        <label>Identifiant :</label>
                        <label className="mt-3">Mot de passe :</label>
                    </div>
                    <div className="d-flex flex-column">
                        <input type="text" id="identifiant" name="identifiant"></input>
                        <input type="password" id="motDePasse" name="motDePasse" className="mt-3"></input>
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-3">
                    <button type="submit">Connexion</button>
                </div>
            </form>
        </div>
    );
}