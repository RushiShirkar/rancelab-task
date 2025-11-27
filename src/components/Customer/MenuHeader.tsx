interface MenuHeaderProps {
    restaurantName: string
    restaurantLocation: string
}

const MenuHeader = ({
    restaurantName,
    restaurantLocation,
}: MenuHeaderProps) => {
    return (
        <div className="sticky top-0 z-40 shadow-md bg-white">
            {/* Restaurant Info */}
            <div className="px-4 py-3 border-b border-gray-400 shadow-md">
                <h1 className="text-xl font-bold text-gray-800">
                    {restaurantName}{" "}
                    <span className="text-sm font-normal text-gray-700">
                        {restaurantLocation}
                    </span>
                </h1>
            </div>
        </div>
    )
}

export default MenuHeader;