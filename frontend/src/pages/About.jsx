import Title from '../components/Title.jsx';
import { assets } from '../assets/assets.js';
import NewsletterBox from '../components/NewsletterBox.jsx';

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="image of about page" className="w-full md:max-w-[450px]" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>At Baazarpur, fashion meets purpose. We founded our brand with one vision: to bring stylish, quality-driven apparel to every wardrobe—without compromise. From a small idea to a growing community, our journey has always focused on you, the shopper who cares about fit, value and authenticity.</p>
          <p>At Baazarpur, we believe in delivering quality you can trust, convenience you can rely on, and service that truly cares. Every product goes through strict quality checks to ensure the best value for your money, while our smooth shopping experience—from browsing to doorstep delivery—keeps things effortless. We're committed to sustainable practices, fair partnerships, and packaging that's kinder to the planet, all while making sure our customers always come first.</p>
          <b className="text-gray-800">Our Mission</b>
          <p>We exist to simplify style. Whether you're dressing for the boardroom, a weekend getaway, or simply for comfort at home, Baazarpur aims to deliver pieces that feel right, look right, and make you feel confident. Every collection is curated with care, ensuring you receive more than just a product—you receive trust.</p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 border border-gray-400 divide-y md:divide-y-0 md:divide-x divide-gray-400">
        <div className="px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>At Baazarpur, we believe in delivering more than just products — we deliver trust. Each item you purchase is hand-selected, inspected and packaged with precision to ensure it meets our highest standards. From fabric quality to finishing touches, we leave no stone unturned so you can enjoy peace of mind with every purchase.</p>
        </div> 
        <div className="px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className='text-gray-600'>Shopping made simple, on your terms. Whether you're browsing from your phone or laptop, our intuitive site and swift checkout process take the hassle out of purchasing. With flexible sizing filters, fast delivery options and a transparent tracking system, you're always in control.</p>
        </div> 
        <div className="px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team is dedicated to turning your shopping experience into a delight. Have a question or need assistance? Our friendly support staff is on standby to assist you with everything from style suggestions to returns. At Baazarpur, your satisfaction isn't just a goal — it's our promise.</p>
        </div> 
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About
