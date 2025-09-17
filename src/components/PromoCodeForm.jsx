import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../modules/firebase-modules/firestore";

// Function to get coupon document from Firestore
export const getCouponDoc = async (couponCode, errorSetter) => {
    const coupons = [];
    const collectionName = "coupons";
    const couponsCollection = collection(db, collectionName);
    
    console.log(`Searching for coupon code: ${couponCode}`);
    
    const q = query(couponsCollection, where("couponCode", "==", couponCode));

    try {
        const querySnapshot = await getDocs(q);
        console.log("Query built");

        if (querySnapshot.empty) {
            errorSetter("Kindly enter a valid coupon code");
            return coupons;
        }

        querySnapshot.forEach((doc) => {
            const data = { ...doc.data(), id: doc.id };
            console.log("Document Data: ", data);
            coupons.push(data);
        });

        return coupons;
    } catch (error) {
        console.error("Error fetching coupon documents: ", error);
        errorSetter("An error occurred while fetching the coupon code");
        return coupons;
    }
};

// Main PromoCodeForm component
const PromoCodeForm = ({ productTags, discountValueReturner, discountTypeReturner, coupon }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [promoCode, setPromoCode] = useState(coupon || "");
    const [error, setError] = useState(null);
    const [isPromoCodeValid, setIsPromoCodeValid] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [discountValue, setDiscountValue] = useState(0);
    const [discountType, setDiscountType] = useState(null);

    // Reset states when promo code changes
    useEffect(() => {
        setError(null);
        setIsFormSubmitted(false);
        setIsPromoCodeValid(false);
    }, [promoCode]);

    // Handle submission logic for promo code
    const handleSubmission = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsFormSubmitted(true);
        setError(null);
        discountValueReturner(0, null, null);

        try {
            const coupons = await getCouponDoc(promoCode, setError);
            if (coupons.length === 0) {
                setError("Kindly input a valid coupon");
                return;
            }

            const couponData = coupons[0];
            const now = new Date();
            const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            const expirationDate = new Date(couponData.expirationDate);

            if (expirationDate < todayStart) {
                setError("Coupon expired");
                return;
            }

            if (couponData.usedCount >= couponData.usageLimit) {
                setError("Usage limit reached");
                return;
            }

            const validForProducts = Array.isArray(couponData.validForProducts) ? couponData.validForProducts : [];
            const hasValidProducts = validForProducts.includes("all") || validForProducts.some(tag => productTags.includes(tag));

            if (!hasValidProducts) {
                setError("Invalid for selected products");
                return;
            }

            setIsPromoCodeValid(true);
            setDiscountType(couponData.discountType);
            setDiscountValue(couponData.discountValue);
            discountTypeReturner(couponData.discountType);
            discountValueReturner(couponData.discountValue, couponData.discountType, promoCode);
        } catch (error) {
            console.error("Error processing coupon:", error);
            setError("Unexpected error, please try again");
        } finally {
            setIsLoading(false);
        }
    };

    const resetDiscount = () => {
        setPromoCode(""); // Clear the input
        setIsPromoCodeValid(false); // Reset validity
        setIsFormSubmitted(false); // Reset submission state
        discountValueReturner(0, "amount"); // Reset discount value
    };

    // Automatically submit the form if a coupon is provided
    useEffect(() => {
        if (coupon) {
            handleSubmission(new Event('submit'));
        }
    }, [coupon]);

    return (
        <form onSubmit={handleSubmission} className={`${isPromoCodeValid && "opacity-90"}`}>
            <fieldset {...(isPromoCodeValid ? { disabled: 'disabled' } : {})}>
                <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                    Promo Code
                </label>
                <div className={`flex ${!error && 'pb-4'} w-full`}>
                    <div className={`relative w-full flex border-gray-300 rounded-lg border ${error && "border-red-700"} ${isPromoCodeValid && "border-green-700"} pl-2`}>
                        <input
                            type="text"
                            required
                            className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white placeholder-gray-500 border-none focus:outline-gray-400"
                            placeholder="xxxx xxxx xxxx"
                            onInput={(e) => setPromoCode(e.target.value.trim().toUpperCase())}
                            value={promoCode}
                            disabled={isPromoCodeValid} // Disable input if the promo code is valid
                        />
                        <Button
                            id="dropdown-button"
                            data-target="dropdown"
                            className="bg-transparent rounded-none border-none shadow-none hover:shadow-none"
                            type="button"
                            loading={isLoading}
                        >
                            {error && "❌"}
                            {isPromoCodeValid && "✅"}
                        </Button>
                    </div>
                </div>
                {error && <p className="text-red-700 pb-6">{error}</p>}
                <div className="flex items-center border-b border-gray-200">
                    <button
                        className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80"
                        disabled={isPromoCodeValid} // Disable button if the promo code is valid
                    >
                        Apply
                    </button>
                </div>
            </fieldset>
            {isPromoCodeValid && 
                <div className="flex w-full justify-between mb-4">
                    <p>Code Applied</p>
                    <button className="text-red-900 underline" type="button" onClick={resetDiscount}>
                        Remove code
                    </button>
                </div>
            }
        </form>
    );
};

export default PromoCodeForm;
