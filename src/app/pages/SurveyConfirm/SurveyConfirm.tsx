"use client"
import {SingleQuestionUI} from "@/app/components/SingleQuestionUI";
import WebConfig, {icons} from "@/app/config/WebConfig";

export default function SurveyConfirm() {
    const ratingOptions = [
        {label: "Rất không hài lòng", image: icons.ratkhonghailong},
        {label: "Không hài lòng", image: icons.khonghailong},
        {label: "Bình thường", image: icons.binhthuong},
        {label: "Hài lòng", image: icons.hailong},
        {label: "Rất hài lòng", image: icons.rathailong},
    ];
    return (
        <main className="h-full px-4 bg-background flex flex-col items-center">
            <div className="relative w-full flex flex-col items-center">
                {/* Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center filter blur-md opacity-80 min-h-full"
                    style={{backgroundImage: `url(${WebConfig.getBackground})`}}
                ></div>
                <div className="relative flex flex-col items-center w-full">
                    <h1 className="text-2xl font-semibold text-black mb-2 bg-gray-100 filter opacity-90 px-6 py-1 rounded-full text-center">
                        Khảo sát chất lượng và dịch vụ nhà ăn
                    </h1>
                    <SingleQuestionUI
                        question="Bạn có hài lòng khi sử dụng dịch vụ cung cấp suất ăn tại nhà ăn không?"
                        ratingOptions={ratingOptions}
                    />
                </div>
            </div>
        </main>
    );
}