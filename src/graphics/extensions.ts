export interface Update {
	enabled?: boolean;
	onUpdate?: (time: number) => void;
}

export interface Keyboard {
	onKeyDown?: (e: KeyboardEvent) => void;
	onKeyUp?: (e: KeyboardEvent) => void;
}
