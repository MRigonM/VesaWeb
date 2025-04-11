import {useState, useEffect} from "react";

function useFetch<T>(url : string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setData(res);
                setLoading(false);
            });
    }, [url]);
    return{ data, loading };
}

export default useFetch;