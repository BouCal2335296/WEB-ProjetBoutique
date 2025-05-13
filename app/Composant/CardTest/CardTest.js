import Link from "next/link";

export default function CardTest({ image, nom, description, prix }) {

    return (
        <Link href={"/"}>
            <div className="col-2 card m-2 color1" style={{ width: "9.5rem" }}>
                    <img src={image} className="imgCardCarousel" alt={nom} />
                    <div className="txtCardCarousel">
                        <h5 className="card-title">{nom}</h5>
                        <div className="d-flex" style={{maxHeight: "3.6rem", minHeight: "3.6rem"}}>
                            <p className="col-9 card-text">{description}</p>
                            <p className="col-3 align-self-end">{prix}$</p>
                        </div>
                    </div>
            </div>
        </Link>
    );
}
