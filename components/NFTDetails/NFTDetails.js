import { GrTextAlignLeft } from "react-icons/gr";
import { BsFillBookmarkFill } from "react-icons/bs";
import Dropdown from "./Dropdown";

const style = {
	wrapper: `flex flex-col divide-y rounded-lg overflow-hidden border dark:divide-black dark:border-black`,
	icon: `h-5 w-5 text-gray-600`,
};

const NFTDetails = ({ attributes }) => {
	const dropdownData = [
		{
			title: "Description",
			icon: <GrTextAlignLeft className={style.icon} />,
			if(attributes) {
				content: attributes[0]["value"];
			},
		},
		{
			title: "Properties",
			icon: <BsFillBookmarkFill className={style.icon} />,
			if(attributes) {
				content: attributes[1]["value"];
			},
		},
	];

	return (
		<div className={style.wrapper}>
			{dropdownData.map((item, index) => (
				<Dropdown
					key={index}
					title={item.title}
					icon={item.icon}
					content={item.content}
				/>
			))}
		</div>
	);
};

export default NFTDetails;
