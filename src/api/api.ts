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