import { cn } from "../utils/cn"

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto max-sm:mx-0 max-sm:w-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  img_src,
  earth_date,
  camera_name,
  rover_name,
}: {
  className?: string;
  earth_date?: string;
  img_src?: string;
  camera_name?: string;
  rover_name?: string;
}) => {
  return (
    <div
      className={cn(
        "relative cursor-pointer 2xl:min-w-[400px] xl:min-w-[300px] min-w-[300px] md:min-w-[220px] max-sm:min-h-[200px] max-sm:min-w-full row-span-1 overflow-hidden rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none bg-transparent dark:border-white/[0.2] border border-transparent justify-between flex py-2",
        className
      )}
    >
      <img src={img_src} alt={img_src} className="w-full h-full object-cover absolute top-0 left-0 group-hover:opacity-50" />

      <div className="group-hover/bento:translate-x-2 h-max font-bold transition duration-200 bg-black bg-opacity-50 p-2 rounded-md">
        {rover_name}
        <div className="font-sans font-semibold text-xs text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {earth_date}
        </div>
        <div className="font-sans text-neutral-600 font-semibold text-xs dark:text-neutral-300">
          {camera_name}
        </div>
      </div>
    </div>
  );
};
