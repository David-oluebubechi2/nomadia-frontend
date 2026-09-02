import { api } from "./api";

export type BookingStatus = "Confirmed" | "Upcoming" | "Completed" | "Cancelled";

export type Booking = {
  id: string;
  reference: string;
  destination: string;
  country: string;
  hotel: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  price: number;
  status: BookingStatus;
  image: string;
  category?: string;
  itemId?: string;
  created?: string;
  updatedAt?: string;
};

export type BookingDetail = Booking & {
  traveller: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  payment: {
    method: string;
    last4: string;
    total: number;
    status: "Paid" | "Pending" | "Refunded";
  };
};

export type CreateBookingInput = {
  destination: string;
  country: string;
  hotel: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  price: number;
  image?: string;
  category?: string;
  itemId?: string;
  traveller: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  payment: {
    method: string;
    last4: string;
    total: number;
  };
};

export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  return api<Booking>("/bookings", { method: "POST", body: input, auth: true });
}

export async function fetchBookings(): Promise<Booking[]> {
  return api<Booking[]>("/bookings", { auth: true });
}

export async function fetchBooking(id: string): Promise<BookingDetail> {
  const raw = await api<Record<string, unknown>>(`/bookings/${id}`, { auth: true });
  return mapBookingDetail(raw);
}

export async function fetchAllBookings(): Promise<BookingDetail[]> {
  const raw = await api<Record<string, unknown>[]>("/bookings", { auth: true });
  return raw.map(mapBookingDetail);
}

export async function cancelBooking(id: string): Promise<Booking> {
  return api<Booking>(`/bookings/${id}`, { method: "DELETE", auth: true });
}

export async function updateBooking(
  id: string,
  data: Partial<{
    destination: string;
    country: string;
    hotel: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    nights: number;
    price: number;
  }>,
): Promise<Booking> {
  return api<Booking>(`/bookings/${id}`, { method: "PATCH", body: data, auth: true });
}

function mapBookingDetail(raw: Record<string, unknown>): BookingDetail {
  return {
    id: String(raw.id),
    reference: String(raw.reference ?? ""),
    destination: String(raw.destination ?? ""),
    country: String(raw.country ?? ""),
    hotel: String(raw.hotel ?? ""),
    checkIn: String(raw.checkIn ?? ""),
    checkOut: String(raw.checkOut ?? ""),
    guests: Number(raw.guests ?? 1),
    nights: Number(raw.nights ?? 1),
    price: Number(raw.price ?? 0),
    status: (raw.status as BookingStatus) ?? "Confirmed",
    image: String(raw.image ?? ""),
    category: raw.category ? String(raw.category) : undefined,
    itemId: raw.itemId ? String(raw.itemId) : undefined,
    created: raw.created ? String(raw.created) : undefined,
    updatedAt: raw.updatedAt ? String(raw.updatedAt) : undefined,
    traveller: {
      firstName: String(raw.travellerFirstName ?? ""),
      lastName: String(raw.travellerLastName ?? ""),
      email: String(raw.travellerEmail ?? ""),
      phone: String(raw.travellerPhone ?? ""),
    },
    payment: {
      method: String(raw.paymentMethod ?? "Card"),
      last4: String(raw.paymentLast4 ?? ""),
      total: Number(raw.paymentTotal ?? 0),
      status: (raw.paymentStatus as "Paid" | "Pending" | "Refunded") ?? "Paid",
    },
  };
}
