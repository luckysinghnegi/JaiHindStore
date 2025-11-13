import nccCapHome from "../Assets/NCC_Cap_home.jpg";
import nccBeltHome from "../Assets/NCC-Belt-Leather.jpg";
import nccTshit from "../Assets/NCC_T-shit.jpg";
import nccDms from "../Assets/DMS_Images/DMS_image.jpeg";
import nccBadge from "../Assets/Badges_image/IMA_Badge.jpeg";
import nccGloves from "../Assets/Gloves_images/Gloves_image_1.jpeg";

// use exact folder names (match your filesystem) and eager imports
const dmsModules = import.meta.glob("../Assets/DMS_Images/*.{jpg,png,jpeg,svg}", { eager: true });
const badgeModules = import.meta.glob("../Assets/Badges_image/*.{jpg,png,jpeg,svg}", { eager: true });
const beltModules = import.meta.glob("../Assets/Belt_images/*.{jpg,png,jpeg,svg}", { eager: true });
const GlovesModules = import.meta.glob("../Assets/Gloves_images/*.{jpg,png,jpeg,svg}", { eager: true });

// normalize module outputs to plain URL strings (handles both { default } modules and plain urls)
const toUrlArray = (mods) =>
  Object.values(mods || {}).map((m) => (m && m.default) ? m.default : m).filter(Boolean);

const Dms_images = toUrlArray(dmsModules);
const BadgeImages = toUrlArray(badgeModules);
const BeltImages = toUrlArray(beltModules);
const GlovesImages = toUrlArray(GlovesModules);
const Images = toUrlArray(beltModules);

const Products_data = [
  {
    imageUrl: nccCapHome,
    title: "NCC Parade Cap",
    subtitle: "Regulation-ready NCC cap with premium badge & hackle.",
    price: "₹280",
    mrp: "₹320",
    rating: 4.7,
    reviews: 218,
    badge: "Top Rated",
    ctaText: "Add to Cart"
  },
  {
    imageUrl: nccGloves,
    All_images:GlovesImages,
    title: "NCC Gloves",
    subtitle: "Regulation-ready NCC gloves with premium Matterial .",
    price: "₹99",
    mrp: "₹149",
    rating: 4.7,
    reviews: 218,
    badge: "Top Rated",
    ctaText: "Add to Cart"
  },
  {
    imageUrl: nccBeltHome,
    All_images: BeltImages,
    title: "NCC Leather Belt",
    subtitle: "Thick leather strap with brass buckle for parade perfection.",
    price: "₹380",
    mrp: "₹430",
    rating: 4.4,
    reviews: 162,
    badge: "Best Seller",
    ctaText: "Add to Cart"
  },
  {
    imageUrl: nccDms,
    All_images: Dms_images,
    title: "NCC DMS Boots",
    subtitle: "Polished DMS boots with cushioned insole for long drills.",
    price: "₹1000",
    mrp: "₹1250",
    rating: 4.8,
    reviews: 138,
    badge: "Trending",
    ctaText: "Add to Cart"
  },
  {
    imageUrl: nccBadge,
    All_images: BadgeImages,
    title: "NCC Customise Badges",
    subtitle: "Custom Camp Badges",
    price: "₹120",
    mrp: "₹150",
    rating: 4.8,
    reviews: 140,
    badge: "Trending",
    ctaText: "Add to Cart"
  },
  {
    imageUrl: nccCapHome,
    title: "NCC Parade Cap",
    subtitle: "Regulation-ready NCC cap with premium badge & hackle.",
    price: "₹280",
    mrp: "₹320",
    rating: 4.7,
    reviews: 218,
    badge: "Top Rated",
    ctaText: "Add to Cart"
  },
  {
    imageUrl: nccBeltHome,
    All_images: BeltImages,
    title: "NCC Leather Belt",
    subtitle: "Thick leather strap with brass buckle for parade perfection.",
    price: "₹380",
    mrp: "₹430",
    rating: 4.4,
    reviews: 162,
    badge: "Best Seller",
    ctaText: "Add to Cart"
  },
  {
    imageUrl: nccDms,
    All_images: Dms_images,
    title: "NCC DMS Boots",
    subtitle: "Polished DMS boots with cushioned insole for long drills.",
    price: "₹1000",
    mrp: "₹1250",
    rating: 4.8,
    reviews: 138,
    badge: "Trending",
    ctaText: "Add to Cart"
  },
  {
    imageUrl: nccBadge,
    All_images: BadgeImages,
    title: "NCC Customise Badges",
    subtitle: "Custom Camp Badges",
    price: "₹120",
    mrp: "₹150",
    rating: 4.8,
    reviews: 140,
    badge: "Trending",
    ctaText: "Add to Cart"
  },
  // ...rest unchanged...
];

export default Products_data;