import MoreTable from "@/components/moreTable/MoreTable";

const EarnPage: React.FC = () => {
    return (
    <div >
      <h1 className="text-4xl mb-8">MORE Vaults</h1>
      <MoreTable isEarn={true} ></MoreTable>
    </div>
    );
  };
  
  export default EarnPage;