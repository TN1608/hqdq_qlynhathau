"use client";

import { useState } from "react";
import { Factory, Eye, EyeOff, User, Lock } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { motion } from "framer-motion";
import WebConfig from "@/app/config/WebConfig";
import api from "@/app/config/axiosConfig/AxiosConfig";
import CryptoJS from "crypto-js";

export default function Login() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      if (!employeeId || !password) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }
      const hashedPassword = CryptoJS.MD5(password).toString();
      const requestData = {
        username: employeeId,
        password: hashedPassword,
        machine_id: "device-xyz",
      };
      const response = await api.post("/api/User/Login", requestData);
      const responseData = response.data as { token?: string };
      console.log("Đăng nhập thành công:", responseData);
      alert("Đăng nhập thành công!");
      if (responseData.token) {
        localStorage.setItem("token", responseData.token);
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!");
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left side - System Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#00428C] relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center p-10"
        >
          <div className="relative w-full max-w-2xl">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white mb-8"
            >
              <h1 className="text-4xl font-bold mb-4">
                Hệ thống quản lý nhà máy
              </h1>
              <p className="text-xl opacity-90">
                Giải pháp toàn diện cho việc quản lý sản xuất và vận hành
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative z-10"
            >
              <img
                src={WebConfig.getImageHr}
                alt="Hệ thống quản lý nhà máy"
                className="rounded-lg shadow-2xl w-[200%] h-[300%] "
              />
            </motion.div>

            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-10 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="backdrop-blur-md bg-white shadow-2xl border-0 overflow-hidden">
            <div className="absolute inset-0 z-0" />

            <CardHeader className="relative z-10 space-y-1 pb-6">
              <motion.div
                className="flex justify-center mb-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="w-20 h-20 rounded-full bg-[#00428C] flex items-center justify-center shadow-lg">
                  <Factory className="h-10 w-10 text-white" />
                </div>
              </motion.div>
              <CardTitle className="text-3xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00428C] to-[#2672c8]">
                Đăng nhập
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-base">
                Nhập thông tin đăng nhập của bạn để truy cập hệ thống
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 space-y-5 px-6">
              <motion.div
                className="space-y-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <Label
                  htmlFor="employeeId"
                  className="text-gray-700 font-medium"
                >
                  Mã nhân viên
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <User size={18} />
                  </div>
                  <Input
                    id="employeeId"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="Nhập mã nhân viên của bạn"
                    className="h-12 pl-10 pr-4 bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all rounded-lg"
                  />
                </div>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 font-medium"
                  >
                    Mật khẩu
                  </Label>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm text-blue-600 hover:text-blue-800"
                  >
                    Quên mật khẩu?
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <Lock size={18} />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu của bạn"
                    className="h-12 pl-10 pr-12 bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-2 pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Checkbox
                  id="rememberMe"
                  className="text-blue-600 border-gray-400 rounded"
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-sm font-normal text-gray-600"
                >
                  Ghi nhớ đăng nhập
                </Label>
              </motion.div>
            </CardContent>

            <CardFooter className="relative z-10 px-6 pb-8">
              <motion.div
                className="w-full"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleLogin}
                  className="w-full h-12 text-base font-medium bg-[#00428C] hover:bg-[#2672c8] text-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-blue-500/25"
                >
                  Đăng nhập
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
