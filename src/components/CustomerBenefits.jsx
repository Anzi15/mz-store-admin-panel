import { FiTruck } from "react-icons/fi";
import { PiPackage } from "react-icons/pi";
import { TfiWorld } from "react-icons/tfi";
import { FaWhatsapp } from "react-icons/fa";

const CustomerBenefits = () => {
  return (
    <section className="bg-[#F6F6F0] min-h-[20rem] flex items-center gap-6 overflow-x-auto md:overflow-x-hidden snap-x snap-mandatory">
      <div className="flex min-w-full md:min-w-[20%] flex-col items-center text-center text-brandBrown gap-4 snap-center">
        <FiTruck className="text-5xl" />
        <h2 className="text-xl font-bold">Free Doorstep Delivery</h2>
        <p className="max-w-[70%]">
          Enjoy the convenience of having your favorite achars delivered to your
          doorstep across all major cities in Pakistan.
        </p>
      </div>
      <div className="flex min-w-full md:min-w-[20%] flex-col items-center text-center text-brandBrown gap-4 snap-center">
        <PiPackage className="text-5xl" />
        <h2 className="text-xl font-bold">Exclusive After-Sale Support</h2>
        <p className="max-w-[70%]">
          We stand by our products with a commitment to exceptional after-sales
          service, ensuring your satisfaction long after your purchase.
        </p>
      </div>
      <div className="flex min-w-full md:min-w-[20%] flex-col items-center text-center text-brandBrown gap-4 snap-center">
        <TfiWorld className="text-5xl font-thin" />
        <h2 className="text-xl font-bold">Global Quality Standards</h2>
        <p className="max-w-[70%]">
          Our achars are crafted locally but meet international standards,
          ensuring you receive the finest quality every time.
        </p>
      </div>
      <div className="flex min-w-full md:min-w-[20%] flex-col items-center text-center text-brandBrown gap-4 snap-center">
        <FaWhatsapp className="text-5xl" />
        <h2 className="text-xl font-bold">Fragrance Consultation</h2>
        <p className="max-w-[70%]">
          Our experts are available to assist you in selecting and personalizing
          your fragrance, helping you find the perfect scent for every occasion.
        </p>
      </div>
    </section>
  );
};

export default CustomerBenefits;
