import { Link } from "react-router-dom"
import RequestButton from "./RequestButton"
import { useState } from "react";

const Friend = ({request, handleDelete, setFunc}) => {
	return (
		<div className="flex w-full bg-mainShade rounded-md p-4 gap-x-4">
			<Link to={""}>
				<img 
					src="" 
					alt=""
					className="h-24 w-24 bg-white"
				/>
			</Link>
			<div className="flex-1 flex justify-between items-start">
				<div className="display flex flex-col gap-y-1">
					<Link to={""} className="underline text-xl hover:text-orange font-large">{request.user.firstName + " " + request.user.lastName}</Link>
					<span className="font-medium opacity-75">{request.user.email}</span>
				</div>
				<div className=" h-full flex flex-col justify-between items-end">
					<RequestButton
						name={"Add to collaboration"}
						src={"/icons/plus-solid.svg"}
						alt={"Add to colaboration icon"}
						onClick={()=> {
							handleDelete(request._id, setFunc);
						}}
					/>
					<RequestButton
						name={"Remove"}
						src={"/icons/plus-solid.svg"}
						alt={"Remove friend icon"}
						onClick={()=> {
							handleDelete(request._id, setFunc);
						}}
						rotate={true}
					/>
				</div>
			</div>
		</div>
	)
}

const FriendFilter = ({friendFilter, setFriendFilter}) => {
	return(
		<div className="bg-main rounded-md text-white p-4">
			<input
				type="text"
				className="bg-mainShade p-2 rounded-md outline-0 flex-1 w-full"
				placeholder="Filter friends by name or email address"
				value={friendFilter}
				onChange={(e) => {
					setFriendFilter(e.target.value);
				}}
			/>
		</div>
	);
}

const FriendList = ({friends, handleDelete, setFunc}) => {
	
	const [friendFilter, setFriendFilter] = useState("");
	
	const filterFriend = (friend, text) => {
		const fullName = friend.firstName.toLowerCase() + " " + friend.lastName.toLowerCase();
		const filterText = text.toLowerCase();
		const email = friend.email.toLowerCase();
		return fullName.includes(filterText) || email.includes(filterText);
	}

	return (
		<div className="flex flex-1 flex-col gap-y-4">
			<FriendFilter
				friendFilter={friendFilter}
				setFriendFilter={setFriendFilter}
			/>
			<div className="relative flex-1 p-4 grid grid-cols-2 auto-rows-max gap-4 bg-main rounded-md text-white flex-wrap">
				{
					friends.filter(({user}) => filterFriend(user,friendFilter)).map((friend) => <Friend request={friend} handleDelete={handleDelete} setFunc={setFunc}/>)
				}
			</div>
		</div>
	)
}

export default FriendList