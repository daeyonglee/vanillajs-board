import Quill from "quill";
import "quill/dist/quill.snow.css";

import { goBack, navigateTo, routeNames } from "../router.js";
import { saveBoard, updateBoard, getBoard } from "../api/board.js";
import { writerMasking, getByteOfString } from "../utils.js";

const BoardWrite = {
	render: ({ searchParams }) => {
		const id = searchParams.get("id");

		const board = getBoard(id) || {
			title: "",
			writer: "",
			content: "",
		};

		return `
			<div class="board-writer-section">
				<h1>게시글 ${id ? "수정" : "쓰기"}</h1>
				<form class="board-form">
					<input id="id" type="hidden" value="${id}" />
					<input id="content" type="hidden" value="${board.content}" />
					<div class="mb-3">
						<label for="title">제목</label>
						<input class="form-control" required id="title" type="text" name="title" value="${board.title}" />
					</div>
					<div class="mb-3">
						<label for="writer">작성자</label>
						<input class="form-control" required id="writer" type="text" name="writer" value="${writerMasking(
							board.writer
						)}" ${board.writer ? "disabled" : ""} />
					</div>
					<div>
						<div class="mb-1">내용</div>
						<div id="editor" class="editor-section">${board.content}</div>
					</div>
					<div class="byte-section">
							<span id="byte"></span> bytes
					</div>
					<div class="btn-section">
						<button id="cancel" type="button" class="btn btn-secondary">취소</button>
						${
							id
								? '<button id="update" type="button" class="btn btn-primary">수정</button>'
								: '<button id="save" type="button" class="btn btn-primary">저장</button>'
						}
					</div>
				</form>
			</div>
    `;
	},
	registerEvent: () => {
		const quill = new Quill("#editor", {
			theme: "snow",
		});

		quill.on("text-change", (delta, oldDelta, source) => {
			if (source === "user") {
				document.getElementById("content").value = quill.root.innerHTML;
				document.getElementById("byte").textContent = getByteOfString(quill.root.innerText);
			}
		});

		document.getElementById("byte").textContent = getByteOfString(quill.root.innerText);

		document.getElementById("cancel").addEventListener("click", (e) => {
			e.preventDefault();
			goBack();
		});
		document.getElementById("update")?.addEventListener("click", (e) => {
			e.preventDefault();
			try {
				updateBoard({
					id: Number(document.forms[0].elements.id.value),
					title: document.forms[0].elements.title.value,
					writer: document.forms[0].elements.writer.value,
					content: document.forms[0].elements.content.value,
				});
				alert("수정되었습니다.");
				navigateTo(routeNames.boardList);
			} catch (e) {
				alert("수정에 실패하였습니다.");
			}
		});
		document.getElementById("save")?.addEventListener("click", (e) => {
			e.preventDefault();

			try {
				saveBoard({
					title: document.forms[0].elements.title.value,
					writer: document.forms[0].elements.writer.value,
					content: document.forms[0].elements.content.value,
				});
				alert("저장되었습니다.");
				navigateTo(routeNames.boardList);
			} catch (e) {
				alert("저장에 실패하였습니다.");
			}
		});
	},
};

export default BoardWrite;
