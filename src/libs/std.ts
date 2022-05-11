class std {
    static random(min: number, max: number, integer: boolean = true) {
        const n = Math.random() * (max - min) + min;
        return (integer) ? Math.floor(n) : n;
    }
    static cloneMatrix<T>(matrix: T[][]) {
        return [...matrix].map(row => row.map(col => col));
    }
    static rgba(red: number, green: number, blue: number, alpha: number = 1) {
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }
    static hsl(hue: number, saturation: number = 100, lightness: number = 50) {
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    static gs(n: number) {
        return std.rgba(n, n, n);
    }
}

export default std;