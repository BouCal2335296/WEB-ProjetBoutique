import Carousel from '../../Composant/Carousel/Carousel';

export default function PageArticle() {

    
    return (
        <div>
            <div className='ms-2 mt-3'>
                <h3>Productivité / Élégance</h3>
            </div>

            <div className='mb-3'>
                {/* CAROUSSEL DE 5 ou 4 CARD */}
                <Carousel />
            </div>

            <div className='ms-2'>
                <h3>Décoration / Ambiance</h3>
            </div>

            <div className='mb-3'>
                {/* CAROUSSEL DE 5 ou 4 CARD */}
                <Carousel />
            </div>

            <div className='ms-2'>
                <h3>Comfort / Style</h3>
            </div>

            <div className='mb-3'>
                {/* CAROUSSEL DE 5 ou 4 CARD */}
                <Carousel />
            </div>

            <div className='ms-2'>
                <h3>Accessoires</h3>
            </div>

            <div className='mb-3'>
                {/* CAROUSSEL DE 5 ou 4 CARD */}
                <Carousel />
            </div>

            <div className='ms-2'>
                <h3>Kit de démarrage</h3>
            </div>

            <div className='mb-3'>
                {/* CAROUSSEL DE 5 ou 4 CARD */}
                <Carousel />
            </div>
        </div>
    );
}