"use client";
import { useEffect, useState } from "react";

export default function Panier() {

    const [articlePanier, setArticlePanier] = useState([]);

    fetch("https://projet-prog4e07.cegepjonquiere.ca/api/panier") //Panier n'est pas fait dans l'API
        .then((res) => res.json())
        .then((data) => setArticlePanier(data));


    return (
        <div className="container-fluid d-flex">
            <div className="col-8 border d-flex justify-content-center align-items-center">
                <div className="col-9">

                    <div className="d-flex">
                        <div className="col-2">
                            <img src="/panier.png" className="img-fluid" alt="Panier" />
                        </div>
                        <div className="col-10">
                            <h1>{articlePanier.length} article(s)</h1>
                        </div>

                    </div>



                    <h1>Panier</h1>
                </div>
            </div>

            <div className="col-4 border">
                <h1>Commande</h1>
            </div>
        </div>
    );
}
