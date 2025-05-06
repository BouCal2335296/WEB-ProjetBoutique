export default function Carousel(){
    return <>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src="globe.svg" alt="First slide"/>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="next.svg" alt="Second slide"/>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="file.svg" alt="Third slide"/>
                </div>
            </div>

            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span>Previous</span>
            </a>

            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span>Next</span>
            </a>
        </div>
    </>
}