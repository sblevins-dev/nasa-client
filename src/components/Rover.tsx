import { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "../ui/BentoGrid";
import leftArrow from "../assets/icons/left-arrow.png"
import rightArrow from "../assets/icons/right-arrow.png"


interface Photo {
    id: number;
    earth_date: string;
    img_src: string;
    camera: {
        id: number;
        rover_id: number;
        name: string;
    }
    rover: {
        id: number;
        name: string;
    }
}

interface ApiResponse {
    photos: Photo[];
}

export default function Rover() {
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    let indexOfLastItem = currentPage * itemsPerPage;
    let indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [currentItems, setCurrentItems] = useState<Photo[]>([]);
    const [error, setError] = useState<Error | null>(null);

    const paginate = (pageNumber: number) => {
        if (pageNumber <= 0) pageNumber = photos.length / itemsPerPage;
        if (pageNumber > (photos.length / itemsPerPage)) pageNumber = 1;
        setCurrentPage(pageNumber);
        indexOfLastItem = currentPage * itemsPerPage;
        indexOfFirstItem = indexOfLastItem - itemsPerPage;

        setCurrentItems(photos.slice(indexOfFirstItem, indexOfLastItem));
    }

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/roverPhotos/?format=json");

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data: ApiResponse = await response.json();
                setError(null);
                setPhotos(data.photos);

                setCurrentItems(data.photos.slice(indexOfFirstItem, indexOfLastItem));
            } catch (err) {
                setError(err as Error)
            }
        }

        if (photos.length <= 0) {
            fetchPhotos();
        }


    }, [photos])

    return (
        <div>
            <h1 className="font-extrabold text-3xl mb-10">Mars Curiousity Rover Photos</h1>

            {error && <p>Error getting rover photos</p>}
            {currentItems.length > 0 ? (
                <div className="flex max-lg:flex-col items-center gap-4 px-20 max-sm:px-0">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        className={`max-lg:hidden rounded-lg focus:outline-none max-w-[50px] min-w-[40px] w-[40px] h-[50px] py-2 flex items-center justify-center  bg-white bg-opacity-75 hover:opacity-80 transition duration-300`}
                    >
                        <img src={leftArrow} alt="left arrow" className="w-full h-full object-cover" />
                    </button>
                    <BentoGrid className="">
                        {currentItems && currentItems.map((photo, i) => (
                            <BentoGridItem
                                key={photo.id}
                                img_src={photo.img_src}
                                earth_date={photo.earth_date}
                                camera_name={photo.camera.name}
                                rover_name={photo.rover.name}
                                className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                            />
                        ))}
                    </BentoGrid>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        className={`max-lg:hidden rounded-lg focus:outline-none max-w-[50px] min-w-[40px] w-[40px] h-[50px] py-2 flex items-center justify-center  bg-white bg-opacity-75 hover:opacity-80 transition duration-300`}
                    >
                        <img src={rightArrow} alt="right arrow" className="w-full h-full object-cover" />
                    </button>

                    <div className="lg:hidden visible flex justify-between w-full px-4 mt-2">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            className={`text-black font-semibold min-w-[120px] rounded-lg focus:outline-none h-[50px] flex flex-row items-center justify-between py-1 px-2  bg-white bg-opacity-75 hover:opacity-80 transition duration-300`}
                        >
                            <img src={leftArrow} alt="left arrow" className="h-full py-2" />
                            Previous
                            
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            className={`text-black min-w-[120px] font-semibold rounded-lg focus:outline-none h-[50px] flex flex-row items-center justify-between py-1 px-4  bg-white bg-opacity-75 hover:opacity-80 transition duration-300`}
                        >
                            Next
                            <img src={rightArrow} alt="right arrow" className="h-full py-2" />
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <ul className="text-xs mt-10 flex gap-x-2 flex-wrap justify-center">
                {[["FHAZ", "Front Hazard Avoidance Camera"], ["NAVCAM", "Navigation Camera"], ["MAST", "Mast Camera"], ["MAHLI", "Mars Hand Lens Imager"], ["MARDI", "Mars Descent Imager"], ["RHAZ", "Rear Hazard Avoidance Camera"], ["CHEMCAM", "Chemistry and Camera Complex"]].map((_camera, idx) => (
                    <li key={idx} className="">
                        <span className="mr-2 font-semibold">{_camera[0]}:</span>
                        <span>{_camera[1]}</span>
                    </li>
                ))}
            </ul>

        </div>
    )
}
