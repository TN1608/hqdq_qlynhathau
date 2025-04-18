"use client";

import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {LucideCheck} from "lucide-react";
import {RatingQuestion} from "@/app/components/rating-question";
import {TextQuestion} from "@/app/components/text-question";
import {Button} from "./ui/button";
import api from "@/app/config/axiosConfig/AxiosConfig";
import {useForm} from "react-hook-form";

export function ReviewForm({setResult}: any) {
    type QuestionType = {
        id: number;
        type: "rating" | "text";
        question: string;
        options?: {
            left?: string;
            right?: string;
            values?: string[];
        };
    };
    // const fields = [
    //   "INSERT",
    //   "partnerPK",
    //   "partnerId",
    //   "partnerName",
    //   "address",
    //   "description",
    //   "activeYN",
    // ];

    // const postData = async (values: any) => {
    //   const formattedData = [transformDataToSeparatorFormat(values, fields)];
    //   console.log("Formatted Data: ", formattedData);
    //   const body = {
    //     tsFunction: "sstv_hr_sel_grd_ntbs00300_1",
    //     tsProcedure: "STV_HR_UPD_GRD_NTBS00300_0",
    //     tsAction: "INSERT",
    //     tsParameter: "",
    //     tsInParameter:
    //         "p_action|!p_partner_pk|!P_partner_id|!p_partner_nm|!p_address|!p_destination|!p_active_yn",
    //     tsOutParameter: "p_rtn_value",
    //     tsDsoType: "control",
    //     tsObjCurno: 1,
    //     tsDsoId: "buspartner",
    //     tsRows: formattedData,
    //   };
    //
    //   try {
    //     const response = await api.post("/", body);
    //     console.log(response);
    //     console.log("response: " + JSON.stringify(response));
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // const form = useForm({
    //   defaultValues: {
    //     INSERT: "INSERT",
    //     partnerPK: "",
    //     partnerId: "",
    //     partnerName: "",
    //     address: "",
    //     description: "",
    //     activeYN: "Y",
    //   },
    // });


    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, any>>({});
    const [error, setError] = useState("");
    const [completed, setCompleted] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [question, setQuestion] = useState([]);
    const [icons, setIcons] = useState([]);

    const base64decode = (str: string) => {
        // @ts-ignore
        setIcons((prev) => [...prev, str]);
        return Buffer.from(str, "base64").toString("utf-8");
    }

    const field = [
        "INSERT",
        "GROUP_TYPE",
        "RESULT_TYPE",
        "DESCRIPTION",
    ]
    const body = {
        tsFunction: "sstv_hr_sel_grd_ntbs00300_1",
        tsProcedure: "STV_HR_UPD_GRD_NTBS00300_0",
        tsAction: "INSERT",
        tsParameter: "",
        tsInParameter:
           "",
        tsOutParameter: "p_rtn_value",
        tsDsoType: "control",
        tsObjCurno: 1,
        tsDsoId: "buspartner",
        tsRows: field,
    }


    const questions: QuestionType[] = [
        {
            id: 1,
            type: "rating",
            question:
                "Câu hỏi 1: Anh/Chị có hài lòng với định lượng suất ăn của nhà hàng không?",
            options: {
                values: [
                    "4 - Không hài lòng",
                    "3 - Bình thường",
                    "2 - Hài lòng",
                    "1 - Rất hài lòng",
                ],
                left: "KHÔNG Phong phú",
                right: "RẤT Phong phú",
            },
        },
        {
            id: 2,
            type: "rating",
            question:
                "Câu hỏi 2: Anh/Chị có cảm giác ngon miệng khi thưởng thức món ăn không?",
            options: {
                values: [
                    "4 - Không hài lòng",
                    "3 - Bình thường",
                    "2 - Hài lòng",
                    "1 - Rất hài lòng",
                ],
                left: "KHÔNG Hài lòng",
                right: "RẤT Hài lòng",
            },
        },
        {
            id: 3,
            type: "rating",
            question:
                "Câu hỏi 3: Anh/Chị có hài lòng với dụng cụ phục vụ suất ăn có đảm bảo vệ sinh không?",
            options: {
                values: [
                    "4 - Không hài lòng",
                    "3 - Bình thường",
                    "2 - Hài lòng",
                    "1 - RẤT hài lòng",
                ],
                left: "RẤT KHÔNG Hài lòng",
                right: "RẤT Hài lòng",
            },
        },
        {
            id: 4,
            type: "rating",
            question:
                "Câu hỏi 4: Khi thưởng thức món ăn, Anh/Chị có hài lòng với thái độ phục vụ của nhân viên nhà thầu không?",
            options: {
                values: [
                    "4 - Không hài lòng",
                    "3 - Bình thường",
                    "2 - Hài lòng",
                    "1 - Rất hài lòng",
                ],
                left: "RẤT KHÔNG Hài lòng",
                right: "RẤT Hài lòng",
            },
        },
        {
            id: 5,
            type: "rating",
            question:
                "Câu hỏi 5: Anh/Chị có hài lòng với điều kiện vệ sinh/ thiết bị phục vụ ở nhà ăn không?",
            options: {
                values: [
                    "4 - Không hài lòng",
                    "3 - Bình thường",
                    "2 - Hài lòng",
                    "1 - Rất hài lòng",
                ],
                left: "RẤT KHÔNG Hài lòng",
                right: "RẤT Hài lòng",
            },
        },
        {
            id: 6,
            type: "rating",
            question:
                "Câu hỏi 6: Thực đơn, vị món ăn và thái độ phục vụ của Nhà Thầu trong ngày có khiến Anh/Chị hài lòng không?",
            options: {
                values: [
                    "4 - Không hài lòng",
                    "3 - Bình thường",
                    "2 - Hài lòng",
                    "1 - Rất hài lòng",
                ],
                left: "KHÔNG Hài lòng",
                right: "RẤT Hài lòng",
            },
        },
        {
            id: 7,
            type: "text",
            question:
                "Câu hỏi 7: Anh/Chị có muốn Nhà thầu thay đổi thực đơn, cách chế biến món ăn, đề xuất món ăn nào không?",
        },
    ];

    const totalSteps = questions.length;

    const handleNext = () => {
        if (
            questions[currentStep].type === "rating" &&
            !answers[questions[currentStep].id]
        ) {
            setError("Vui lòng chọn một câu trả lời trước khi tiếp tục.");
            return;
        }
        setError("");
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowConfirmation(true);
        }
    };

    const handlePrevious = () => {
        setError("");
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleAnswer = (value: any) => {
        setAnswers({...answers, [questions[currentStep].id]: value});
    };

    const handleConfirm = () => {
        setShowConfirmation(false);
        setCompleted(true);
        // Send answers to the server

        api.post("/api/review", answers).then((response: any) => {
            // response
            if (response.status === 200) {
                console.log("Đánh giá đã được gửi thành công!");
                setResult(<></>);
            } else {
                console.log(response);

                setResult(response.noti);
            }
        });
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    const handleClose = () => {
        // Add any cleanup or redirect logic here
        console.log("Form closed");
    };

    return (
        <div className="max-w-[100rem] mx-auto p-6 bg-white rounded-xl shadow-lg">
            {showConfirmation && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-lg font-bold mb-4">Xác nhận gửi đánh giá</h3>
                        <p className="mb-6">
                            Bạn có chắc chắn muốn gửi đánh giá này không?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <Button onClick={handleCancel}>Hủy</Button>
                            <Button
                                onClick={handleConfirm}
                                className="bg-gradient-to-bl from-indigo-500 to-purple-600 text-white"
                            >
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}

            {completed ? (
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.5}}
                    className="bg-green-100 p-8 rounded-lg text-center"
                >
                    <LucideCheck size={64} className="text-indigo-600 mx-auto mb-4"/>
                    <h2 className="text-2xl font-bold text-indigo-800 mb-2">
                        Cảm ơn bạn đã hoàn thành khảo sát!
                    </h2>
                    <p className="text-gray-700">
                        Phản hồi của bạn rất quan trọng để chúng tôi cải thiện dịch vụ.
                    </p>
                </motion.div>
            ) : (
                <>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{opacity: 0, x: 50}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: -50}}
                            transition={{duration: 0.4}}
                            className="min-h-[300px] flex flex-col"
                        >
                            {error && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                                    {error}
                                </div>
                            )}

                            <div className="flex-1 p-6 bg-gray-50 rounded-xl">
                                {questions[currentStep].type === "rating" && (
                                    <RatingQuestion
                                        question={questions[currentStep].question}
                                        value={answers[questions[currentStep].id] || null}
                                        onChange={handleAnswer}
                                    />
                                )}
                                {questions[currentStep].type === "text" && (
                                    <TextQuestion
                                        question={questions[currentStep].question}
                                        value={answers[questions[currentStep].id] || ""}
                                        onChange={handleAnswer}
                                    />
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    {/* Progress bar */}
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">
                Câu hỏi {currentStep + 1}/{totalSteps}
              </span>
                            <span className="text-sm font-medium">
                {Math.round(((currentStep + 1) / totalSteps) * 100)}%
              </span>
                        </div>
                    </div>

                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-indigo-500"
                            initial={{width: 0}}
                            animate={{
                                width: `${((currentStep + 1) / totalSteps) * 100}%`,
                            }}
                            transition={{duration: 0.3}}
                        />
                    </div>

                    <div className="flex justify-center mt-8 space-x-4">
                        {completed ? (
                            <Button
                                onClick={handleClose}
                                className="rounded-full bg-gray-500 text-white px-8 py-3"
                            >
                                Đóng
                            </Button>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Button
                                    onClick={handlePrevious}
                                    disabled={currentStep === 0}
                                    className="rounded-full border-2 border-indigo-500 bg-white text-black px-6 disabled:opacity-50
                   hover:border-black hover:bg-gray-200 hover:text-black transition-all"
                                >
                                    Trước đó
                                </Button>

                                <Button
                                    onClick={handleNext}
                                    className="rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-6 hover:bg-indigo-600 transition-all"
                                >
                                    {currentStep === totalSteps - 1 ? "Hoàn thành" : "Tiếp tục"}
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
