import { useEffect, useState } from "react";

export interface PokeResponse {
    count: number;
    next: string;
    previous: null;
    results: Result[];
}

export interface Result {
    name: string;
    url: string;
}

export default function Fetched() {
    const [data, setData] = useState<PokeResponse>();
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
        .then((res)=>res.json())
        .then((data: PokeResponse) => setData(data))
    });
    return(
        <div>
            {
                data?.results?.map((pokemon: Result, index: number)=>{
                    return <p key={index}>{pokemon.name}</p>
                })
            }
        </div>
    )
}