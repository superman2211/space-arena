export interface Update {
	onUpdate?: (time: number) => void;
}

export interface Keyboard {
	onKeyDown?: (e: KeyboardEvent) => void;
	onKeyUp?: (e: KeyboardEvent) => void;
}
