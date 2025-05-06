export default function Card({titreCategorie}){
    return(
    <div className="card border border-2 border-black">
        <h5 className="border-bottom border-2 border-black">{titreCategorie}</h5>
        <div className="card-body">
            {/* <img className="img-Card" src={""}></img>
            <img className="img-Card" src={""}></img>
            <img className="img-Card" src={""}></img>
            <img className="img-Card" src={""}></img>
            <img className="img-Card" src={""}></img>
            <img className="img-Card" src={""}></img> */}
        </div>
    </div>
    );
}