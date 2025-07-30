import AddCompanyForm from "@/components/AddCompanyForm";
import { BarChartComponent } from "@/components/Bar-Chart";

import EntriedCompanyList from "@/components/EntriedCompanyList";

type FilterStatus = 'all' | 'interested' | 'in_progress' | 'completed';

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const status = (await searchParams).status;
  const currentStatus: FilterStatus = (status as FilterStatus) || "all"

  return (
    <div className="max-container m-2 ">
      <h1 className="flex justify-center items-center text-3xl font-light">Schedule</h1>
      <AddCompanyForm />
      <div className="flexBetween flex-col lg:flex-row gap-8 p-4">
        <div className="p-4 my-4 w-full lg:w-1/2">
          <BarChartComponent />
        </div>
        <div>
          <EntriedCompanyList currentStatus={String(currentStatus)} />
        </div>
        
      </div>
    </div>
  );
}
