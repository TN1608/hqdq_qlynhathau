"use client";

import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@/app/components/ui/button";
import {useEffect, useState} from "react";

interface RatingOption {
    label: string;
    image: string;
}

interface SingleQuestionUIProps {
    question: string;
    ratingOptions: RatingOption[];
}

export const SingleQuestionUI = ({
                                     question,
                                     ratingOptions,
                                 }: SingleQuestionUIProps) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [hoverValue, setHoverValue] = useState<string | null>(null);
    const [result, setResult] = useState(false)
    ;
    const handleSelect = (value: string) => {
        setSelectedValue(value);
    };

    const handleSubmit = () => {
        if (selectedValue) {
            setShowConfirmation(false);
            setResult(true)
        }
    };
    useEffect(() => {
        if (result) {
            const timer = setTimeout(() => {
                setResult(false);
                window.location.reload();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [result]);

    const handleClose = () => {
        setResult(false);
        window.location.reload();
    }
    return (
        <div className="w-full h-fit bg-white rounded-lg mx-auto p-4">
            <AnimatePresence>
                {showConfirmation && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <div className="bg-white p-6 rounded-lg max-w-md w-full">
                            <h3 className="text-lg font-bold text-center mb-4">Xác nhận gửi đánh giá</h3>
                            <p className="mb-6 text-center">Bạn có chắc chắn muốn gửi đánh giá này không?</p>
                            <div className="flex justify-center space-x-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowConfirmation(false)}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    className="bg-blue-700 text-white"
                                >
                                    Xác nhận
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {result && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg max-w-sm w-full shadow-lg">
                        <p className="mb-4 text-center text-xl text-green-600 font-bold">
                            Cảm ơn bạn đã gửi đánh giá!
                        </p>
                        <div className="flex justify-center mt-4">
                            <Button
                                variant="outline"
                                onClick={handleClose}
                                className="px-4 py-2 text-sm"
                            >
                                Đóng
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-center text-blue-800 tracking-tight">
                    {question}
                </h3>

                <div className="flex flex-wrap justify-center gap-4 px-6">
                    {ratingOptions.map((option) => {
                        const isSelected = selectedValue === option.label;
                        const isHovered = hoverValue === option.label;

                        return (
                            <button
                                key={option.label}
                                onClick={() => handleSelect(option.label)}
                                onMouseEnter={() => setHoverValue(option.label)}
                                onMouseLeave={() => setHoverValue(null)}
                                className={`
                                      flex flex-col items-center p-2 rounded-2xl w-40
                                      transform transition-all duration-300 ease-in-out
                                      ${
                                    isSelected
                                        ? "bg-blue-800 shadow-lg scale-105"
                                        : "bg-white shadow-md hover:shadow-xl border hover:scale-105"
                                }
                  ${isHovered && !isSelected ? "bg-gray-50" : ""}
                `}
                            >
                                <div className="relative">
                                    <img
                                        src={option.image}
                                        alt={option.label}
                                        className={`
                      w-20 h-20 object-contain transition-transform duration-200
                      ${isSelected ? "scale-110" : ""}
                      ${isHovered ? "scale-105" : ""}
                    `}
                                    />
                                    {isSelected && (
                                        <div
                                            className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow">
                                            <svg className="w-3 h-3 text-green-600" fill="currentColor"
                                                 viewBox="0 0 20 20">
                                                <path
                                                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"/>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <span
                                    className={`
                    mt-2 text-base font-medium text-center transition-colors duration-200
                    ${isSelected ? "text-white" : "text-gray-700"}
                    ${isHovered && !isSelected ? "text-gray-900" : ""}
                  `}
                                >
                  {option.label}
                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="flex justify-center">
                    <Button
                        onClick={() => selectedValue && setShowConfirmation(true)}
                        disabled={!selectedValue}
                        className="rounded-full bg-blue-500 text-white px-8 py-2 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
                    >
                        Xác nhận
                    </Button>
                </div>
            </div>
        </div>
    );
};