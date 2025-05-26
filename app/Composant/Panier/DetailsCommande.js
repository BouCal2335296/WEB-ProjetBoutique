import Link from "next/link";

export default function DetailsCommande({ articlePanier, onClickCommande }) {


    let prixTotal = 0;

    articlePanier.forEach(article => {
        prixTotal += article.prix;
    });

    if (articlePanier.length === 0) {

        return <>

            <h1>Commande vide</h1>
        </>;
    } else {
        return <>
            <div className="col-5 col-md-4 border d-flex flex-column pt-5 justify-content-start align-items-center">
                <div className="col-11 col-md-10 bg-white rounded-4 shadow-sm border p-4 d-flex flex-column align-items-center">
                    <h2 className="mb-4 fw-bold">Commande</h2>

                    <p className="mb-1 text-muted fs-5">Total commande</p>
                    
                    <p className="fs-4 fw-semibold mb-4">
                        ({articlePanier.length} {articlePanier.length > 1 ? "articles" : "article"}) : <span className="text-success">{prixTotal} $</span>
                    </p>

                    <button className="btn btn-primary btn-lg w-100" type="submit" onClick={onClickCommande} style={{ borderRadius: "0.75rem" }} >
                        Passer la commande
                    </button>
                </div>
            </div>

        </>
    }
}