import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
// import ReactCrop from "react-crop";
import DropTarget from "@/components/shared/fileDnd";
import Container from "@/components/shared/container";
import axios from "axios";

export default async function ImagePage() {
  // const topCategories = await axios.get("/api/category");
  // console.log(topCategories.data);
  return (
    <div>
      {/* <form onSubmit={saveImage}>
        <input
          type="file"
          name="image"
          onChange={(e) => {
            if (e.target.files[0].size > 10485760) {
              alert("File size cannot exceed 1 MB.");
              return;
            }

            const allowedTypes = ["image/png", "image/jpeg"];
            if (!allowedTypes.includes(e.target.files[0].type)) {
              alert("Only PNG and JPEG images are allowed.");
              return;
            }
            setImage(e.target);
            const fileEx = e.target.files[0].name.split(".").pop();
            const fileName = `${Math.random()}.${fileEx}`;
            const filePath = `${fileName}`;

            const reader = new FileReader();
            reader.onloadend = () => {
              setImageArray([
                ...imageArray,
                {
                  id: crypto.randomUUID(),
                  filePath,
                  file: e.target.files[0],
                  imageSrc: reader.result,
                },
              ]);
            };
            reader.readAsDataURL(e.target.files[0]);
          }}
        />
        <button onClick={() => saveImage}>submit</button>
      </form> */}
      <Container className="block my-10">
        <DropTarget />
      </Container>
    </div>
  );
}
