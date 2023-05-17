type imageSize = "small" | "medium" | "big";
type MenuImageProps = {
  src: string;
  size: imageSize;
};
const MenuImage = ({ src, size }: MenuImageProps) => {
  const imageSize = {
    small: { width: "100px", height: "100px" },
    medium: { width: "200px", height: "200px" },
    big: { width: "100%", height: "100%" },
  };
  return (
    <figure className="h-1/2">
      <img src={src} style={imageSize[size]} className="object-cover" />
    </figure>
  );
};

export default MenuImage;
