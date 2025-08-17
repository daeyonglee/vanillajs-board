import { getBoards } from "../api/board.js";
import { navigateTo, routeNames } from "../router.js";
import { writerMasking } from "../utils.js";

const BoardList = {
	render: ({ searchParams }) => {
		const page = searchParams.get("page") || 1;
		const perPage = searchParams.get("perPage") || 10;
		const { isLoading, boards, totalPage } = getBoards({ page, perPage });

		const generatePrevPageUrl = () => {
			return `${routeNames.boardList}?page=1&perPage=${perPage}`;
		};

		const generateNextPageUrl = () => {
			return `${routeNames.boardList}?page=${totalPage}&perPage=${perPage}`;
		};

		if (isLoading) {
			return `
				<div class="board-list-section">
					<h1>게시판 목록</h1>
					<div class="loading">
						<div class="spinner-border" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</div>
				</div>
			`;
		}

		return `
			<div class="board-list-section">
				<h1>게시판 목록</h1>
				<div class="select-page-section">
					<select class="form-select" name="perPage" id="perPage">
						<option value="10" ${perPage === "10" ? "selected" : ""}>10</option>
						<option value="20" ${perPage === "20" ? "selected" : ""}>20</option>
						<option value="30" ${perPage === "30" ? "selected" : ""}>30</option>
						<option value="40" ${perPage === "40" ? "selected" : ""}>40</option>
						<option value="50" ${perPage === "50" ? "selected" : ""}>50</option>
					</select>
				</div>
				<table class="table">
					<thead>
						<tr>
							<th>순번</th>
							<th>제목</th>
							<th>작성자</th>
							<th>작성일</th>
							<th>조회수</th>
						</tr>
					</thead>
					<tbody>
						${boards
							.map(
								(board) => `
								<tr>
									<td width="10%" align="center">${board.id}</td>
									<td width="50%">
										<a href="${routeNames.boardWrite}?id=${board.id}" data-link>${board.title}<a/>
									</td>
									<td width="15%" align="center">${writerMasking(board.writer)}</td>
									<td width="15%" align="center">${board.createdAt}</td>
									<td width="10%" align="center">${board.viewCount}</td>
								</tr>
							`
							)
							.join("")}
					</tbody>
				</table>
				<br/>
				<div class="pagination">
					<a href="${generatePrevPageUrl()}" data-link>&lt;</a>
					${Array.from({ length: totalPage }, (_, i) => {
						return `
							<a class="${Number(page) === i + 1 ? "active" : ""}" href="${routeNames.boardList}?page=${
							i + 1
						}&perPage=${perPage}" data-link>${i + 1}</a>
						`;
					})
						.join("")
						.trim()}
					<a href="${generateNextPageUrl()}" data-link>&gt;</a>
				</div>
				<div class="board-list-writer-section">
					<button id="boardWrite" type="button" class="btn btn-primary">글쓰기</button>
				</div>
			</div>
    `;
	},
	registerEvent: () => {
		document.getElementById("perPage").addEventListener("change", (e) => {
			if (e.target.value) {
				navigateTo(`${routeNames.boardList}?page=1&perPage=${e.target.value}`);
			}
		});

		document.getElementById("boardWrite").addEventListener("click", (e) => {
			e.preventDefault();
			navigateTo(routeNames.boardWrite);
		});
	},
};

export default BoardList;
