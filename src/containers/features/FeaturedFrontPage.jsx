import React from 'react';
import './featuredFrontPage.css';
import world from '../../assets/world.png';


const FeaturedFrontPage = () => {
  return (

    <div className='featured_frontpage_area'>
        <div className='feature_frontPage_catagories'>
            <div className='feature_frontPage_Catagori_1'> 
                <button>
                    <div className='feature_catagory_button_setup'>
                        <div className='feature_catagory_button_image'><img src={world} alt="logo"/> </div>
                        <div className='feature_catagory_button_title'>tes1 </div>
                        <div className='feature_catagory_button_info'>tes1 </div>

                    </div>
                </button>
            </div>
            <div className='feature_frontPage_Catagori_2'>
                <button>
                    <div className='feature_catagory_button_setup'>
                        <div className='feature_catagory_button_image'><img src={world} alt="logo"/> </div>
                        <div className='feature_catagory_button_title'>tes1 </div>
                        <div className='feature_catagory_button_info'>tes1 </div>

                    </div>
                </button>
            </div>
            <div className='feature_frontPage_Catagori_3'>
                <button>
                    <div className='feature_catagory_button_setup'>
                        <div className='feature_catagory_button_image'><img src={world} alt="logo"/> </div>
                        <div className='feature_catagory_button_title'>tes1 </div>
                        <div className='feature_catagory_button_info'>tes1 </div>

                    </div>
                </button>
            </div>
            <div className='feature_frontPage_Catagori_4'>
                <button>
                    <div className='feature_catagory_button_setup'>
                        <div className='feature_catagory_button_image'><img src={world} alt="logo"/> </div>
                        <div className='feature_catagory_button_title'>tes1 </div>
                        <div className='feature_catagory_button_info'>tes1 </div>

                    </div>
                </button>
            </div>
        </div>
    </div>
  )
}

export default FeaturedFrontPage