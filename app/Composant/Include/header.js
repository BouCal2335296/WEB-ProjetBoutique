"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import LanguageSelector from "../Language/languageSelector";
import MenuAdmin from "../MenuAdmin/menuAdmin";
import Connexion from "../Connexion/Connexion";
import Inscription from "../Inscription/Inscription";
import db from '../../lib/localbase';

import { listenPanierChange, removePanierListener } from '../../lib/panierEvent';

export default function Header() {

    const [showOffcanvasConnexion, setShowOffcanvasConnexion] = useState(false);
    const [showOffcanvasInscription, setShowOffcanvasInscription] = useState(false);
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);
    const [nombrePanier, setNombrePanier] = useState(0);

    // Mecanisme ouverture/fermeture de l'offcanvas connexion
    const toggleOffcanvasConnexion = () => setShowOffcanvasConnexion(!showOffcanvasConnexion);
    const closeOffcanvasConnexion = () => setShowOffcanvasConnexion(false);

    // Mecanisme ouverture/fermeture de l'offcanvas inscription
    const toggleOffcanvasInscription = () => setShowOffcanvasInscription(!showOffcanvasConnexion);
    const closeOffcanvasInscription = () => setShowOffcanvasInscription(false);

    const [idUtilisateur, setIdUtilisateur] = useState(0);

    useEffect(() => {
        //Assigne l'ID de l'utilisateur connecté au JWT
        async function fetchUserId() {
            const tokenDoc = await db.collection('tokens').doc('jwt').get();
            if (tokenDoc && tokenDoc.userId) {
                setIdUtilisateur(tokenDoc.userId);
                setRole(tokenDoc.role);
                setUsername(tokenDoc.username);
            }
        }
        fetchUserId();
    }, []);

    // useEffect(() => {
    //     async function fetchToken() {
    //         try {
    //             const records = await db.collection('tokens').get();
    //             const tokenDoc = records.find(doc => doc.id === 'jwt');
    //             if (tokenDoc) {
    //                 setUsername(tokenDoc.username);
    //                 setRole(tokenDoc.role);
    //             } else {
    //                 setUsername(null);
    //                 setRole(null);
    //             }
    //         } catch (error) {
    //             console.error("Erreur lors de la récupération du token", error);
    //             setUsername(null);
    //             setRole(null);
    //         }
    //     }
    //     fetchToken();
    // }, []); //BUG CONSOLE

    //Supprime le jwt lors de la déconnexion
    function deconnexion() {
        db.collection('tokens').delete().then(() => {
            window.location.reload();
        });
    }


    //Affiche la quantité de produit dans le panier
    useEffect(() => {
        const fetchPanier = () => {
            fetch(`https://projet-prog4e07.cegepjonquiere.ca/api/paniers/idsArticle?id=${idUtilisateur}`)
                .then(res => res.json())
                .then(data => setNombrePanier(data.length));
        };

        fetchPanier(); // initial load

        // écoute les changements
        const handler = () => fetchPanier();
        listenPanierChange(handler);

        return () => {
            removePanierListener(handler);
        };
    }, [idUtilisateur]);

    
    return (
        <header>
            <nav className="navbar color3">
                <div className="container-fluid p-0">
                    <Link href={"/"} className='col-2 col-md-1'>
                        {/* Logo (desktop) */}
                        <img src="https://projet-prog4e07.cegepjonquiere.ca/logoBoutique.png" className="img-fluid rounded-3 d-none d-md-block imgHeaderDesktop"></img>
                        {/* Logo (mobile) */}
                        <img src="https://projet-prog4e07.cegepjonquiere.ca/logoBoutique.png" className="img-fluid rounded-3 d-block d-md-none imgHeaderMobile"></img>
                    </Link>

                    {/* searchBar */}
                    <div className="col-md-5 d-none d-md-block">
                        <form className="d-flex justify-content-center">
                            <input className="form-control w-75 me-2 color1" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success pl-3" type="submit"><img src="/loupe-svgrepo-com.svg" className="img-fluid svgLoupe"></img></button>
                        </form>
                    </div>

                    {/* langue */}
                    <div className="col-3 col-md-1 p-0 d-flex justify-content-end justify-content-md-start">
                        <LanguageSelector />
                    </div>

                    {/* menu admin */}
                    {role === "Administrateur" ? (
                        <div className="col-3 p-0 d-flex justify-content-center      col-md-1">
                            <MenuAdmin />
                        </div>) :
                                role === "Utilisateur" ? (
                        <div className="col-3 p-0      col-md-1 d-md-flex justify-content-md-center">
                            <p className='text-white m-0 p-2'>Bienvenu, {username}</p>
                        </div>
                    ) : null}


                    {/* Register */}
                    {role ? null : 
                        <div className="col-3 p-0 d-flex justify-content-end       col-md-1">
                            <button className="btn btn-primary p-1 ms-md-0" type="button" onClick={toggleOffcanvasInscription}>
                                S'inscrire
                            </button>
                        </div>
                    }

                    {/* sign in */}
                    <div className="col-3 p-0        col-md-1 d-flex justify-content-center">
                        {role === "Utilisateur" || role === "Administrateur" ? (
                            <button className="btn btn-primary p-1 me-4 me-md-0 ms-md-5" type="button" onClick={deconnexion}>
                                Deconnexion
                            </button>) : (
                            <button className="btn btn-primary p-1 ms-md-0" type="button" onClick={toggleOffcanvasConnexion}>
                                Connexion
                            </button>
                        )}
                    </div>

                    {/* Offcanvas Connexion */}
                    <div className={`offcanvas offcanvas-end ${showOffcanvasConnexion ? 'show' : ''} color1/50`} tabIndex="-1" style={{ visibility: showOffcanvasConnexion ? 'visible' : 'hidden' }} aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasRightLabel">Connexion</h5>
                            <button type="button" className="btn-close " onClick={closeOffcanvasConnexion}></button>
                        </div>
                        <div className="offcanvas-body">
                            {/* contenu du composant connexion */}
                            <Connexion onClose={closeOffcanvasConnexion} />
                        </div>
                    </div>

                    {/* Offcanvas Inscription */}
                    <div className={`offcanvas offcanvas-end ${showOffcanvasInscription ? 'show' : ''} color1/50`} tabIndex="-1" style={{ visibility: showOffcanvasInscription ? 'visible' : 'hidden' }} aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasRightLabel">Inscription</h5>
                            <button type="button" className="btn-close " onClick={closeOffcanvasInscription}></button>
                        </div>
                        <div className="offcanvas-body">
                            {/* contenu du composant Inscription */}
                            <Inscription onClose={closeOffcanvasInscription} />
                        </div>
                    </div>
                    
                    {/* panier */}
                    <div className="col-1          col-md-1 p-0">
                        <Link href="/PagePanier/" className="btn d-flex flex-column justify-content-center align-items-center">
                            <span className='text-white'>{nombrePanier}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart2 colorWhite" viewBox="0 0 16 16">
                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="container-fluid pt-2 pb-2  color5">
                    <div className="scrolling-wrapper text-nowrap overflow-x-auto px-2 d-flex align-items-center">
                        <div className="d-inline-block text-white me-5 me-md-3">
                            <Link className="d-flex align-items-center text-white hover-underline" href={"/PageArticle/Tout/"}>
                                <img src="/1hamburger-menu-mobile-svgrepo-com.svg" className="img-fluid svgBurger me-1" />
                                Tout
                            </Link>
                        </div>
                        <div className="d-inline-block text-white me-3">
                            <Link className="text-white hover-underline" href={"/PageArticle/Filtre1/"}>Productivité / Élégance</Link>
                        </div>
                        <div className="d-inline-block text-white me-3">
                            <Link className="text-white hover-underline" href={"/PageArticle/Filtre2/"}>Décoration / Ambiance</Link>
                        </div>
                        <div className="d-inline-block text-white me-3">
                            <Link className="text-white hover-underline" href={"/PageArticle/Filtre3/"}>Confort / Style</Link>
                        </div>
                        <div className="d-inline-block text-white me-3">
                            <Link className="text-white hover-underline" href={"/PageArticle/Filtre4/"}>Pack de démarrage</Link>
                        </div>
                        <div className="d-inline-block text-white me-3">
                            <Link className="text-white hover-underline" href={"/PageArticle/Filtre5/"}>Accessoire</Link>
                        </div>
                    </div>
                </div>


            </nav>
        </header>
    );
}