import { Menu } from "lucide-react"

interface FloatingMenuButtonProps {
    onClick: () => void
}

const FloatingMenuButton = ({ onClick }: FloatingMenuButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-50 bg-[#e91e63] hover:bg-[#c2185b] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-medium transition-colors"
            aria-label="Open menu navigation"
        >
            <Menu className="w-5 h-5" />
            Menu
        </button>
    )
}

export default FloatingMenuButton;