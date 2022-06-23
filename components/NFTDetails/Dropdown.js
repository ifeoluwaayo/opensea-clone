import { Disclosure } from "@headlessui/react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";

const style = {
	buttonWrapper: `flex p-4 justify-between items-center`,
	buttonLeft: `flex items-center space-x-4`,
	title: `text-lg font-semibold`,
	rightIcon: `h-6 w-6 text-gray-400 dark:text-gray-300`,
	innerTextContainer: `p-4 bg-gray-500 dark:bg-[#313339]`,
};

const Dropdown = ({ title, icon, content }) => {
	return (
		<Disclosure>
			{({ open }) => (
				<>
					<Disclosure.Button>
						<div className={style.buttonWrapper}>
							<div className={style.buttonLeft}>
								{icon}
								<span className={style.title}>{title}</span>
							</div>

							{open ? (
								<BiChevronDown className={style.rightIcon} />
							) : (
								<BiChevronUp className={style.rightIcon} />
							)}
						</div>
					</Disclosure.Button>

					<Disclosure.Panel>
						<div className={style.innerTextContainer}>
							{content ? content : "No content"}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default Dropdown;
