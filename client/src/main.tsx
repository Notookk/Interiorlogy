import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import logo from "@assets/generated_images/logo.png";

// Set favicon to the local logo ensuring correct asset path via Vite
const ensureFavicon = () => {
	const linkId = "app-favicon";
	let link = document.querySelector<HTMLLinkElement>(`link#${linkId}`);
	if (!link) {
		link = document.createElement("link");
		link.id = linkId;
		link.rel = "icon";
		document.head.appendChild(link);
	}
	link.type = "image/png";
	link.href = logo;
};

ensureFavicon();

createRoot(document.getElementById("root")!).render(<App />);
