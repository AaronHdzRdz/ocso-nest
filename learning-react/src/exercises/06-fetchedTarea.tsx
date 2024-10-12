import { useEffect, useState } from "react";

export interface PokeResponse {
    count: number;
    next: string;
    previous: null | string;
    results: Result[];
}

export interface Result {
    name: string;
    url: string;
}

export default function Fetched() {
    const [data, setData] = useState<PokeResponse>();
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [cache, setCache] = useState<{ [key: number]: PokeResponse }>({});
    const limit = 10;

    useEffect(() => {
        if (cache[offset]){
            setData(cache[offset]);
            setLoading(false);
        } else {
            setLoading(true);
            fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            .then((res) => res.json())
            .then((data: PokeResponse) => {
                setData(data);
                setCache((prevCache)=> ({...prevCache, [offset]: data}));
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert("No se pudo conectar a la API. Por favor, verifica tu conexión a Internet.")
            });
        }
    }, [offset, cache]);

    const handlePrevious = () => {
        if (offset > 0) {
            setOffset(offset - limit);
        }
    }

    const handleNext = () => {
        if (data?.next) {
            setOffset(offset + limit);
        }
    }

    return (
        <div>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    {data?.results?.map((pokemon: Result, index: number) => {
                        return <p key={index}>{pokemon.name}</p>;
                    })}
                </div>
            )}
            <div>
                <button onClick={handlePrevious} disabled={offset == 0 || loading}>
                    Anterior
                </button>
                <button onClick={handleNext} disabled={!data?.next || loading}>
                    Siguiente
                </button>
            </div>
        </div>
    );
}