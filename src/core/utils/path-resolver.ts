export const pathExtensionless = (filePath: string) => {
	return handlerPath(filePath).split('.').slice(0, -1).join('.');
};

export const handlerPath = (context: string) => {
	return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`;
};
