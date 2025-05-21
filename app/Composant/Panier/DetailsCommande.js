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
            <div className="col-4 border d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column bg-white rounded-3 border p-2" style={{ maxWidth: "25rem", minWidth: "25rem", maxHeight: "15rem", minHeight: "15rem" }}>
                    <h2>Commande</h2>
                    <p className="mt-md-5">Total commande</p>
                    {/* Nombre article au panier + prix */}
                    <p>({articlePanier.length} article) : {prixTotal} $</p>

                    <div>
                            <button className="btn btn-primary" type="submit" onClick={onClickCommande}>Passer la commande</button>
                    </div>
                </div>
            </div>
        </>
    }
}