export const getBoards = ({ page = 1, perPage = 10 }) => {
	const boards = JSON.parse(sessionStorage.getItem("boards")).reverse();

	const prevPage = (page - 1) * perPage;
	const nextPage = page * perPage;

	const totalPage = Math.ceil(boards.length / perPage);

	return {
		isLoading: false,
		boards: boards.slice(prevPage, nextPage),
		totalPage,
	};
};

export const getBoard = (id) => {
	const boards = JSON.parse(sessionStorage.getItem("boards"));
	const board = boards.find((board) => board.id === Number(id));
	return board;
};

export const saveBoard = (board) => {
	const boards = JSON.parse(sessionStorage.getItem("boards"));
	const id = generateId();
	boards.push({
		id,
		...board,
		createdAt: now(),
		viewCount: 0,
	});
	sessionStorage.setItem("boards", JSON.stringify(boards));
};

export const updateBoard = (newBoard) => {
	const boards = JSON.parse(sessionStorage.getItem("boards"));
	const foundedBoardIndex = boards.findIndex((board) => board.id === newBoard.id);

	if (foundedBoardIndex !== -1) {
		boards[foundedBoardIndex].title = newBoard.title;
		boards[foundedBoardIndex].writer = newBoard.writer;
		boards[foundedBoardIndex].content = newBoard.content;

		console.log(boards[foundedBoardIndex]);
		sessionStorage.setItem("boards", JSON.stringify(boards));

		return;
	}

	throw new Error("fail to update board. not found data");
};

const generateId = () => {
	const boards = JSON.parse(sessionStorage.getItem("boards"));
	const lastId = boards[boards.length - 1].id;

	if (lastId) {
		return Number(lastId) + 1;
	}

	return 1;
};

const now = () => {
	const d = new Date();
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};
