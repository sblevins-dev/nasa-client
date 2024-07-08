import { Key, ReactNode } from "react";
import { BentoGrid, BentoGridItem } from "../ui/BentoGrid";

interface Data {
    [key: string]: any;
}

export default function PhotoGrid({ photos } : { photos : Data}) {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
        {photos.map((photo: { id: Key | null | undefined; img_src: string | ReactNode; }, idx: number) => (
            <BentoGridItem 
                key={photo.id}
                img_src={photo.img_src}

            />
        ))}
    </BentoGrid>
  )
}
