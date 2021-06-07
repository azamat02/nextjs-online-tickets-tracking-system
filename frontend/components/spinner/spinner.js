export default function Spinner({height=24, width=24}) {
    return (
        <div className="flex items-center justify-center">
            <div>
                <div className={`w-${width} h-${height} loader ease-linear rounded-full border-8 border-t-8 border-gray-200`}></div>
                <h1 className="text-center mt-5 font-bold">
                    Загрузка...
                </h1>
            </div>
        </div>
    )
}