"use client";
import { useState } from 'react';
import Link from "next/link";
import LanguageSelector from "../Language/languageSelector";
import Connexion from "../Connexion/connexion";

export default function Header() {

    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);
    const closeOffcanvas = () => setShowOffcanvas(false);

    return (
        <header>
                <nav className="navbar color3">
                    <div className="row container-fluid">
                        {/* Logo (desktop) */}
                        <img src="/logo-boutique.PNG" className="col-1 img-fluid d-none d-md-block"></img>
                        {/* Logo (mobile) */}
                        <img src="/logo-boutique.PNG" className="col-2 img-fluid d-block d-md-none"></img>

                        {/* searchBar */}
                        <div className="col-md-6 d-none d-md-block">
                            <form className="d-flex justify-content-center">
                                <input className="form-control w-75 me-2 color4" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success pl-3" type="submit"><img src="/loupe-svgrepo-com.svg" className="img-fluid svgLoupe"></img></button>
                            </form>
                        </div>

                        {/* langue */}
                        <div className="col-3 col-md-1 d-flex justify-content-start">
                            <LanguageSelector />
                        </div>

                        {/* menu admin */}
                        <div className="col-3 col-md-2">
                        </div>
                        
                        {/* sign in */}
                        <div className="col-3 col-md-1 d-flex justify-content-end">
                            <button className="btn btn-primary" type="button" onClick={toggleOffcanvas}>
                                Sign in
                            </button>
                        </div>

                        {/* Offcanvas personnalisé */}
                        <div className={`offcanvas offcanvas-end ${showOffcanvas ? 'show' : ''} color4`} tabIndex="-1" style={{ visibility: showOffcanvas ? 'visible' : 'hidden' }} aria-labelledby="offcanvasRightLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasRightLabel">Connexion</h5>
                                <button type="button" className="btn-close" onClick={closeOffcanvas}></button>
                            </div>
                            <div className="offcanvas-body">
                                {/* contenu du composant connexion */}
                                <Connexion />
                            </div>
                        </div>


                        {/* panier */}
                        <div className="col-1 d-flex justify-content-end">

                            <Link href="/" className="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart2 colorWhite" viewBox="0 0 16 16">
                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                            </svg>
                            </Link>
                        </div>
                    </div>

                    <div className="d-none d-md-block container-fluid pt-2 pb-2 color5">
                    <div className="row w-100">

                        <div className="d-none d-md-block col-md-1 text-white"><Link className="d-flex align-items-center text-white hover-underline" href={"/PageArticle"}><img src="/1hamburger-menu-mobile-svgrepo-com.svg" className="img-fluid svgBurger me-1"></img>Tout</Link></div>
                        <div className="d-none d-md-block col-md-auto"><Link className="text-white hover-underline" href={"/"}>Productivité / Élégance</Link></div>
                        <div className="d-none d-md-block col-md-auto"><Link className="text-white hover-underline" href={"/"}>Décoration / Ambiance</Link></div>
                        <div className="d-none d-md-block col-md-auto"><Link className="text-white hover-underline" href={"/"}>Confort / Style</Link></div>
                        <div className="d-none d-md-block col-md-auto"><Link className="text-white hover-underline" href={"/"}>Accessoire</Link></div>
                        <div className="d-none d-md-block col-md-auto"><Link className="text-white hover-underline" href={"/"}>Pack de démarrage</Link></div>
                    </div>
                    </div>

                </nav>
        </header>
    );
}