export const InvalidPage = () => {
    return (
        <>
            <div className="max-w-[100rem] mx-auto p-6 bg-white rounded-xl shadow-lg">
                <h2 className={"text-2xl text-center text-red-500 font-bold"}>Khảo sát đánh giá chưa được mở!</h2>
                <p className={"text-lg text-center text-gray-700"}>Vui lòng quay trở lại đúng thời gian mở khảo sát!</p>
            </div>
        </>
    );
};