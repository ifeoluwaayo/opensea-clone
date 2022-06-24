import { useEffect, useState } from "react";
import Link from "next/link";
import { useMarketplace } from "@thirdweb-dev/react";
import NFTCard from "./NFTCard";

const style = {
	wrapper: `mx-auto grid max-w-fit flex-1 grid-cols-1 gap-10 px-3 pt-24 
	md:grid-cols-2 md:pt-0 `,
	loading: `h-[40vh] w-full flex justify-center items-center`,
};

const Listings = () => {
	const [listings, setListings] = useState([]);

	const marketplace = useMarketplace(
		"0xCc2977E965D98C85D7fBB4eC8870A2ec5013C0bE"
	);

	useEffect(() => {
		getListings();
	}, []);

	const getListings = async () => {
		try {
			const list = await marketplace.getActiveListings();
			setListings(list);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className={style.wrapper}>
				{listings.length > 0 ? (
					<>
						{listings?.map((listing, index) => (
							<Link
								key={index}
								href={`/assets/${listing.assetContractAddress}/${listing.id}`}>
								<a>
									<NFTCard listing={listing} />
								</a>
							</Link>
						))}
					</>
				) : (
					<div className={style.loading}>Loading...</div>
				)}
			</div>
		</div>
	);
};

export default Listings;
