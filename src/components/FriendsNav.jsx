import ImageLink from "./ImageLink"
import usePathname from "../utils/usePathname";

const FriendsNav = () => {

	const location = usePathname();

	return (
		<div className="flex flex-col h-full text-white gap-y-4 px-4 py-4 bg-main rounded-md font-medium text-xl ">
			<ImageLink 
                className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-mainShade " + (location === "friends" ? "bg-mainShade opacity-100 filter-svg text-orange" : " ")}
                imageUrl={"/icons/people-group-solid.svg" }
                imageAlt={"Home link icon"}
                imageSize={"6"}
                linkText={"Friend List"}
                to={"/friends"}
            />
			<ImageLink 
                className={"svg hover:text-orange rounded-md px-4 py-4 flex gap-x-8 w-full justify-between items-center hover:bg-mainShade " + (location === "friends/friendRequests" ? "bg-mainShade opacity-100 filter-svg text-orange" : " ")}
                imageUrl={"/icons/user-plus-solid.svg" }
                imageAlt={"Home link icon"}
                imageSize={"6"}
                linkText={"Friend Requests"}
                to={"/friends/friendRequests"}
            />
		</div>
	)
}

export default FriendsNav