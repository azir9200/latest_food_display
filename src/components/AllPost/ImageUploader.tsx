import { Button } from "@/components/ui/button";
import Image from "next/image";

const ImageUploader = ({ images, setImages, previews, setPreviews }) => {
  const handleSelect = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  return (
    <div>
      <input type="file" className="hidden" id="fileInput" multiple onChange={handleSelect} />

      <Button variant="outline" onClick={() => document.getElementById("fileInput")?.click()}>
        Upload Images
      </Button>

      <div className="grid grid-cols-2 gap-2 mt-3">
        {previews.map((url, i) => (
          <Image key={i} src={url} width={200} height={200} className="rounded" alt="preview" />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
