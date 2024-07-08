import { useEffect, useState } from "react"

interface Data {
    [key: string]: never;
}


export default function Hero() {
    const [picture, setPicture] = useState<Data | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPicture = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/daypic/?format=json')

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setPicture(data);

            } catch (err) {
                setError(err as Error);
            }
        }
        if (picture == null) {
            fetchPicture();
        }

    }, [])

    return (
        <div className="">
            <h1 className="font-extrabold text-3xl mb-10">Picture Of The Day</h1>
            {error != null && <div>Error grabbing Picture Of The Day</div>}
            {picture ? (
                <div className="flex flex-col gap-4 px-10 max-sm:px-0">
                    
                    <div className="md:h-[500px] m-auto">
                        <img src={picture.url} alt={picture.title} className="h-full w-auto object-contain" />
                    </div>
                    <h1 className="font-bold text-2xl">{picture.title}</h1>
                    <p className="font-semibold text-sm px-5 max-sm:px-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{picture.explanation}</p>
                </div>

            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
