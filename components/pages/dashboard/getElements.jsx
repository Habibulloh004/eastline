import axios from "axios";
import { DataTable } from "@/components/shared/data-table";
import { topCategory } from "@/components/tableColumns/topCategory";

export default async function GetElements({ param }) {
  const { data } = await axios.get(
    `${process.env.BACK_URL}/api/${
      param.includes("Top")
        ? param.slice(6).charAt(0).toLowerCase() + param.slice(6).slice(1)
        : param.slice(6).toLowerCase()
    }`,
    { next: { tags: [`${param}`] } }
  );

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={topCategory} data={data.data} />
    </div>
  );
}
