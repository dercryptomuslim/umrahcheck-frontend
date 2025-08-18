import { NextRequest, NextResponse } from 'next/server'

interface RecommendationRequest {
  city: string
  budget_category?: "Budget" | "Mid-Range" | "Premium" | "Luxury" | "Ultra-Luxury"
  halal_required?: boolean
}

interface HotelRecommendation {
  hotel_name: string
  arabic_name?: string
  city: string
  distance_to_haram?: string
  rating?: number
  star_rating?: string
  images?: string[]
  halal_certified?: boolean
  simulated_price?: {
    source: string
    per_night: number
    currency: string
  }
  price_sources?: Array<{
    source: string
    per_night: number
    currency: string
  }>
  commission_link?: string
  umrah_features?: {
    halal_certified?: boolean
    distance_to_haram?: string
    prayer_facilities?: boolean
    shuttle_service?: boolean
  }
}

// Mock hotel data with premium branding
const mockHotels: HotelRecommendation[] = [
  {
    hotel_name: "Swissôtel Makkah",
    arabic_name: "سويس أوتيل مكة المكرمة",
    city: "Makkah",
    distance_to_haram: "200m",
    rating: 4.8,
    star_rating: "5",
    halal_certified: true,
    simulated_price: {
      source: "halalbooking.com",
      per_night: 450,
      currency: "EUR"
    },
    commission_link: "https://www.halalbooking.com/hotel/swissotel-makkah",
    umrah_features: {
      halal_certified: true,
      distance_to_haram: "200m",
      prayer_facilities: true,
      shuttle_service: true
    }
  },
  {
    hotel_name: "Hilton Suites Makkah",
    arabic_name: "أجنحة هيلتون مكة",
    city: "Makkah", 
    distance_to_haram: "350m",
    rating: 4.7,
    star_rating: "5",
    halal_certified: true,
    simulated_price: {
      source: "booking.com",
      per_night: 380,
      currency: "EUR"
    },
    commission_link: "https://www.booking.com/hotel/sa/hilton-suites-makkah.html",
    umrah_features: {
      halal_certified: true,
      distance_to_haram: "350m", 
      prayer_facilities: true,
      shuttle_service: true
    }
  },
  {
    hotel_name: "Raffles Makkah Palace",
    arabic_name: "قصر رافلز مكة",
    city: "Makkah",
    distance_to_haram: "180m",
    rating: 4.9,
    star_rating: "5",
    halal_certified: true,
    simulated_price: {
      source: "halalbooking.com", 
      per_night: 650,
      currency: "EUR"
    },
    commission_link: "https://www.halalbooking.com/hotel/raffles-makkah-palace",
    umrah_features: {
      halal_certified: true,
      distance_to_haram: "180m",
      prayer_facilities: true,
      shuttle_service: true
    }
  },
  {
    hotel_name: "Dar Al Eiman Royal Hotel",
    arabic_name: "دار الإيمان الملكي",
    city: "Makkah",
    distance_to_haram: "300m",
    rating: 4.6,
    star_rating: "5",
    halal_certified: true,
    simulated_price: {
      source: "booking.com",
      per_night: 320,
      currency: "EUR"
    },
    commission_link: "https://www.booking.com/hotel/sa/dar-al-eiman-royal.html",
    umrah_features: {
      halal_certified: true,
      distance_to_haram: "300m",
      prayer_facilities: true,
      shuttle_service: true
    }
  },
  {
    hotel_name: "Mövenpick Hotel Hajar Tower",
    arabic_name: "موفنبيك برج هاجر",
    city: "Makkah",
    distance_to_haram: "250m",
    rating: 4.5,
    star_rating: "5", 
    halal_certified: true,
    simulated_price: {
      source: "halalbooking.com",
      per_night: 420,
      currency: "EUR"
    },
    commission_link: "https://www.halalbooking.com/hotel/movenpick-hajar-tower",
    umrah_features: {
      halal_certified: true,
      distance_to_haram: "250m",
      prayer_facilities: true,
      shuttle_service: true
    }
  }
]

export async function POST(request: NextRequest) {
  try {
    const body: RecommendationRequest = await request.json()
    
    // Filter hotels based on request
    let filteredHotels = mockHotels.filter(hotel => 
      hotel.city.toLowerCase() === body.city.toLowerCase()
    )
    
    // Filter by halal requirement
    if (body.halal_required) {
      filteredHotels = filteredHotels.filter(hotel => hotel.halal_certified)
    }
    
    // Filter by budget category 
    if (body.budget_category) {
      filteredHotels = filteredHotels.filter(hotel => {
        const price = hotel.simulated_price?.per_night || 0
        switch (body.budget_category) {
          case "Budget":
            return price <= 150
          case "Mid-Range": 
            return price > 150 && price <= 300
          case "Premium":
            return price > 300 && price <= 500
          case "Luxury":
            return price > 500 && price <= 700
          case "Ultra-Luxury":
            return price > 700
          default:
            return true
        }
      })
    }
    
    // If no Ultra-Luxury hotels found, show all luxury hotels
    if (filteredHotels.length === 0 && body.budget_category === "Ultra-Luxury") {
      filteredHotels = mockHotels.filter(hotel => 
        hotel.city.toLowerCase() === body.city.toLowerCase() &&
        (!body.halal_required || hotel.halal_certified)
      )
    }
    
    return NextResponse.json(filteredHotels)
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

export async function GET() {
  // Return sample data for GET requests
  return NextResponse.json(mockHotels.slice(0, 3))
}