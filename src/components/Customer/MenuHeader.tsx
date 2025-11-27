interface MenuHeaderProps {
    restaurantName: string
    restaurantLocation: string
    currentCategory: string
    currentCategoryType: string
}

const MenuHeader = ({
    restaurantName,
    restaurantLocation,
    currentCategory,
    currentCategoryType,
}: MenuHeaderProps) => {
    return (
        <div className="sticky top-0 z-40 shadow-md">
            {/* Restaurant Info */}
            <div className="px-4 py-3 border-b border-gray-400 shadow-md">
                <h1 className="text-xl font-bold text-gray-800">
                    {restaurantName}{" "}
                    <span className="text-sm font-normal text-gray-700">
                        {restaurantLocation}
                    </span>
                </h1>
            </div>

            {/* Current Category */}
            {currentCategory && (
                <div className="bg-white px-4 py-3">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-gray-800">
                            {currentCategoryType}
                        </h2>
                        {currentCategoryType !== currentCategory && (
                            <>
                                <span className="text-gray-500">•</span>
                                <span className="text-base text-gray-600">
                                    {currentCategory}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MenuHeader;