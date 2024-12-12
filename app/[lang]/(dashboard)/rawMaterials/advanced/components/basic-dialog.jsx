// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import React, { useState } from "react";
// import { useFeedDataStore } from "@/store";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// const BasicDialog = () => {
//   const { Units, fetchUnits } = useFeedDataStore();

//   useEffect(() => {
//     fetchUnits();
//   }, []);

//   const [formData, setFormData] = useState({
//     code: "",
//     abrivation: "",
//     name: "",
//     group: "",
//     unit: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="bg-[#1D1D3D]">
//       <Dialog className="bg-[#1D1D3D]">
//         <DialogTrigger asChild>
//           <Button className="bg-[#1643BB] text-white dark:text-[#7398FC] dark:bg-[#37375E]">
//             Add New
//           </Button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle
//               className="text-base font-medium text-[#7398FC] "
//               style={{
//                 borderBottom: "1px solid #7398FC",
//               }}
//             >
//               Nutrient
//             </DialogTitle>
//           </DialogHeader>
//           <div className="text-sm text-default-500  space-y-4">
//             <DialogTitle className="text-base w-full font-medium text-[#7398FC] ">
//               ADD NEW
//             </DialogTitle>
//             <div className="w-full flex flex-row mb-3">
//               <div className="w-[20%] ">
//                 <label>Code</label>
//                 <Input
//                   type="text"
//                   name="code"
//                   placeHolder="Code"
//                   onChange={(e) => handleChange(e)}
//                 />
//               </div>
//               <div className="w-[80%] ml-2">
//                 <label>Abrivation</label>
//                 <Input
//                   type="text"
//                   name="abrivation"
//                   placeHolder="Abr"
//                   onChange={(e) => handleChange(e)}
//                 />
//               </div>
//             </div>
//             <div className="w-full flex flex-col mb-3">
//               <label>Name</label>
//               <Input
//                 type="text"
//                 name="name"
//                 placeHolder="Name"
//                 onChange={(e) => handleChange(e)}
//               />
//             </div>
//             <div className="w-full flex flex-row mb-3">
//               <div className="w-[50%] ">
//                 <label>Group</label>
//                 <Input
//                   type="text"
//                   name="group"
//                   placeHolder="Group"
//                   onChange={(e) => handleChange(e)}
//                 />
//               </div>
//               <div className="w-[50%] ml-2">
//                 <label>Unit</label>
//                 <select
//                   className="mt-1 bg-white p-2 text-black border border-gray-300 dark:border-none dark:bg-[#2C2C54] dark:text-[#9D9BC9] w-full  rounded-[4px]"
//                   onChange={(e) => handleChange(e)}
//                   name="unit"
//                 >
//                   <option className="py-2" value="">
//                     Select an option
//                   </option>
//                   {Units.map((option) => (
//                     <option key={option.id} value={option.id}>
//                       {option.symbol}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div className="w-full flex flex-col mb-3">
//               <label>Description</label>
//               <Textarea
//                 rows={4}
//                 name="description"
//                 placeHolder="Description"
//                 onChange={(e) => handleChange(e)}
//               />
//             </div>
//           </div>
//           <DialogFooter className="mt-8 gap-2">
//             <DialogClose asChild>
//               <Button type="button" variant="outline" color="warning">
//                 Close
//               </Button>
//             </DialogClose>
//             <Button type="submit">Save</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default BasicDialog;
