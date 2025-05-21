"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import LanguageSelector from "../Language/languageSelector";
import Connexion from "../Connexion/Connexion";
import Inscription from "../Inscription/Inscription";
import db from '../../lib/localbase';
import AddProduit from "../AddProduit/AddProduit";

export default function Header() {

    const [showOffcanvasConnexion, setShowOffcanvasConnexion] = useState(false);
    const [showOffcanvasInscription, setShowOffcanvasInscription] = useState(false);
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);

    const toggleOffcanvasConnexion = () => setShowOffcanvasConnexion(!showOffcanvasConnexion);
    const closeOffcanvasConnexion = () => setShowOffcanvasConnexion(false);


    const toggleOffcanvasInscription = () => setShowOffcanvasInscription(!showOffcanvasConnexion);
    const closeOffcanvasInscription = () => setShowOffcanvasInscription(false);
    useEffect(() => {
        async function fetchToken() {
            try {
                const records = await db.collection('tokens').get();
                const tokenDoc = records.find(doc => doc.id === 'jwt');
                if (tokenDoc) {
                    setUsername(tokenDoc.username);
                    setRole(tokenDoc.role);
                } else {
                    setUsername(null);
                    setRole(null);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du token", error);
                setUsername(null);
                setRole(null);
            }
        }

        fetchToken();
    }, []);


    function deconnexion() {
        db.collection('tokens').delete().then(() => {
            window.location.reload();
        });
    }

    return (
        <header>
            <nav className="navbar color3">
                <div className="row container-fluid">
                    <Link href={"/"} className='col-1 col-md-1'>
                        {/* Logo (desktop) */}
                        <img src="/logo3-.png" className="img-fluid d-none d-md-block imgHeaderDesktop"></img>
                        {/* Logo (mobile) */}
                        <img src="/logo3-.png" className="img-fluid d-block d-md-none imgHeaderMobile"></img>
                    </Link>

                    {/* searchBar */}
                    <div className="col-md-5 d-none d-md-block">
                        <form className="d-flex justify-content-center">
                            <input className="form-control w-75 me-2 color4" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success pl-3" type="submit"><img src="/loupe-svgrepo-com.svg" className="img-fluid svgLoupe"></img></button>
                        </form>
                    </div>

                    {/* langue */}
                    <div className="col-2 col-md-1 d-flex justify-content-start">
                        <LanguageSelector />
                    </div>

                    {/* menu admin */}
                    <div className="col-1">
                        <button className="btn btn-primary" type="button" onClick={toggleOffcanvasInscription}>
                            Register
                        </button>
                    </div>

                    {/* sign in */}
                    <div className="col-1 d-flex justify-content-center">
                        <button className="btn btn-primary" type="button" onClick={toggleOffcanvasInscription}>
                            Register
                        </button>
                    </div>

                    {/* sign in */}
                    <div className="col-1 d-flex justify-content-center">
                        {username ? (
                            <button className="btn btn-primary" type="button" onClick={deconnexion}>
                                {username}
                            </button>) : (
                            <button className="btn btn-primary" type="button" onClick={toggleOffcanvasConnexion}>
                                Sign in
                            </button>
                        )}
                    </div>

                    {/* Offcanvas Connexion */}
                    <div className={`offcanvas offcanvas-end ${showOffcanvasConnexion ? 'show' : ''} color4`} tabIndex="-1" style={{ visibility: showOffcanvasConnexion ? 'visible' : 'hidden' }} aria-labelledby="offcanvasRightLabel">
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
                    <div className={`offcanvas offcanvas-end ${showOffcanvasInscription ? 'show' : ''} color4`} tabIndex="-1" style={{ visibility: showOffcanvasInscription ? 'visible' : 'hidden' }} aria-labelledby="offcanvasRightLabel">
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
                        <div className="col-1 d-flex justify-content-center">
                            <Link href="/PagePanier/" className="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart2 colorWhite" viewBox="0 0 16 16">
                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="d-none d-md-block container-fluid pt-2 pb-2 color5">
                    <div className="row w-100">
                        <div className="d-none d-md-block col-md-1 text-white"><Link className="d-flex align-items-center text-white hover-underline" href={"/PageArticle/Tout/"}><img src="/1hamburger-menu-mobile-svgrepo-com.svg" className="img-fluid svgBurger me-1"></img>Tout</Link></div>
                        <div className="d-none d-md-block col-md-auto"><Link className="text-white hover-underline" href={"/PageArticle/Filtre1/"}>Productivité / Élégance</Link></div>
                        <div className="d-none d-md-block col-md-auto"><Link className="text-white hover-underline" href={"/PageArticle/Filtre2/"}>Décoration / Ambiance</Link></div>
                        <div className="d-none d-md-block col-md-auto"><Link className="text-white hover-underline" href={"/PageArticle/Filtre3/"}>Confort / Style</Link></div>
                        <div className="d-none d-md-block col-md-auto"><Link className="text-white hover-underline" href={"/PageArticle/Filtre4/"}>Accessoire</Link></div>
                        <div className="d-none d-md-block col-md-auto"><Link className="text-white hover-underline" href={"/PageArticle/Filtre5/"}>Pack de démarrage</Link></div>
                    </div>
                </div>

            </nav>
        </header>
    );
}