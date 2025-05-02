import LanguageSelector from "../Language/languageSelector";

export default function Footer() {
    return (
        <footer>
            <div className="d-flex justify-content-center pt-4">
                <LanguageSelector />
            </div>
            <div className="d-flex justify-content-center p-2">
                {/* Nom a changer */}
                <p>MindNest</p>
            </div>
            <div className="d-flex justify-content-center">
                <div className="col-3 text-center"><p>Copyright © 2025 All rights reserved</p></div>
                <div className="col-3 text-center"><p>Condition of use</p></div>
            </div>
        </footer>
    );
}