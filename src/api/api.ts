const API_URL = "http://127.0.0.1:8000/api";
let refreshPromise: Promise<string | null> | null = null;

function getStorage() {
  if (localStorage.getItem("refresh_token")) {
    return localStorage;
  }

  if (sessionStorage.getItem("refresh_token")) {
    return sessionStorage;
  }

  return null;
}

async function refreshAccessToken(): Promise<string | null> {
  // If another request is already refreshing the token,
  // wait for that same refresh request instead of creating another one.
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    const storage = getStorage();

    if (!storage) {
      return null;
    }

    const refreshToken = storage.getItem("refresh_token");

    if (!refreshToken) {
      return null;
    }

    try {
      const response = await fetch(
        `${API_URL}/auth/login/refresh/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: refreshToken,
          }),
        },
      );

      if (!response.ok) {
        storage.removeItem("access_token");
        storage.removeItem("refresh_token");
        storage.removeItem("user");

        return null;
      }

      const data = await response.json();

      if (!data?.access) {
        return null;
      }

      storage.setItem("access_token", data.access);

      // Store a rotated refresh token too, if Django returns one.
      if (data.refresh) {
        storage.setItem("refresh_token", data.refresh);
      }

      return data.access;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
  retry = true,
): Promise<any> {
  const storage = getStorage();

  const storedAccessToken = storage?.getItem("access_token");

  const requestHeaders = new Headers(options.headers);

  requestHeaders.set("Content-Type", "application/json");

  if (
    storedAccessToken &&
    !requestHeaders.has("Authorization")
  ) {
    requestHeaders.set(
      "Authorization",
      `Bearer ${storedAccessToken}`,
    );
  }

  let response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: requestHeaders,
    },
  );

  // Access token expired.
  if (
    response.status === 401 &&
    retry &&
    !endpoint.includes("/login/refresh/")
  ) {
    const newAccessToken = await refreshAccessToken();

    if (newAccessToken) {
      const retryHeaders = new Headers(options.headers);

      retryHeaders.set(
        "Content-Type",
        "application/json",
      );

      retryHeaders.set(
        "Authorization",
        `Bearer ${newAccessToken}`,
      );

      response = await fetch(
        `${API_URL}${endpoint}`,
        {
          ...options,
          headers: retryHeaders,
        },
      );
    }
  }

  const data = await response
    .json()
    .catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.detail ||
      data?.message ||
      data?.non_field_errors?.[0] ||
      data?.email?.[0] ||
      "Something went wrong",
    );
  }

  return data;
}

export async function login(
  email: string,
  password: string,
) {
  return apiRequest("/auth/login/", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function register(userData: {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}) {
  return apiRequest("/auth/register/", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function requestPasswordReset(email: string) {
  return apiRequest("/auth/password-reset/", {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  });
}

export async function confirmPasswordReset(
  uid: string,
  token: string,
  password: string,
) {
  return apiRequest("/auth/password-reset-confirm/", {
    method: "POST",
    body: JSON.stringify({
      uid,
      token,
      password,
    }),
  });
}

export async function getCurrentUser(accessToken: string) {
  return apiRequest("/auth/me/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  role: string | null;
}

export async function getUsers(accessToken: string): Promise<AdminUser[]> {
  return apiRequest("/auth/users/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export interface AdminDashboardStats {
  total_users: number;
  active_users: number;
  total_services: number;
  active_services: number;
  total_roles: number;
  total_permissions: number;
}

export async function getAdminDashboardStats(
  accessToken: string,
): Promise<AdminDashboardStats> {
  return apiRequest("/auth/dashboard/stats/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export interface Role {
  id: number;
  name: string;
  permissions: string[];
}

export async function getRoles(accessToken: string): Promise<Role[]> {
  return apiRequest("/auth/roles/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function changeUserRole(
  accessToken: string,
  userId: number,
  role: string,
) {
  return apiRequest(`/auth/users/${userId}/role/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      role,
    }),
  });
}

export interface Permission {
  id: number;
  name: string;
  codename: string;
}

export async function getPermissions(
  accessToken: string,
): Promise<Permission[]> {
  return apiRequest("/auth/permissions/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export interface RolePermissions {
  id: number;
  name: string;
  permissions: string[];
}

export async function getRolePermissions(
  accessToken: string,
  roleId: number,
): Promise<RolePermissions> {
  return apiRequest(`/auth/roles/${roleId}/permissions/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function updateRolePermissions(
  accessToken: string,
  roleId: number,
  permissions: string[],
) {
  return apiRequest(`/auth/roles/${roleId}/permissions/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      permissions,
    }),
  });
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export async function getServices(
  accessToken: string,
): Promise<Service[]> {
  return apiRequest("/services/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function getPublicServices(): Promise<Service[]> {
  return apiRequest("/services/", {
    method: "GET",
  });
}

export async function createService(
  accessToken: string,
  service: {
    name: string;
    description: string;
    category: string;
    icon: string;
    is_active: boolean;
    display_order: number;
  },
): Promise<Service> {
  return apiRequest("/services/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(service),
  });
}

export async function updateService(
  accessToken: string,
  serviceId: number,
  service: Partial<{
    name: string;
    description: string;
    category: string;
    icon: string;
    is_active: boolean;
    display_order: number;
  }>,
): Promise<Service> {
  return apiRequest(`/services/${serviceId}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(service),
  });
}

export async function deleteService(
  accessToken: string,
  serviceId: number,
) {
  return apiRequest(`/services/${serviceId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export interface CreateMessageData {
  full_name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

export interface Message {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  created_at: string;
  updated_at: string;
}

export interface CreatedMessage {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  created_at: string;
}

export async function createMessage(
  message: CreateMessageData,
): Promise<CreatedMessage> {
  return apiRequest("/messages/", {
    method: "POST",
    body: JSON.stringify(message),
  });
}

export async function getMessages(
  accessToken: string,
): Promise<Message[]> {
  return apiRequest("/messages/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}


export async function updateMessage(
  accessToken: string,
  messageId: number,
  data: {
    status?: "new" | "read" | "replied" | "archived";
  },
): Promise<Message> {
  return apiRequest(`/messages/${messageId}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
}


export async function deleteMessage(
  accessToken: string,
  messageId: number,
): Promise<void> {
  return apiRequest(`/messages/${messageId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// Content Api
// Home Page Content
export interface HomeStat {
  id: number;
  value: string;
  label: string;
  display_order: number;
  is_active: boolean;
}

export interface HeroSystem {
  id: number;
  code: string;
  label: string;
  detail: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}

export interface HeroImage {
  id: number;
  image_src: string | null;
  alt_text: string;
  display_order: number;
  is_active: boolean;
}

export interface HomeAchievement {
  id: number;
  key: string;
  value: number | null;
  suffix: string;
  display: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}

export interface HomeStatsSection {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  is_active: boolean;
  achievements: HomeAchievement[];
}

export interface HomeTrustedTechnologyFeature {
  id: number;
  feature: string;
  display_order: number;
  is_active: boolean;
}

export interface HomeTrustedTechnology {
  id: number;
  key: string;
  name: string;
  category: string;
  description: string;
  display_order: number;
  is_active: boolean;
  features: HomeTrustedTechnologyFeature[];
}

export interface HomeTrustedSection {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  is_active: boolean;
  technologies: HomeTrustedTechnology[];
}

export interface HomeWhyChooseFeature {
  id: number;
  key: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  display_order: number;
  is_active: boolean;
}

export interface HomeWhyChooseTrustPoint {
  id: number;
  text: string;
  display_order: number;
  is_active: boolean;
}

export interface HomeWhyChooseSection {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  trust_title: string;
  trust_description: string;
  learn_more_text: string;
  learn_more_link: string;
  is_active: boolean;
  features: HomeWhyChooseFeature[];
  trust_points: HomeWhyChooseTrustPoint[];
}

export interface HomeTestimonial {
  id: number;
  name: string;
  designation: string;
  company: string;
  review: string;
  photo_url: string | null;
  rating: number;
  display_order: number;
  is_active: boolean;
}

export interface HomeTestimonialsSection {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  is_active: boolean;
  testimonials: HomeTestimonial[];
}

// =============================================
// Home Page Content
// =============================================

export interface HomeFooterLink {
  id: number;
  group: "company" | "services" | "social";
  label: string;
  url: string;
  display_order: number;
  is_active: boolean;
}

export interface HomeFooterSection {
  id: number;
  brand_name: string;
  description: string;
  company_heading: string;
  services_heading: string;
  contact_heading: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  copyright_text: string;
  is_active: boolean;
  links: HomeFooterLink[];
  created_at: string;
  updated_at: string;
}

export interface HomePageContent {
  id: number;
  hero_title: string;
  hero_description: string;
  hero_primary_button_text: string;
  hero_primary_button_link: string;
  hero_secondary_button_text: string;
  hero_secondary_button_link: string;
  stats: HomeStat[];
  hero_systems: HeroSystem[];
  hero_images: HeroImage[];
  stats_section: HomeStatsSection;
  trusted_section: HomeTrustedSection;
  why_choose_section: HomeWhyChooseSection;
  testimonials_section: HomeTestimonialsSection | null;
  footer_section: HomeFooterSection | null;
  created_at: string;
  updated_at: string;
}

export async function getHomePageContent(): Promise<HomePageContent> {
  return apiRequest("/content/home/", {
    method: "GET",
  });
}


export interface TestimonialSubmissionData {
  name: string;
  designation?: string;
  company?: string;
  review: string;
  rating: number;
  photo?: File | null;
}

export interface TestimonialSubmissionResponse {
  id: number;
  status: "pending";
  detail: string;
}

export async function submitTestimonial(
  testimonial: TestimonialSubmissionData,
): Promise<TestimonialSubmissionResponse> {
  const formData = new FormData();
  formData.append("name", testimonial.name.trim());
  formData.append("designation", testimonial.designation?.trim() ?? "");
  formData.append("company", testimonial.company?.trim() ?? "");
  formData.append("review", testimonial.review.trim());
  formData.append("rating", String(testimonial.rating));

  if (testimonial.photo) {
    formData.append("photo", testimonial.photo);
  }

  // Do not set Content-Type for FormData; the browser adds the boundary.
  const response = await fetch(`${API_URL}/content/testimonials/submit/`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    let message = data?.detail || data?.message;
    if (!message && data && typeof data === "object") {
      message = Object.entries(data)
        .map(([field, value]) => {
          const description = Array.isArray(value)
            ? value.join(" ")
            : String(value);
          return `${field}: ${description}`;
        })
        .join(" ");
    }
    throw new Error(message || "Unable to submit your testimonial. Please try again.");
  }

  return data as TestimonialSubmissionResponse;
}

// ============================================================
// MEETING SCHEDULER
// ============================================================

export interface MeetingPlatform {
  id: number;
  name: string;
  provider: "google_meet" | "microsoft_teams" | "zoom";
  display_order: number;
  is_active: boolean;
}

export interface MeetingSlot {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  notes: string;
  platforms: MeetingPlatform[];
  is_booked: boolean;
}

export interface MeetingAvailability {
  start_date: string;
  end_date: string;
  timezone: string;
  slots: MeetingSlot[];
}

export interface CreateMeetingBookingData {
  slot: number;
  platform: number;
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  topic: string;
}

export interface MeetingBooking {
  id: number;
  slot: number;
  platform: number;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  topic: string;
  meeting_link: string;
  google_event_id: string;
  calendar_event_url: string;
}

export async function getMeetingPlatforms(): Promise<
  MeetingPlatform[]
> {
  return apiRequest("/meetings/platforms/", {
    method: "GET",
  });
}

export async function getMeetingAvailability(
  startDate?: string,
  endDate?: string,
): Promise<MeetingAvailability> {
  const params = new URLSearchParams();

  if (startDate) {
    params.set("start_date", startDate);
  }

  if (endDate) {
    params.set("end_date", endDate);
  }

  const query = params.toString();

  return apiRequest(
    `/meetings/availability/${query ? `?${query}` : ""}`,
    {
      method: "GET",
    },
  );
}

export async function createMeetingBooking(
  booking: CreateMeetingBookingData,
): Promise<MeetingBooking> {
  return apiRequest("/meetings/book/", {
    method: "POST",
    body: JSON.stringify(booking),
  });
}


// ============================================================
// ABOUT HERO CMS
// ============================================================

export interface AboutHeroImage {
  id: number;
  image_src: string | null;
  alt_text: string;
  display_order: number;
  is_active: boolean;
}

export interface AboutHeroContent {
  id: number;
  title_line_one: string;
  title_line_two: string;
  description: string;
  primary_button_text: string;
  primary_button_link: string;
  secondary_button_text: string;
  secondary_button_link: string;
  is_active: boolean;
  images: AboutHeroImage[];
}

export async function getAboutHeroContent(): Promise<AboutHeroContent> {
  return apiRequest("/content/about-hero/", {
    method: "GET",
  });
}

// ============================================================
// ABOUT - OUR STORY CMS
// ============================================================

export interface AboutStoryStat {
  id: number;
  icon: string;
  value: string;
  label: string;
  display_order: number;
  is_active: boolean;
}

export interface AboutStoryContent {
  id: number;
  eyebrow: string;
  title: string;
  paragraph_one: string;
  paragraph_two: string;
  image_src: string | null;
  image_url: string;
  experience_value: string;
  experience_label: string;
  is_active: boolean;
  stats: AboutStoryStat[];
  created_at: string;
  updated_at: string;
}

export async function getAboutStoryContent(): Promise<AboutStoryContent> {
  return apiRequest("/content/about-story/", {
    method: "GET",
  });
}

// ============================================================
// ABOUT - MISSION & VISION CMS
// ============================================================

export interface AboutMissionVisionImageContent {
  id: number;
  image_src: string | null;
  alt_text: string;
  display_order: number;
  is_active: boolean;
}

export interface AboutMissionVisionCardContent {
  id: number;
  kind: "mission" | "vision";
  title: string;
  color: string;
  short_description: string;
  description: string;
  display_order: number;
  is_active: boolean;
  images: AboutMissionVisionImageContent[];
}

export interface AboutMissionVisionContent {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  is_active: boolean;
  cards: AboutMissionVisionCardContent[];
  created_at: string;
  updated_at: string;
}

export async function getAboutMissionVisionContent(): Promise<AboutMissionVisionContent> {
  return apiRequest("/content/about-mission-vision/", {
    method: "GET",
  });
}
