export default function splitNewLine(str: string) {
	return str.split(
		str.includes('\r\n') ? '\r\n' : str.includes('\r') ? '\r' : '\n'
	)
}
