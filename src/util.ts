export function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
}

export function combineMaps<TKey, TValue>(
    mapOne: Map<TKey, TValue>, 
    mapTwo: Map<TKey, TValue>, 
    combine: (x: TValue, y: TValue) => TValue) : Map<TKey, TValue>
{
    var keys = new Set<TKey>();
    for (let key of mapOne.keys())
        keys.add(key);

    for (let key of mapTwo.keys())
        keys.add(key);

    let m = new Map<TKey, TValue>();
    for (let key of keys)
    {
        let v1 = mapOne.get(key);
        let v2 = mapTwo.get(key);

        if (v1 !== undefined && v2 !== undefined)
            m.set(key, combine(v1, v2));
        else if (v1 !== undefined)
            m.set(key, v1);
        else if (v2 !== undefined)
            m.set(key, v2);
    }

    return m;
}