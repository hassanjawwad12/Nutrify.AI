"use client"
import React,{useEffect} from 'react'
import BasicDataTable from './basic-table'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddFormula from './AddFormula'
import { useSidebarDataStore,useRawMaterialDataStore,useNutrientDataStore } from '@/store';

const page = () => {
  const {fetchSidebarData } = useSidebarDataStore();
  const { fetchRawTableData,} = useRawMaterialDataStore(); //ingrediens
  const { fetchNutrients } = useNutrientDataStore(); //Nutrients

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchSidebarData(storedToken);
      fetchRawTableData(storedToken);
      fetchNutrients(storedToken);
    } else {
      window.location.assign("/auth");
      setToken(null);
    }
  }, []);

  return (
    <div className=" space-y-5 mt-5">
    <Card>
      <CardHeader className="flex flex-row justify-between items-center bg-white dark:bg-[#1C1C3C] ">
        <CardTitle
          style={{
            color: "#7398FC",
          }}
        >
          Formulas
        </CardTitle> 
        <AddFormula />
      </CardHeader>
      <CardContent>
        <BasicDataTable />
      </CardContent>
    </Card>
  </div>
  )
}

export default page
