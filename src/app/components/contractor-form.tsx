"use client";

import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useForm } from "react-hook-form";
import api from "../config/axiosConfig/AxiosConfig";

export function ContractorForm() {
  const form = useForm({
    defaultValues: {
      INSERT: "INSERT",
      partnerPK: 0,
      partnerId: "",
      partnerName: "",
      address: "",
      description: "",
      activeYN: "Y",
    },
  });

  function onSubmit(values: any) {
    console.log(values);
    postData(values);
  }
  const transformDataToSeparatorFormat = (
    data: any,
    fields: string[]
  ): string => {
    return fields
      .map((field) => data[field] ?? "") // Lấy giá trị hoặc chuỗi rỗng nếu không có giá trị
      .filter((value) => value !== null && value !== undefined) // Loại bỏ giá trị null/undefined
      .join("|!"); // Kết hợp các giá trị với "|!" làm dấu phân cách
  };
  const fields = [
    "INSERT",
    "partnerPK",
    "partnerId",
    "partnerName",
    "address",
    "description",
    "activeYN",
  ];

  const postData = async (values: any) => {
    const formattedData = [transformDataToSeparatorFormat(values, fields)];
    console.log("Formatted Data: ", formattedData);
    const body = {
      tsFunction: "sstv_hr_sel_grd_ntbs00300_1",
      tsProcedure: "STV_HR_UPD_GRD_NTBS00300_0",
      tsAction: "INSERT",
      tsParameter: "",
      tsInParameter:
        "p_action|!p_partner_pk|!P_partner_id|!p_partner_nm|!p_address|!p_destination|!p_active_yn",
      tsOutParameter: "p_rtn_value",
      tsDsoType: "control",
      tsObjCurno: 1,
      tsDsoId: "buspartner",
      tsRows: formattedData,
    };

    try {
      const response = await api.post("/api/Dso/exec", body);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const body = {
    tsProcedure: "stv_hr_sel_grd_ntbs00300_1",
    tsAction: "SELECT",
    tsParameter: "",
    tsInParameter: "",
    tsOutParameter: "p_rtn_value",
    tsDsoType: "gird",
    tsObjCurno: 1,
    tsDsoId: "buspartner",
  };

  const fetchData = async () => {
    try {
      const response = await api.post("/api/Dso/exec", body);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section: Partner Information */}
          <div className="rounded-md overflow-hidden">
            <div className="bg-blue-800 text-white p-3 font-medium">
              THÔNG TIN ĐỐI TÁC
            </div>
            <div className="border border-gray-200 p-4 space-y-4">
              <FormField
                control={form.control}
                name="partnerPK"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Mã đối tác <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập mã đối tác" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="partnerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Mã đối tác <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên đối tác" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="partnerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Tên đầy đủ đối tác
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên đầy đủ đối tác" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Địa chỉ <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập địa chỉ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="activeYN"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Trạng thái hoạt động{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <select
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full border rounded-md p-2"
                      >
                        <option value="Y">Hoạt động</option>
                        <option value="N">Không hoạt động</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Mô tả</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập mô tả" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button type="submit" className="bg-blue-800 hover:bg-blue-900">
              <span className="text-white">Gửi thông tin</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
