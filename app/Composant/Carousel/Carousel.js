"use client";

import { useEffect, useState } from "react";
import CardProduit from "../CardProduit/CardProduit";

export default function Carousel({ articles }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [articlesParPage, setArticlesParPage] = useState(4); // 4 par défaut

    // Gestion responsive
    useEffect(() => {
        const handleResize = () => {
            setArticlesParPage(window.innerWidth >= 768 ? 4 : 2);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const pageCount = Math.ceil((articles?.length || 0) / articlesParPage);

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
                {currentArticles.map((article) => (
                    <CardProduit
                        key={article.id}
                        id={article.id}
                        image={article.image || "default.jpg"}
                        nom={article.nom || "No Title"}
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
