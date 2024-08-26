
export function dateComparer<T>(dateExtractor: (t: T) => Date) {
    return (a: T, b: T) => Date.parse(dateExtractor(a).toString()) - Date.parse(dateExtractor(b).toString());
}
