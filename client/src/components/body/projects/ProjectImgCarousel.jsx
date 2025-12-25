/* 
Name of the Module : Project Image Carousel
Date of Module Creation : 15/10/2021
Author of the module: Jaimin Prajapati
What the module does : Show project Images in one frame
Modification history : 
    place online Image link in src
*/

import React from 'react'
import img from './default_image.png'

const ProjectImgCarousel = () => {
    return(
        <>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">

                    <div className="carousel-item active">
                        <img src={"https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"} className="d-block w-100" alt="..."/>
                    </div>

                    <div className="carousel-item">
                        <img src={img} className="d-block w-100" alt="..."/>
                    </div>
                    
                    <div className="carousel-item">
                        <img src={"https://media.istockphoto.com/photos/document-management-system-being-setup-by-it-consultant-working-on-picture-id1291478674"} className="d-block w-100" alt="..."/>
                    </div>

                </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>

            </div>
        </>
    )
}

export default ProjectImgCarousel