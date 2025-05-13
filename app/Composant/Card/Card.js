export default function Card({ titreCategorie }) {
    return (
        <div className="cardContainer">
            <div className="card border border-2 border-black">
                <h5 className="cardTitle">{titreCategorie}</h5>
                <div className="imgContainer">
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                </div>
                <h6 className="cardSubTitle">view more</h6>
            </div>
            <div className="card border border-2 border-black">
                <h5 className="cardTitle">{titreCategorie}</h5>
                <div className="imgContainer">
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                </div>
                <h6 className="cardSubTitle">view more</h6>
            </div>
            <div className="card border border-2 border-black">
                <h5 className="cardTitle">{titreCategorie}</h5>
                <div className="imgContainer">
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                    <img className="img-Card" src="image-placeholder.jpg"></img>
                </div>
                <h6 className="cardSubTitle">view more</h6>
            </div>
        </div>
    );
}