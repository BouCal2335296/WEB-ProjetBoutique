"use client";
import { useState, useEffect } from "react"
import CardProduit from "../../Composant/CardProduit/CardProduit";

export default function PageArticle() {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch("https://projet-prog4e07.cegepjonquiere.ca/api/article/categorie/3")
            .then((res) => res.json())
            .then((data) => setArticles(data));
    }, []);

    return <>
        <div className="position-relative w-100 divImageFond">
            {/* Image de fond (gauche) */}
            <img src="https://projet-prog4e07.cegepjonquiere.ca/imageComfortStyle1.jpg" className="position-absolute top-0 start-0 w-100 h-100 imgGauche" alt="Gauche"/>

            {/* Image droite avec découpe diagonale */}
            <div className="position-absolute top-0 end-0 h-100 divImageSup">
                <img src="https://projet-prog4e07.cegepjonquiere.ca/imageComfortStyle2.jpg" className="w-100 h-100 imgDroite" alt="Droite"
                />
            </div>
        </div>

        <div className="d-flex flex-wrap justify-content-center">
            {articles.map((article, index) => (
                <CardProduit
                    key={article.id || index}
                    id={article.id}
                    image={article.image || "default.jpg"}
                    nom={article.nom || "No Title"}
                    description={article.description || "No description"}
                    link={article.link || "#"}
                    prix={article.prix}
                />
            ))}
        </div>
    </>
}
