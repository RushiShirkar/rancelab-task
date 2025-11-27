// Common Types
export interface FooterLink {
  title: string
  href: string
  className?: string
  icon: JSX.Element
}

// Restaurant Management Types
export interface Restaurant {
  id: string
  name: string
  location: string
  slug: string
  ownerId: string
  createdAt: Date
  categories?: Category[]
  dishes?: Dish[]
}

export interface Category {
  id: string
  name: string
  restaurantId?: string
  createdAt?: Date
}

export interface Dish {
  id: string
  name: string
  description: string | null
  imageUrl: string | null
  spiceLevel?: number | null
  categories?: Category[]
  categoryIds?: string[]
  restaurantId?: string
  createdAt?: Date
}

// Customer Menu Types
export type CategoryType = "recommended" | "starter" | "desserts" | "main-course" | "drinks"

export interface MenuCategory {
  id: string
  name: string
  type: CategoryType
}

export type SpiceLevel = "None" | "Mild" | "Medium" | "Hot" | "Extra Hot"

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string | null
  isVegetarian: boolean
  spiceLevel?: SpiceLevel
  categoryIds: string[]
}

export interface CategoryGroup {
  type: CategoryType
  label: string
  categories: MenuCategory[]
}

// Form Types
export interface DishFormData {
  name: string
  description: string
  image: string
  spiceLevel: string
  categoryIds: string[]
}

export interface FormErrors {
  [key: string]: string
}

// Utility Types
export type Nullable<T> = T | null
export type Optional<T> = T | undefined

export type SignupField = "email" | "fullName" | "country";
export type FieldErrors = Partial<Record<SignupField, string>>;
export type SignupStep = "details" | "verification";