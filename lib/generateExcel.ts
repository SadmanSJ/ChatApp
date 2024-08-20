import exportFromJSON from "export-from-json";

interface Props {
  data: any[];
  filename: string;
}

export function generateExcel({ data, filename }: Props) {
  const fileName = `${filename}_${new Date().toDateString()}`;
  const exportType = exportFromJSON.types.xls;
  exportFromJSON({ data: data, fileName, exportType });
}
