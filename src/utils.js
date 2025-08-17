export const writerMasking = (writer) => {
	if (!writer) return "";
	return writer.substring(0, 1) + "*" + writer.substring(2, 3);
};

export const getByteOfString = (string) => {
	if (string === "\n") return 0;
	return new Blob([string]).size;
};
