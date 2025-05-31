import {useState, useEffect} from "react";

function useFetch<T>(url : string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "GET request failed");
                setLoading(false);
            });
    }, [url]);

    //POST
    async function post<D>(payload : D) {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url!, {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            setData(result);
        }catch (error : any){
            setError(error.message || "POST  request failed");
        } finally {
            setLoading(false);
        }
    }
    //PUT
    async function put<D>(payload : D) {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            setData(result);
            return result
        }catch (error : any){
            setError(error.message || "PUT  request failed");
        }finally {
            setLoading(false);
        }
    }

    //DELETE
    async function remove(customUrl?: string) {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(customUrl || url, {
                method: 'DELETE',
            });
            const result = await response.json();
            setData(result);
            return result;
        } catch (error: any) {
            setError(error.message || "DELETE  request failed");
        } finally {
            setLoading(false);
        }
    }
    return{ data, loading , error , post, put, remove };
}

export default useFetch;