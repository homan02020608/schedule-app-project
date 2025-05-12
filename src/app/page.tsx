import EntriedCompanyList from "@/components/EntriedCompanyList";

export default function Home() {
  return (
    <div className="max-container  ">
      <h1 className="flex justify-center items-center text-3xl font-light">Schedule-App</h1>
      <EntriedCompanyList/>
    </div>
  );
}
