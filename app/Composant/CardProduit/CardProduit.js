import Link from "next/link";
import { useState, useEffect } from "react";
import db from "../../lib/localbase";

export default function CardProduit({ id, image, nom, prix }) {

    const [role, setRole] = useState(null);

    useEffect(() => {
        //Assigne l'ID de l'utilisateur connecté au JWT
        async function fetchUserId() {
            const tokenDoc = await db.collection('tokens').doc('jwt').get();
            if (tokenDoc && tokenDoc.userId) {
                setRole(tokenDoc.role);
            }
        }
        fetchUserId();
    }, []);

    return (
        <div className="col-5 card shadow-sm m-2 border-0" style={{ width: "9.5rem", borderRadius: "1rem", overflow: "hidden", backgroundColor: "#ffffff" }}>
                <Link href={`/PageArticle/DetailArticle/${id}`}>
                <img src={image} className="img-fluid w-100" alt={nom} style={{ height: "6rem", objectFit: "cover" }} />
            
                <div className="p-2 d-flex flex-column justify-content-between" style={{ height: "8rem" }}>
                    <h6 className="fw-bold text-truncate mb-1" title={nom}>{nom}</h6>
                
                    <div className="text-end mb-2">
                        <span className="badge bg-success fs-6">{prix}$</span>
                    </div>
                
                </div>
            </Link>
            {role === 'Administrateur' && (
                <Link href={`/PageModifArticle/${id}`}>
                <button className="btn btn-sm btn-outline-warning w-100">Modifier</button>
                </Link>
            )}
        </div>
      
    );
}
