import Carousel from '../Composant/Carousel/Carousel';

export default function PageArticle() {
    return (
        <div>
            <div>
                <div>
                    <h3>Productivité / Élégance</h3>
                </div>

                <div>
                    {/* CAROUSSEL DE 5 CARD */}
                    <Carousel />
                </div>
            </div>
        </div>
    );
}