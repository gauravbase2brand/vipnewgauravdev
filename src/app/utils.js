import { useEffect } from "react";
import { useState } from "react";
import { useParams, useSearchParams } from 'next/navigation'

export const useGetQueryParams = () => {
    let searchParams = useSearchParams();
    const param = useParams();
    const [params, setParams] = useState({});
    const [queryParams, setQueryParams] = useState();
    useEffect(() => {
        if (
            JSON.stringify(queryParams) !==
            JSON.stringify(Object.fromEntries([...searchParams]))
        ) {
            setQueryParams(Object.fromEntries([...searchParams]));
        }
        if (JSON.stringify(param) !== JSON.stringify(params)) {
            setParams(param);
        }
    }, [param, searchParams]);
    return { queryParams, params };
};

