import { useAddress, useMetamask } from "@thirdweb-dev/react";
import Main from "../components/Home";

const style = {
	wrapper: `flex items-center justify-center h-screen`,
	connectWalletButton: `rounded-lg border border-black px-10 py-5 transition-all hover:bg-black
   hover:text-white`,
};

export default function Home() {
	const connectWithMetamask = useMetamask();
	const address = useAddress();

	console.log(address);

	const Auth = () => {
		return (
			<div className={style.wrapper}>
				<button
					onClick={connectWithMetamask}
					className={style.connectWalletButton}>
					Connect to Metamask
				</button>
			</div>
		);
	};

	return <>{address ? <Main /> : Auth()}</>;
}
