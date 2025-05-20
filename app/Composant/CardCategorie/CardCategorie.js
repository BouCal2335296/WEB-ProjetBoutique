'use client';
import { useState, useEffect } from "react";

export default function CardCategorie(props) {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("https://projet-prog4e07.cegepjonquiere.ca/api/article")
            .then((res) => res.json())
            .then((data) => setArticles(data));
    }, []);

    useEffect(() => {
        fetch("https://projet-prog4e07.cegepjonquiere.ca/api/categorieArticle")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

    return (
        <>
            {categories.map((categorie) => {
                const articlesCategorie = articles
                    .filter(article => article.categorieArticleId === categorie.id)
                    .slice(0, 6);

                return (
                    <div key={categorie.id} className="cardCategorieContainer">
                        <div className="card border border-2 border-black">
                            <h5 className="cardCategorieTitle">{categorie.nom}</h5>
                            <div className="imgContainer">
                                {articlesCategorie.map(article => (
                                    <img key={article.id} alt={article.nom} className="img-Card" src={article.image}></img>
                                ))}
                            </div>
                            <h6 className="cardCategorieSubTitle">view more</h6>
                        </div>
                    </div>
                );
            })
            }
        </>
    )
}

/*<div className="card border border-2 border-black">
                <h5 className="cardTitle">{titreCategorie}</h5>
                <div className="imgContainer">
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                </div>
                <h6 className="cardSubTitle">view more</h6>
            </div>
            <div className="card border border-2 border-black">
                <h5 className="cardTitle">{titreCategorie}</h5>
                <div className="imgContainer">
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                </div>
                <h6 className="cardSubTitle">view more</h6>
            </div>
        </div>*/