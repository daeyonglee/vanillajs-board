import { router, navigateTo } from "./router.js";
import dummyBoards from "./boards.json";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
	setupSessionStorageData();
	document.body.addEventListener("click", (e) => {
		if (e.target.matches("[data-link]")) {
			e.preventDefault();
			navigateTo(e.target.href);
		}
	});

	router();
});

const setupSessionStorageData = () => {
	const boards = sessionStorage.getItem("boards");

	if (!boards) {
		const boards = dummyBoards.data;
		sessionStorage.setItem("boards", JSON.stringify(boards));
	}
};
