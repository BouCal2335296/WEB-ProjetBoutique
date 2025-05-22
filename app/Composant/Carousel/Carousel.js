"use client";

import { useState, useEffect } from "react";
import CardProduit from "../CardProduit/CardProduit";

export default function Carousel() {
    const [articles, setArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [articlesParPage, setArticlesParPage] = useState(5);

    // Fetch des articles
    useEffect(() => {
        fetch("https://projet-prog4e07.cegepjonquiere.ca/api/article")
            .then((res) => res.json())
            .then((data) => setArticles(data));
    }, []);

    // Gestion responsive du nombre d'articles par page
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 768) {
                setArticlesParPage(5); // écran md et +
            } else {
                setArticlesParPage(2); // petit écran
            }
        };

        handleResize(); // appel initial
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    const pageCount = Math.ceil(articles.length / articlesParPage);

    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % pageCount);
    };

    const prev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + pageCount) % pageCount);
    };

    const currentArticles = articles.slice(
        currentIndex * articlesParPage,
        currentIndex * articlesParPage + articlesParPage
    );
    return (
        <div className="row d-flex align-items-center">
            <div className="col-1 text-center">
                <button onClick={prev} className="bg-black/50 text-black px-2 py-1 rounded">‹</button>
            </div>

            <div className="CarouselCard col-10 d-flex flex-wrap justify-content-center">
                {currentArticles.map((article, index) => (
                    <CardProduit
                        key={article.id || index}
                        id={article.id}
                        image={article.image || "default.jpg"}
                        nom={article.nom || "No Title"}
                        description={article.description || "No description"}
                        prix={article.prix}
                    />
                ))}
            </div>

            <div className="col-1 text-center">
                <button onClick={next} className="bg-black/50 text-black px-2 py-1 rounded">›</button>
            </div>
        </div>
    );
}
