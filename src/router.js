import BoardList from "./components/BoardList";
import BoardWrite from "./components/BoardWrite";
import NotFound from "./components/NotFound";

export const routeNames = {
	home: "/",
	boardList: "/board/list",
	boardWrite: "/board/write",
};

const routes = {
	[routeNames.boardList]: BoardList,
	[routeNames.boardWrite]: BoardWrite,
};

export const router = () => {
	const path = window.location.pathname;
	const searchParams = new URLSearchParams(window.location.search);
	const pageComponent = routes[path];
	const app = document.querySelector("#app");

	if (path === "/") {
		window.location.href = "/board/list";

		return;
	}
	if (!app) return;

	if (pageComponent) {
		app.innerHTML = pageComponent.render({ searchParams });
		pageComponent.registerEvent();
	} else {
		app.innerHTML = NotFound.render();
	}
};

export const navigateTo = (url, state) => {
	history.pushState(state, null, url);
	router();
};

export const goBack = () => {
	history.back();
};

export const goForward = () => {
	history.forward();
};
