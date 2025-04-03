import axios from "axios";
import ErrorToast from "@/app/components/ui/ErrorToast";

type Environment = "development" | "production";

// Lấy URL từ biến môi trường
const ENV: Record<Environment, { BASE_URL: string; TIMEOUT: number }> = {
  development: {
    BASE_URL:
      process.env.NEXT_PUBLIC_BASE_API_DEV ||
      "http://14.241.235.252:8585/tvs_api",
    TIMEOUT: 30000,
  },
  production: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_API_PROD || "",
    TIMEOUT: 30000,
  },
};

const config = ENV[process.env.NODE_ENV as Environment] || ENV.development;

// ✅ Tạo instance axios
const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
  timeout: config.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 🚀 Interceptor Request: Gắn Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🎯 Xử lý lỗi chung
const handleError = (error: any) => {
  const { response } = error;
  if (response) {
    const { status, data } = response;
    const messages: Record<number, { message: string; desc: string }> = {
      400: {
        message: "Lỗi dữ liệu",
        desc: data?.message || "Dữ liệu không hợp lệ",
      },
      401: {
        message: "Phiên đăng nhập hết hạn",
        desc: "Vui lòng đăng nhập lại",
      },
      403: {
        message: "Không có quyền truy cập",
        desc: data?.message || "Bạn không có quyền truy cập",
      },
      404: {
        message: "Không tìm thấy",
        desc: data?.message || "Tài nguyên không tồn tại",
      },
      500: {
        message: "Lỗi hệ thống",
        desc: data?.message || "Đã có lỗi xảy ra",
      },
    };

    if (messages[status]) {
      return {
        status,
        noti: (
          <ErrorToast
            message={messages[status].message}
            desc={messages[status].desc}
          />
        ),
      };
    }
  } else {
    return {
      status: "network_error",
      noti: (
        <ErrorToast
          message="Lỗi kết nối"
          desc="Vui lòng kiểm tra lại kết nối mạng"
        />
      ),
    };
  }
  return Promise.reject(error);
};

// 🚀 Interceptor Response: Xử lý lỗi
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleError(error)
);

// ✅ API Methods (chỉ cần truyền endpoint)
const api = {
  get: (endpoint: string, config = {}) => axiosInstance.get(endpoint, config),
  post: (endpoint: string, data?: any, config = {}) =>
    axiosInstance.post(endpoint, data, config),
  put: (endpoint: string, data?: any, config = {}) =>
    axiosInstance.put(endpoint, data, config),
  delete: (endpoint: string, config = {}) =>
    axiosInstance.delete(endpoint, config),
  patch: (endpoint: string, data?: any, config = {}) =>
    axiosInstance.patch(endpoint, data, config),
};

// ✅ Cách sử dụng:
// import api from './api/axiosConfig';
// const fetchData = async () => {
//     try {
//       const response = await api.post('/api/Dso/exec', { param1: "value" });
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     }
// };

export default api;
