import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";

import { getDictionary } from "@/app/dictionaries";
const layout = async ({ children, params: { lang } }) => {
  const trans = await getDictionary(lang);

  return (
    <DashBoardLayoutProvider trans={trans}>{children}</DashBoardLayoutProvider>
  );
};

export default layout;
