import axios from "axios";
import { DataTable } from "@/components/shared/data-table";
import { topCategory } from "@/components/tableColumns/topCategory";
import { category } from "@/components/tableColumns/category";
import { product } from "@/components/tableColumns/product";
import { sertificate } from "@/components/tableColumns/sertificate";
import { extractEntityName } from "@/lib/utils";
import { partner } from "@/components/tableColumns/partner";
import { license } from "@/components/tableColumns/license";
import { news } from "@/components/tableColumns/news";
import CurrencySum from "@/components/forms/currency";
import Admin from "@/components/forms/admin";

async function Getelements({ param }) {
  const entityName = extractEntityName(param);

  const { data } = await axios.get(
    `${process.env.BACK_URL}/api/${entityName}`,
    { next: { tags: [`${param}`] } }
  );

  function getColumn(prop) {
    switch (prop) {
      case "changeTopCategory":
        return topCategory;

      case "changeCategory":
        return category;

      case "changeProduct":
        return product;

      case "changeSertificate":
        return sertificate;

      case "changePartner":
        return partner;

      case "changeLicense":
        return license;

      case "changeNews":
        return news;

      default:
        return null;
    }
  }

  return (
    <div className="w-full  py-10">
      {param == "changeCurrency" ? (
        <CurrencySum />
      ) : param == "changeAdmin" ? (
        <Admin />
      ) : (
        <div className="container mx-auto">
          <DataTable columns={getColumn(param)} data={data.data} />
        </div>
      )}
    </div>
  );
}

export default Getelements;
