/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAddress, useMarketplace } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";

import TopNavbarLayout from "../../../layouts/TopNavbarLayout";
import NFTImage from "../../../components/NFTDetails/NFTImage";
import NFTSalesInfo from "../../../components/NFTDetails/NFTSalesInfo";
import NFTDetails from "../../../components/NFTDetails/NFTDetails";
import NFTBasicInfo from "../../../components/NFTDetails/NFTBasicInfo";

const style = {
	wrapper: `h-[100vh] mx-auto flex max-w-2xl flex-col space-y-4 py-4 dark:bg-[#202226] lg:max-w-none lg:py-8
    lg:px-24`,
	nftContainer: `flex flex-col lg:flex-row lg:space-x-4`,
	leftContainer: `flex flex-col space-y-4`,
	leftElement: `hidden lg:block`,
	rightContainer: `flex flex-1 flex-col space-y-4`,
	buyoutContainer: `flex-1`,
	loading: `h-full w-full flex justify-center items-center`,
};

const NFT = () => {
	const [loading, setLoading] = useState(false);
	const [listing, setListing] = useState();

	const router = useRouter();
	const { tokenID } = router.query;
	console.log(tokenID);

	const marketplace = useMarketplace(
		"0xCc2977E965D98C85D7fBB4eC8870A2ec5013C0bE"
	);

	const address = useAddress();

	useEffect(() => {
		getListing();
	}, []);

	useEffect(() => {
		if (!address) router.replace("/");
	}, [address]);

	const getListing = async () => {
		try {
			setLoading(true);
			const listing = await marketplace.getListing(
				BigNumber.from(tokenID)
			);
			setListing(listing);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const buyNFT = async () => {
		try {
			await marketplace.buyoutListing(BigNumber.from(tokenID), 1);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<TopNavbarLayout>
			<div className={style.wrapper}>
				{loading ? (
					<div className={style.loading}>Loading...</div>
				) : (
					<div className={style.nftContainer}>
						<div className={style.leftContainer}>
							<div className={style.leftElement}>
								<NFTImage image={listing?.asset?.image} />
							</div>
							<div className={style.leftElement}>
								<NFTDetails
									attributes={listing?.asset?.attributes}
								/>
							</div>
						</div>

						<div className={style.rightContainer}>
							<NFTBasicInfo name={listing?.asset?.name} />

							<div className={style.buyoutContainer}>
								<NFTSalesInfo
									price={
										listing?.buyoutCurrencyValuePerToken
											?.displayValue
									}
									buyNFT={buyNFT}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</TopNavbarLayout>
	);
};

export default NFT;
