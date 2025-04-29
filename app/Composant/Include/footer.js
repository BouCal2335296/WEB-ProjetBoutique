import LanguageSelector from "../Language/languageSelector";

export default function Footer() {
    return (
        <footer>
            <div className="d-flex justify-content-center p-3 pt-5">
                <LanguageSelector />
            </div>
            <div className="d-flex justify-content-center p-2">
                {/* Nom a changer */}
                <p>Work And Play</p>
            </div>
            <div className="d-flex justify-content-center p-5">
                <div className="col-3 text-center"><p>Copyright © 2025 All rights reserved</p></div>
                <div className="col-3 text-center"><p>Condition of use</p></div>
            </div>
        </footer>
    );
}