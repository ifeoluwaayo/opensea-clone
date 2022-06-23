import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
	return (
		<ThirdwebProvider
			desiredChainId={ChainId.Rinkeby}
			chainRpc={{
				[ChainId.Rinkeby]:
					"https://rinkeby.infura.io/v3/e4587e2e059441b590ebac2d566cf939",
			}}>
			<ThemeProvider>
				<Component {...pageProps} />;
			</ThemeProvider>
		</ThirdwebProvider>
	);
}

export default MyApp;
