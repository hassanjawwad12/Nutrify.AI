"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BasicDataTable from "./basic-table";
import DialogBox from './dialog';
import { useRawMaterialDataStore } from "@/store";
import { useEffect } from "react";

const DataTablePage = () => {
  const {fetchRawTableData}= useRawMaterialDataStore();//ingrediens 
  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchRawTableData(storedToken);
    } else {
      window.location.assign("/auth");
      setToken(null);
    }
  }, []);

  return (
    <div className=" space-y-5 mt-5">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle
            style={{
              color: "#7398FC",
            }}
          >
            Ingredients
          </CardTitle>
          <DialogBox />
        </CardHeader>
        <CardContent>
          <CardTitle
            style={{
              color: "#7398FC",
            }}
            className="mb-4"
          >
            Advanced Search
          </CardTitle>
          <BasicDataTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default DataTablePage;
