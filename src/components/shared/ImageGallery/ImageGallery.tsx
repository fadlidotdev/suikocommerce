import Image from "next/image";
import {useState} from "react";

import {classes} from "@/utils/core";

type Props = {
  thumbnail: string;
  images: string[];
};

const ImageGallery = ({thumbnail, images}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const onSelectImage = (index: number) => setSelectedIndex(index);

  return (
    <div className="flex flex-col gap-2 items">
      <Image
        className="object-contain bg-white border border-gray-300 rounded-lg aspect-square place-self-start"
        src={selectedIndex !== null ? images[selectedIndex] : thumbnail}
        width={250}
        height={250}
        alt="Product image"
      />

      <div className="flex gap-3 w-full max-w-[250px] max-h-[250px] overflow-auto pb-3">
        {images.map((imageUrl, idx) => (
          <button
            key={idx}
            className="shrink-0"
            onClick={() => onSelectImage(idx)}>
            <Image
              className={classes(
                "object-contain bg-white border rounded aspect-square",
                selectedIndex === idx ? "border-blue-500" : " border-gray-200",
              )}
              src={imageUrl}
              width={48}
              height={48}
              alt="Product image"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
