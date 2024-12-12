import { create } from "zustand";
import { siteConfig } from "@/config/site";
import axios from "axios";
import {baseURL} from '../utils/baseURL'

export const useThemeStore = create((set) => ({
  theme: siteConfig.theme,
  setTheme: (theme) => set({ theme }),
  radius: siteConfig.radius,
  setRadius: (value) => set({ radius: value }),
  layout: siteConfig.layout,
  setLayout: (value) => {
    set({ layout: value });
    // If the new layout is "semibox," also set the sidebarType to "popover"
    if (value === "semibox") {
      useSidebar.setState({ sidebarType: "popover" });
    }
    //
    if (value === "horizontal") {
      // update  setNavbarType
      useThemeStore.setState({ navbarType: "sticky" });
    }
  },
  navbarType: siteConfig.navbarType,
  setNavbarType: (value) => set({ navbarType: value }),
  footerType: siteConfig.footerType,
  setFooterType: (value) => set({ footerType: value }),
  isRtl: false,
  setRtl: (value) => set({ isRtl: value }),
}));

export const useSidebar = create((set) => ({
  collapsed: false,
  setCollapsed: (value) => set({ collapsed: value }),
  sidebarType:
    siteConfig.layout === "semibox" ? "popover" : siteConfig.sidebarType,
  setSidebarType: (value) => {
    set({ sidebarType: value });
  },
  subMenu: false,
  setSubmenu: (value) => set({ subMenu: value }),
  // background image
  sidebarBg: siteConfig.sidebarBg,
  setSidebarBg: (value) => set({ sidebarBg: value }),
  mobileMenu: false,
  setMobileMenu: (value) => set({ mobileMenu: value }),
}));

//this is for the dashbaord cards
const initialState = {
  tabler1: {},
  nutrientdata1: [],
  nutrientdata2: [],
  ingredientdata1: [],
  ingredientdata2: [],
  labelNutrient:[],
  labelIngredient:[],
  load: false
};

export const useTableDataStore = create((set) => ({
  ...initialState,
  fetchData: async (storedToken, id) => { 
    try {
      const response = await axios.get(
        `${baseURL}getformulaingredientsnutrients/?formula_id=${id}`,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        }
      );
  
      set((state) => ({
        tabler1: response.data,
        nutrientdata1: response.data.common_nutrients.map((item) => item.temp_user_min_percentage),
        nutrientdata2: response.data.common_nutrients.map((item) => item.temp_user_max_percentage),
        ingredientdata1: response.data.common_ingredients.map((item) => item.temp_user_low_bound),
        ingredientdata2: response.data.common_ingredients.map((item) => item.temp_user_up_bound),
        labelNutrient: response.data.common_nutrients.map((item) => item.name),
        labelIngredient: response.data.common_ingredients.map((item) => item.name),
        results:response.data.formula_trial_results
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  handleCustomDataChange : (tableData) => {
    set({  tabler1: tableData ,
      nutrientdata1: tableData.common_nutrients.map((item) => item.temp_user_min_percentage),
      nutrientdata2: tableData.common_nutrients.map((item) => item.temp_user_max_percentage),
      ingredientdata1: tableData.common_ingredients.map((item) => item.temp_user_low_bound),
      ingredientdata2: tableData.common_ingredients.map((item) => item.temp_user_up_bound),
  });
  
  },
  handleEmptyData : (tableData) => {
    set({tabler1: tableData});
  },
  fetchFormulaTrials: async (storedToken,formula_id,trial_id) => {
   set({load:true});
    try {
      const response = await axios.get(
        `${baseURL}getformulatrialinfo/?formula_id=${formula_id}&trial_id=${trial_id}`,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        }
      );
      const updatedState = {};
      if (response.data.hasOwnProperty('formula_trial_results')) {
        updatedState.formula_trial_results = response.data.formula_trial_results;
      }
      if (response.data.hasOwnProperty('common_ingredients')) {
        updatedState.common_ingredients = response.data.common_ingredients;
      }
      if (response.data.hasOwnProperty('common_nutrients')) {
        updatedState.common_nutrients = response.data.common_nutrients;
      }
  
      set((state) => ({ tabler1: { ...state.tabler1, ...updatedState }, load:false })
    );  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  RefreshData: () => {
    set({tabler1: []});
  },
  
}));

//this is used to populate the sidebar on dashboard page and also to populate the table on the formula page 
const initialSidebarState = {
  navData: [],
};

export const useSidebarDataStore = create((set) => ({
  ...initialSidebarState,
  fetchSidebarData: async (storedToken) => {
    try {
      const response = await axios.get(
        `${baseURL}getformula/`,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        }
      );
      set((state) => ({ navData: response.data}
      )); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  createNewFormula: async (data) => {
    const storedToken = localStorage.getItem('token'); 

    try {
      const response = await axios.post(
        `${baseURL}getformula/`,
        {
          ...data, 
        },
        {
          headers: {
            Authorization: `Token ${storedToken}`, 
          },
        }
      );
      set((state) => ({ navData: [ ...state.navData,  response.data]}))
        return response.data;
       } catch (error) {
      console.error('Error creating Formula:', error); 
      return error
    }
  },

  fetchCategoricalData: async (storedToken,data) => {
    try {
      const response = await axios.get(
        `${baseURL}getformula/?feed_category=${data}`,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        }
      );
      set((state) => ({ navData: response.data})); 
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  UpdateFormula: async (data) => {
    const storedToken = localStorage.getItem('token'); 
    try {
      const response = await axios.put(
        `${baseURL}getformula/`,
        {
          ...data, 
        },
        {
          headers: {
            Authorization: `Token ${storedToken}`, 
          },
        }
      );
      set((state) => ({ navData: [ ...state.navData,  response.data]}))
      return response.data;
       } catch (error) {
      console.error('Error creating Formula:', error); 
      return error
    }
  },
  DeleteFormula: async (storedToken,data) => {
    try {
      const response = await axios.delete(
        `${baseURL}getformula/?formula_id=${data}`,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  },

  RefreshDataNav: () => {
    set({navData: []});
  },
  
}));

//this is for the table on the raw materials page 
const initialRawMaterialState = {
  TableData: [],
  success2: false
};

export const useRawMaterialDataStore = create((set) => ({
  ...initialRawMaterialState,
  fetchRawTableData: async (storedToken) => {
    try {
      const response = await axios.get(
        `${baseURL}getingredients/`,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        }
      );

      set((state) => ({ TableData: response.data })); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  createIngredient: async (data) => {
    const storedToken = localStorage.getItem('token'); 
    try {
      const response = await axios.post(
        `${baseURL}getingredients/`,
        {
          ...data, // Spread data object for request body
        },
        {
          headers: {
            Authorization: `Token ${storedToken}`, 
          },
        }
      );
      set({ success2: true }); 
      set((state) => ({ TableData: [ ...state.TableData,  response.data]}))
       } catch (error) {
      console.error('Error creating ingredient:', error); 
    }
  },

  EditIngredient: async (data) => {
    const storedToken = localStorage.getItem('token'); 
    try {
      const response = await axios.put(
        `${baseURL}getingredients/`,
        {
          ...data, 
        },
        {
          headers: {
            Authorization: `Token ${storedToken}`, 
          },
        }
      );
      set((state) => ({TableData: [ ...state.TableData,  response.data]}))
      return response;
    } catch (error) {
      console.log('Error editing ingredients:', error);
    }
  },

  DeleteIngredients: async (storedToken,data) => {
    try {
      const response = await axios.delete(
        `${baseURL}getingredients/?ingredient_id=${data}`,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  },
  
}));

//this is for the table on the nutrients page 
const initialNutrientState = {
  NutrientTableData: [],
};

//this is used to populate the sidebar on dashboard page and also to populate the table on the formula page 
export const useNutrientDataStore = create((set) => ({
  ...initialNutrientState,
  fetchNutrients: async (storedToken) => {
    try {
      const response = await axios.get(
        `${baseURL}getnutrients/`,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        }
      );

      set((state) => ({ NutrientTableData: response.data })); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  addNutrients: async (data) => {
    const storedToken = localStorage.getItem('token'); 
    try {
      const response = await axios.post(
        `${baseURL}getnutrients/`,
        {
          ...data, 
        },
        {
          headers: {
            Authorization: `Token ${storedToken}`, 
          },
        }
      );
      set((state) => ({ NutrientTableData: [ ...state.NutrientTableData,  response.data]}))
      return response;
    } catch (error) {
      console.log('Error adding nutrients:', error);
      set({ error: error.message });
    }
  },

  EditNutrient: async (data) => {
    const storedToken = localStorage.getItem('token'); 
    try {
      const response = await axios.put(
        `${baseURL}getnutrients/`,
        {
          ...data, 
        },
        {
          headers: {
            Authorization: `Token ${storedToken}`, 
          },
        }
      );
      set((state) => ({ NutrientTableData: [ ...state.NutrientTableData,  response.data]}))
      return response;
    } catch (error) {
      console.log('Error editing nutrients:', error);
    }
  },

   DeleteNutrients: async (storedToken,data) => {
    try {
      const response = await axios.delete(
        `${baseURL}getnutrients/?nutrient_id=${data}`,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  },
}));

//for the results
const initialResultState = {
  resulttable: [],
  loading: false,
};

export const useResultStore = create((set) => ({
  ...initialResultState,
  fetchResultData: async (storedToken, data, str) => { 
    set({ loading: true });
    if(str === 'fetchData'){
      try {
        const response = await axios.post(
          `${baseURL}runformula/`,
          {
            ...data
          },
          {
            headers: {
              Authorization: `Token ${storedToken}`,
            },
          }
        );
        set({ resulttable: response.data, loading: false });
      } catch (error) {
        console.error("Error fetching data:", error);
        set({ loading: false });
      }
    }
    else{
      set({resulttable: []})
      set({ loading: false });
    }
  },
}));

//to access in other files 
const accessToken = {
  id: 1,
  token: '',
  label:'',
  date:''
}

export const useAccessId= create((set) => ({
  ...accessToken,
  useAccessToken : (token, id,label,date) => {
    set({  token: token, id: id ,label: label, date: date });
  }
}) )

//get the feed type for the ingredient 

const initialFeedState = {
  CommonFeed: [],
  Units:[],
};

export const useFeedDataStore = create((set) => ({
  ...initialFeedState,
  fetchType: async () => {
    const storedToken = localStorage.getItem('token'); 
    try {
      const response = await axios.get(
        `${baseURL}getfeedtypes/`,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        }
      );
      set((state) => ({ CommonFeed: response.data })); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  fetchUnits: async () => {
    const storedToken = localStorage.getItem('token'); 
    try {
      const response = await axios.get(
        `${baseURL}units/`,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        }
      );
      set((state) => ({ Units: response.data })); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));