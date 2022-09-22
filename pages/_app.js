import Layout from "../components/Layout";
import { GlobalProvider } from "../context/GlobalState";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<GlobalProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</GlobalProvider>
	);
}

export default MyApp;
