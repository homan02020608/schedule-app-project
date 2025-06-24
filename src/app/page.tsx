import AddCompanyForm from "@/components/AddCompanyForm";
import EntriedCompanyList from "@/components/EntriedCompanyList";

type FilterStatus = 'all' | 'interested' | 'in_progress' | 'completed';

export default async function Home({searchParams} : {searchParams : Promise<{[key :string] : string | string[] | undefined}>}) {
  const status  = (await searchParams).status;
  const currentStatus :FilterStatus =  (status as FilterStatus )|| "all"
  
  return (
    <div className="max-container">
      <h1 className="flex justify-center items-center text-3xl font-light">Schedule</h1>
      <AddCompanyForm/>
      <EntriedCompanyList currentStatus={String(currentStatus)}/>
    </div>
  );
}
