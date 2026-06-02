export const products = [
  {
    id: 'beacon-hill-trench',
    name: 'Beacon Hill Trench Coat',
    price: 495,
    category: 'Outerwear',
    rating: 4.9,
    reviews: 24,
    image: '/assets/boston_trench.png',
    description: 'An architectural, double-breasted utility trench coat with unstructured draping. Engineered from a blend of premium wool and organic cotton canvas, structured to capture the elegance of historical Beacon Hill brownstones.',
    colors: [
      { name: 'Sand Beige', hex: '#E6E2DE' },
      { name: 'Charcoal Black', hex: '#1C1C1E' },
      { name: 'Stone Gray', hex: '#8E8E93' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    limited: true,
    details: [
      '75% Virgin Wool, 25% Organic Cotton Canvas',
      'Unstructured modern tailoring with adjustable storm flap',
      'Engineered oversized silhouette',
      'Made in Boston, MA'
    ]
  },
  {
    id: 'back-bay-hoodie',
    name: 'Back Bay Charcoal Hoodie',
    price: 185,
    category: 'Knitwear',
    rating: 4.8,
    reviews: 42,
    image: '/assets/streetwear_hoodie.png',
    description: 'Crafted from ultra-dense French Terry loopback cotton, this loop-knit luxury hoodie features dropped shoulders, a dense double-layered hood, and a custom heavyweight luxury wash. A refined take on Boston collegiate culture.',
    colors: [
      { name: 'Charcoal Black', hex: '#1C1C1E' },
      { name: 'Chalk White', hex: '#F2F2F7' },
      { name: 'Sage Green', hex: '#7E8F7C' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    limited: false,
    details: [
      '100% Organic Dense French Terry Loopback Cotton (480gsm)',
      'Double-lined seamless structured hood',
      'Ribbed cuffs and dynamic elasticated architectural hem',
      'Bio-polished finish for supreme handfeel'
    ]
  },
  {
    id: 'boston-gallery-sneakers',
    name: 'Gallery High-Top Sneakers',
    price: 360,
    category: 'Footwear',
    rating: 5.0,
    reviews: 18,
    image: '/assets/boston_sneakers.png',
    description: 'A structural, high-top sneaker fusing Italian calfskin leather with durable carbon rubber cup-soles. Built with an asymmetric colorblocked collar and premium leather insoles that mold to your foot over time.',
    colors: [
      { name: 'Chalk & Slate', hex: '#D2CFC9' },
      { name: 'Midnight Charcoal', hex: '#2C2C2E' }
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    limited: true,
    details: [
      '100% Premium Italian Calfskin and Nappa leather trim',
      'Hand-stitched structural details and supportive ankle padding',
      'Recycled carbon rubber cup-soles',
      'Includes premium cotton dust bag and secondary luxury laces'
    ]
  },
  {
    id: 'charles-utility-tote',
    name: 'Charles River Utility Tote',
    price: 240,
    category: 'Accessories',
    rating: 4.7,
    reviews: 31,
    image: '/assets/boston_tote.png',
    description: 'Constructed from heavy-duty architectural cotton canvas and finished with rich dark-chocolate vegetable-tanned leather straps. Features reinforced stitching, side expandable pockets, and a magnetic brass clasp.',
    colors: [
      { name: 'Natural Canvas', hex: '#EBE6DD' },
      { name: 'Midnight Slate', hex: '#3A3A3C' }
    ],
    sizes: ['One Size'],
    limited: false,
    details: [
      '24oz Waxed Structural Cotton Canvas',
      'Full-grain vegetable-tanned leather accents and strap handles',
      'Internal protective felt pocket for up to a 16-inch laptop',
      'Solid brass rustproof hardware'
    ]
  }
];
