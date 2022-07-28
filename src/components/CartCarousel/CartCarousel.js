import React, { useState } from "react";
import './CartCarousel.css'
import arrow from '../../assets/carousel-arrow.svg'

const CartCarousel = (props) => {
    let images = props.images
    const [currentImage, setCurrentImage] = useState(0)
    const previousImage = () => {
        if(currentImage - 1 >= 0){
            setCurrentImage(currentImage - 1)
        } else setCurrentImage(images.length - 1)
    }
    const nextImage = () => {
        if(currentImage + 1 <= images.length - 1){
            setCurrentImage(currentImage + 1)
        } else setCurrentImage(0)
    }

    return <div className="image-carousel">
        <img src={images[currentImage]} alt=""></img>
        <div className="image-selectors">
            <div className="back unselectable" onClick={previousImage}><img src={arrow} alt=""></img></div>
            <div className="forward unselectable" onClick={nextImage}><img src={arrow} alt=""></img></div>
        </div>
    </div>
}

export default CartCarousel;