// app/[slug]/page.js
import dynamic from "next/dynamic";
import ContactCard from "../ContactCard/ContactCard";

const cityConfigs = {
  "vip-mobile-number-in-ahmedabad": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-ahmedabad/CityAhmedabad")
    ),
    metadata: {
      title: "VIP Mobile Number in Ahmedabad | Fancy Mobile Number | VNS",
      description:
        "Discover the best VIP Mobile Number in Ahmedabad. Elevate your status with a fancy number. Choose VNS for exclusive selections.",
    },
  },
  "vip-mobile-number-in-bihar": {
    component: dynamic(() => import("../vip-mobile-number-in-bihar/CityBihar")),
    metadata: {
      title: "VIP Mobile Number in Bihar | Fancy Mobile Number | VNS",
      description:
        "Explore a range of VIP Mobile Number in Bihar. Elevate your status with our exclusive fancy numbers at VNS. Stand out today! Books yours!",
    },
  },
  "vip-mobile-number-in-chandigarh": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-chandigarh/CityChandigarh")
    ),
    metadata: {
      title: "VIP Mobile Numbers In Chandigarh | Fancy Mobile Number",
      description:
        "Embrace distinction with VIP Mobile Numbers in Chandigarh at VNS. Browse our elite Fancy Mobile Number range for an unparalleled identity.",
    },
  },
  "vip-mobile-number-in-chhattisgarh": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-chhattisgarh/CityChhattisgarh")
    ),
    metadata: {
      title: "VIP Mobile Number in Chhattisgarh | Fancy Mobile Number | VNS",
      description:
        "Showcase your style with a VIP Mobile Number in Chhattisgarh from VNS. Elevate your profile with our curated Fancy Mobile Numbers collection.",
    },
  },
  "vip-mobile-number-in-delhi": {
    component: dynamic(() => import("../vip-mobile-number-in-delhi/CityDelhi")),
    metadata: {
      title: "VIP Mobile Number in Delhi NCR, Gurgaon, Faridabad, Noida",
      description: `Experience exclusivity with VNS's VIP Mobile Number in Delhi NCR. Elevate your identity with our premium fancy numbers. Stand out with a VIP number.`,
    },
  },
  "vip-mobile-number-in-gujarat": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-gujarat/CityGujarat")
    ),
    metadata: {
      title: "VIP Mobile Number in Gujarat | Fancy Mobile Number | VNS",
      description:
        "Discover the best VIP Mobile Number in Gujarat. Elevate your status with our exclusive fancy numbers. Secure your unique identity with VNS today!",
    },
  },
  "vip-mobile-number-in-haryana": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-haryana/CityHaryana")
    ),
    metadata: {
      title: "VIP Mobile Number in Haryana | Fancy Mobile Number | VNS",
      description:
        "Get your VIP Mobile Number in Haryana with VNS. Stand out with unique, fancy numbers. Premium choices available. Grab yours now!",
    },
  },
  "vip-mobile-number-in-himachal-pradesh": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-himachal-pradesh/CityHimachalPradesh")
    ),
    metadata: {
      title: "VIP Mobile Number in Himachal Pradesh | Fancy Number | VNS",
      description:
        "Choose from the finest VIP Mobile Number in Himachal Pradesh with VNS. Elevate your identity with a unique fancy number.",
    },
  },
  "vip-mobile-number-in-indore": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-indore/CityIndore")
    ),
    metadata: {
      title: "VIP Mobile Number in Indore (Fancy Mobile Number)",
      description:
        "Find your ideal VIP mobile number in Indore. Select from our premium fancy numbers to reflect your professional image!",
    },
  },
  "vip-mobile-number-in-jaipur": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-jaipur/CityJaipur")
    ),
    metadata: {
      title: "VIP Mobile Number in Jaipur (Fancy Mobile Number)",
      description:
        "Discover unique VIP mobile numbers in Jaipur to match your lifestyle. Browse our fancy numbers today and make a statement!",
    },
  },
  "vip-mobile-number-in-jalandhar": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-jalandhar/CityJalandhar")
    ),
    metadata: {
      title: "VIP Mobile Number in Jalandhar (Fancy Mobile Number)",
      description:
        "Secure a distinctive VIP mobile number in Jalandhar today. Our fancy numbers are perfect for personal or business use. Buy now!",
    },
  },
  "vip-mobile-number-in-jammu": {
    component: dynamic(() => import("../vip-mobile-number-in-jammu/CityJammu")),
    metadata: {
      title: "VIP Mobile Number in Jammu (Fancy Mobile Number)",
      description:
        "Elevate your identity with a VIP mobile number in Jammu. Check out our collection of fancy numbers and claim yours today!",
    },
  },
  "vip-mobile-number-in-lucknow": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-lucknow/CityLucknow")
    ),
    metadata: {
      title: "VIP Mobile Number in Lucknow | Fancy Mobile Number | VNS",
      description:
        "Get your VIP Mobile Number in Lucknow today! Choose from a wide range of Fancy Mobile Numbers at VNS. Stand out with a unique number.",
    },
  },
  "vip-mobile-number-in-madhya-pradesh": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-madhya-pradesh/CityMadhyaPradesh")
    ),
    metadata: {
      title: "VIP Mobile Number in Madhya Pradesh | Fancy Mobile Number | VNS",
      description:
        "Experience the luxury of VIP Mobile Number in Madhya Pradesh at VNS. Choose from our exquisite Fancy Mobile Numbers for a distinguished presence.",
    },
  },
  "vip-mobile-number-in-maharashtra": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-maharashtra/CityMaharashtra")
    ),
    metadata: {
      title: "VIP Mobile Number in Maharashtra | Fancy Mobile Number",
      description:
        "Discover unique VIP Mobile Number in Maharashtra. Stand out with our exclusive Fancy Mobile Numbers at VNS. Book yours today!",
    },
  },
  "vip-mobile-number-in-moradabad": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-moradabad/CityMoradabad")
    ),
    metadata: {
      title: "VIP Mobile Number in Moradabad (Fancy Mobile Number)",
      description:
        "Get a VIP mobile number in Moradabad and enhance your business presence. Choose from our exclusive fancy numbers now!",
    },
  },
  "vip-mobile-number-in-mumbai": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-mumbai/CityMumbai")
    ),
    metadata: {
      title: "VIP Mobile Number In Mumbai | Fancy Mobile Number | VNS",
      description:
        "Discover exclusive VIP Mobile Number in Mumbai at VNS. Elevate your status with a fancy mobile number. Limited stock, grab yours today!",
    },
  },
  "vip-mobile-number-in-patna": {
    component: dynamic(() => import("../vip-mobile-number-in-patna/CityPatna")),
    metadata: {
      title: "VIP Mobile Number in Patna (Fancy Mobile Number)",
      description:
        "Boost your brand with a fancy VIP mobile number in Patna. Visit us now to choose from exclusive numbers that set you apart!",
    },
  },
  "vip-mobile-number-in-punjab": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-punjab/CityPunjab")
    ),
    metadata: {
      title: "VIP Mobile Number in Punjab | Fancy Mobile Number | VNS",
      description:
        "Experience opulence with the finest VIP Mobile Number in Punjab. Vip Number Shop offers fancy numbers that radiate prestige. Book yours today!",
    },
  },
  "vip-mobile-number-in-rajasthan": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-rajasthan/CityRajasthan")
    ),
    metadata: {
      title: "VIP Mobile Number in Rajasthan | Fancy Mobile Number | VNS",
      description:
        "Discover the best VIP Mobile Number in Rajasthan. Elevate your status with unique, fancy numbers only at VNS. Stand out. Dial in style. Book yours today!",
    },
  },
  "vip-mobile-number-in-surat": {
    component: dynamic(() => import("../vip-mobile-number-in-surat/CitySurat")),
    metadata: {
      title: "VIP Mobile Number in Surat | Fancy Mobile Number | VNS",
      description:
        "Discover the best VIP Mobile Number in Surat. Choose from a wide range of fancy numbers at VNS. Stand out with a unique number today!",
    },
  },
  "vip-mobile-number-in-uttar-pradesh": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-uttar-pradesh/CityUttarPradesh")
    ),
    metadata: {
      title: "VIP Mobile Number in Uttar Pradesh | Fancy Mobile Number | VNS",
      description:
        "Unveil the premier VIP Mobile Number in Uttar Pradesh selection at VNS. Stand out with our exclusive Fancy Mobile Numbers tailored for you.",
    },
  },
  "vip-mobile-number-in-uttarakhand": {
    component: dynamic(() =>
      import("../vip-mobile-number-in-uttarakhand/CityUttarakhand")
    ),
    metadata: {
      title: "VIP Mobile Number in Uttarakhand | Fancy Mobile Number | VNS",
      description:
        "Discover the elite VIP Mobile Number in Uttarakhand collection at VNS. Elevate your identity with our handpicked Fancy Mobile Numbers.",
    },
  },
  "vip-mobile-number-rajkot": {
    component: dynamic(() => import("../vip-mobile-number-rajkot/CityRajkot")),
    metadata: {
      title: "VIP Mobile Number Rajkot (Fancy Mobile Number)",
      description:
        "Explore our selection of VIP mobile numbers in Rajkot. Find the perfect fancy number to elevate your style. Shop now and stand out!",
    },
  },

  "fancy-mobile-number-in-hyderabad": {
    component: dynamic(() =>
      import("../fancy-mobile-number-in-hyderabad/CityHyderabad")
    ),
    metadata: {
      title: "Fancy Mobile Number in Hyderabad | VIP Mobile Number | VNS",
      description:
        "Discover premium Fancy Mobile Number in Hyderabad at VNS. Elevate your status with our exclusive VIP numbers. Stand out today!",
    },
  },
  "fancy-mobile-number-in-kerala": {
    component: dynamic(() =>
      import("../fancy-mobile-number-in-kerala/CityKerala")
    ),
    metadata: {
      title: "Fancy Mobile Number in Kerala | VIP Mobile Number | VNS",
      description:
        "Secure your status in Kerala with a Fancy Mobile Number in Kerala from VNS. Dive into our exclusive VIP Number range and choose a number that truly stands out.",
    },
  },
  "fancy-mobile-number-in-odisha": {
    component: dynamic(() =>
      import("../fancy-mobile-number-in-odisha/CityOdisha")
    ),
    metadata: {
      title: "Fancy Mobile Number in Odisha | VIP Mobile Number | VNS",
      description:
        "Discover Fancy Mobile Number in Odisha at VNS. Choose from exclusive VIP numbers & elevate your identity. Make a statement with every call you make. book yours",
    },
  },
  "fancy-mobile-number-in-pune": {
    component: dynamic(() => import("../fancy-mobile-number-in-pune/CityPune")),
    metadata: {
      title: "Fancy Mobile Number in Pune | VIP Mobile Number | VNS",
      description:
        "Discover premium Fancy Mobile Numbers in Pune with VNS. Step up with a VIP number and make a lasting impression. Book yours today!",
    },
  },
  "fancy-mobile-number-in-tamil-nadu": {
    component: dynamic(() =>
      import("../fancy-mobile-number-in-tamil-nadu/CityTamilNadu")
    ),
    metadata: {
      title: "Fancy Mobile Number in Tamil Nadu | VIP Mobile Number | VNS",
      description:
        "Explore premium Fancy Mobile Number in Tamil Nadu. Elevate your identity with our VIP selections at VNS. Stand out, be unique.",
    },
  },
  "fancy-mobile-numbers-in-bangalore": {
    component: dynamic(() =>
      import("../fancy-mobile-numbers-in-bangalore/CityBangalore")
    ),
    metadata: {
      title: "Fancy Mobile Numbers in Bangalore | VIP Mobile Number | VNS",
      description:
        "Explore the best collection of Fancy Mobile Numbers in Bangalore. Secure a unique VIP number today with VNS. Stand out, be distinctive.",
    },
  },
  "fancy-mobile-numbers-in-chennai": {
    component: dynamic(() =>
      import("../fancy-mobile-numbers-in-chennai/CityChennai")
    ),
    metadata: {
      title: "Fancy Mobile Numbers in Chennai | VIP Mobile Number | VNS",
      description:
        "Explore premium Fancy Mobile Numbers in Chennai. Elevate your style with our exclusive VIP selection at VNS. Stand out, be unique.",
    },
  },
  "fancy-mobile-numbers-in-karnataka": {
    component: dynamic(() =>
      import("../fancy-mobile-numbers-in-karnataka/CityKarnataka")
    ),
    metadata: {
      title: "Fancy Mobile Numbers in Karnataka | VIP Mobile Number | VNS",
      description:
        "Discover premium Fancy Mobile Numbers in Karnataka. Elevate your identity with our exclusive VIP Mobile Number. Stand out, be unique. Book yours today!",
    },
  },
  "airtel-fancy-numbers": {
    component: dynamic(() =>
      import("../airtel-fancy-numbers/NetworkAirtel")
    ),
    metadata: {
      title: "Airtel Fancy, VIP, Choice Numbers | VIP Number Shop",
      description:
        "Find Airtel fancy numbers, VIP numbers, and choice numbers, even 786 Airtel choice number available. Visit VIP Number Shop for exclusive deals!",
    },
  },
   "blogs": {
    component: dynamic(() =>
      import("../blogs/Blog")
    ),
    metadata: {
      title: "Insights and Tips from VIP Number Experts | Numerology",
      description:
        "Explore our blog for insights, tips, numerology, angel numbers, and guides on choosing the perfect VIP mobile number for personal or business branding.",
    },
  },
  "vip-prepaid-number": {
    component: dynamic(() =>
      import("../vip-prepaid-number/VipPrepaidNumber")
    ),
    metadata: {
      title: "VIP Prepaid Number | Prepaid Fancy Number | VIP Number Shop",
      description:
        "Explore a wide selection of VIP Prepaid Number and Prepaid Fancy Number at VIP Number Shop. Find your exclusive, memorable number for standout communication.",
    },
  },
   "vi-fancy-number": {
    component: dynamic(() =>
      import("../vi-fancy-number/NetworkVi")
    ),
    metadata: {
      title: "Buy VI Fancy Number - VI Choice Number - VIP Number Shop",
      description:
        "Explore top-tier VI Fancy Number options at VIP Number Shop. Handpick from our curated selection of VI Choice Numbers for standout appeal.",
    },
  },
  "postpaid-fancy-numbers": {
    component: dynamic(() =>
      import("../postpaid-fancy-numbers/Postpaid")
    ),
    metadata: {
      title: "Postpaid VIP Number | Postpaid Fancy Number | VIP Number Shop",
      description:
        "Find your ideal Postpaid VIP Number and Postpaid Fancy Number at VIP Number Shop. Enhance your presence with a unique, memorable postpaid number.",
    },
  },
    "terms-and-conditions": {
    component: dynamic(() =>
      import("../terms-and-conditions/TermsConditions")
    ),
    metadata: {
      title: "Terms and Conditions | VIP Number Shop",
      description:
        "Read the terms and conditions for using VIP Number Shop. Understand our policies on services, purchases, and more to ensure a smooth experience.",
    },
  },
};

// Dynamic Metadata
export async function generateMetadata({ params }) {
  const meta = await params;
  const config = cityConfigs[meta.slug.toLowerCase()];
  if (!config) {
    return {
      title: "VIP Mobile Numbers | VNS",
      description: "Explore VIP mobile numbers across India with VNS.",
    };
  }
  return config.metadata;
}

// Page Component
// Page Component
export default async function CityPage({ params }) {
  const meta = await params;
  const config = cityConfigs[meta.slug.toLowerCase()];
  const isVip = meta.slug.toLowerCase().startsWith('vip-');

  if (isVip) {
    return <ContactCard/>;
  }
  if (!config) {
    return <div>Page not found</div>;
  }
  const CityComponent = config.component;
  return <CityComponent />;
}
