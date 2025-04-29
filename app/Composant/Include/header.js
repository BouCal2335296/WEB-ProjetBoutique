import Link from "next/link";
import LanguageSelector from "../Language/languageSelector";

export default function Header() {
    return (
        <header>
            <div className="container-fluid color3">
                <div className=" d-flex justify-content-center ">
                    <nav className="navbar  navbar-expand-md justify-content-center">
                    <div className="container-fluid row justify-content-center">

                            {/* Logo (desktop) */}
                            <img src="/logo-boutique.PNG" className="col-1 img-fluid d-none d-md-block img-header-desktop"></img>
                            {/* Logo (mobile) */}
                            <img src="/logo-boutique.PNG" className="col-2 img-fluid d-block d-md-none img-header-mobile"></img>

                            {/* searchBar */}
                            <div className="col-md-6 d-none d-md-block">
                                <form className="d-flex justify-content-center">
                                    <input className="form-control w-75 me-3" type="search" placeholder="Search" aria-label="Search"/>
                                    <button className="btn btn-outline-success pl-3" type="submit">Search</button>
                                </form>
                            </div>
                            {/* langue */}
                            <div className="col-3 col-md-1 d-flex justify-content-start">
                                <LanguageSelector />
                            </div>
                            {/* {menu admin} */}
                            <div className="col-md-2">

                            </div>
                            {/* sign in */}
                            <div className="col-3 col-md-2 d-flex justify-content-end">
                                <Link href="/sign-in" className="btn btn-outline-success">Sign in</Link>
                            </div>
                            {/* panier */}
                            <div className="col-1 d-flex justify-content-end">
                                <Link href="/panier" className="btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart2 colorWhite" viewBox="0 0 16 16">
                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                                </svg>
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}