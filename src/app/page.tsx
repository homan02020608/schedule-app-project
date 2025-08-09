import AddCompanyForm from "@/components/AddCompanyForm";
import { BarChartComponent } from "@/components/Bar-Chart";
import { CreateBarChartData } from "@/components/CreateBarChartData";

import EntriedCompanyList from "@/components/EntriedCompanyList";

type FilterStatus = 'all' | 'interested' | 'in_progress' | 'completed';

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const status = (await searchParams).status;
  const currentStatus: FilterStatus = (status as FilterStatus) || "all"

  const barChartData = await CreateBarChartData();

  return (
    <div className="max-container m-2 ">
      <h1 className="flex justify-center items-center text-3xl font-light">Schedule</h1>
      <AddCompanyForm />
      <div className="flex justify-between items-center lg:items-start flex-col lg:flex-row gap-4 p-4">
        <div className="w-full max-w-2xl  rounded-xl">
          <BarChartComponent barChartData={barChartData}/>
        </div>
        <div>
          <EntriedCompanyList currentStatus={String(currentStatus)} />
        </div>
      </div>
    </div>
  );
}
