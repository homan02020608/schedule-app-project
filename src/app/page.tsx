import AddCompanyForm from "@/components/AddCompanyForm";
import EntriedCompanyList from "@/components/EntriedCompanyList";



export default async function Home({searchParams} : {searchParams : Promise<{[key :string] : string | string[] | undefined}>}) {
  const currentStatus = (await searchParams).status
  
  return (
    <div className="max-container">
      <h1 className="flex justify-center items-center text-3xl font-light">Schedule-App</h1>
      <AddCompanyForm/>
      <EntriedCompanyList currentStatus={String(currentStatus)}/>
    </div>
  );
}
