"use client";

import Carousel from '../../Composant/Carousel/Carousel';
import { useState, useEffect } from "react";

export default function PageArticle() {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [articlesParPage, setArticlesParPage] = useState(5);

    useEffect(() => {
        // Récupérer articles
        fetch("https://projet-prog4e07.cegepjonquiere.ca/api/article")
            .then((res) => res.json())
            .then((data) => setArticles(data));

        // Récupérer catégories
        fetch("https://projet-prog4e07.cegepjonquiere.ca/api/article/categorieArticle")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

    // Adaptation responsive
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setArticlesParPage(width >= 768 ? 4 : 2);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 🔎 Associer les articles à leur nom de catégorie
    const filtrerParCategorieNom = (nomCategorie) => {
        // Trouver l'ID de la catégorie à partir de son nom
        const categorieTrouvee = categories.find(c => c.nom === nomCategorie);
        if (!categorieTrouvee) return [];
        return articles.filter(a => a.categorieArticleId === categorieTrouvee.id);
    };

    return (
        <div>
            <div className='ms-2 mt-3'>
                <h3 className='titreCarousel'>Productivité / Élégance</h3>
            </div>
            <div className='mb-3'>
                <Carousel articles={filtrerParCategorieNom("Productivité / Élégance")} />
            </div>

            <div className='ms-2 pt-3'>
                <h3 className='titreCarousel'>Décoration / Ambiance</h3>
            </div>
            <div className='mb-3'>
                <Carousel articles={filtrerParCategorieNom("Décoration / Ambiance")} />
            </div>

            <div className='ms-2 pt-3'>
                <h3 className='titreCarousel'>Comfort / Style</h3>
            </div>
            <div className='mb-3'>
                <Carousel articles={filtrerParCategorieNom("Comfort / Style")} />
            </div>

            <div className='ms-2 pt-3'>
                <h3 className='titreCarousel'>Accessoire</h3>
            </div>
            <div className='mb-3'>
                <Carousel articles={filtrerParCategorieNom("Accessoire")} />
            </div>

            <div className='ms-2 pt-3'>
                <h3 className='titreCarousel'>Pack de démarrage</h3>
            </div>
            <div className='mb-3'>
                <Carousel articles={filtrerParCategorieNom("Pack de démarrage")} />
            </div>
        </div>
    );
}
