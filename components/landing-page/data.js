import {
  Application,
  Chart,
  Components,
  DashBoard,
  Stacks2,
  Map,
  Grid,
  Files,
  Graph,
  ClipBoard,
  Cart,
  Envelope,
  Messages,
  Monitor,
  ListFill,
  Calendar,
  Flag,
  Book,
  Note,
  Note2,
  BarLeft,
  BarTop,
  ChartBar,
  PretentionChartLine,
  PretentionChartLine2,
  Google,
  Pointer,
  Map2,
  Icons,
  ChartArea,
  Sheild,
  Error,
  Diamond,
  Heroicon,
  LucideIcon,
  CustomIcon,
} from "@/components/svg";
import analyticsPage from "@/public/images/landing-page/analytics.jpg";
import ecommercePage from "@/public/images/landing-page/ecommerce.jpg";
import projectPage from "@/public/images/landing-page/project-dashboard.jpg";
import appChat from "@/public/images/landing-page/app-chat.jpg";
import appEmail from "@/public/images/landing-page/app-email.jpg";
import appKanban from "@/public/images/landing-page/app-kanban.jpg";
import appTask from "@/public/images/landing-page/app-task.jpg";
import appCalender from "@/public/images/landing-page/app-calender.jpg";
import appProject from "@/public/images/landing-page/app-project.jpg";
import comAccordion from "@/public/images/landing-page/accordion.jpg";
import comAlert from "@/public/images/landing-page/alert.jpg";
import comAvatar from "@/public/images/landing-page/avatar.jpg";
import comButton from "@/public/images/landing-page/Component - Button.jpg";
import comKBD from "@/public/images/landing-page/Component - KBD.jpg";
import comADUIaffix from "@/public/images/landing-page/Component - Advanced UI - Affix.jpg";
import comADUIsteps from "@/public/images/landing-page/Component - Advanced UI - Steps.jpg";
import comADUItimeline from "@/public/images/landing-page/Component - Advanced UI - Timeline.jpg";
import comADUItour from "@/public/images/landing-page/Component - Advanced UI - Tour.jpg";
import comADUItree from "@/public/images/landing-page/Component - Advanced UI - Tree.jpg";
import formElementInputgroup from "@/public/images/landing-page/Form Elements - Input Group.jpg";
import formElementInput from "@/public/images/landing-page/Form Elements - Input.jpg";
import formElementRadio from "@/public/images/landing-page/Form Elements - Radio.jpg";
import formElementselect from "@/public/images/landing-page/Form Elements - Select.jpg";
import formElementswitch from "@/public/images/landing-page/Form Elements - Switch.jpg";
import pageCommingSoon from "@/public/images/landing-page/comming-soon.jpg";
import pageError403 from "@/public/images/landing-page/Pages - Error 403.jpg";
import pageInvoice from "@/public/images/landing-page/Pages - Invoice.jpg";
import pageSignIn1 from "@/public/images/landing-page/Pages - Sign In 1.jpg";
import pageSignUp2 from "@/public/images/landing-page/Pages - Sign Up 2.jpg";
import tableData from "@/public/images/landing-page/Table - Data Table.jpg";
import tableSimple from "@/public/images/landing-page/Table - Simple Table.jpg";
import tableTailwind from "@/public/images/landing-page/Table - Tailwind Table.jpg";
import iconsIconify from "@/public/images/landing-page/Icons - Iconify.jpg";
import iconsLucid from "@/public/images/landing-page/Icons - Lucid Icon.jpg";
import iconsCustom from "@/public/images/landing-page/Icons - Custom Icon.jpg";
import mapGoogle from "@/public/images/landing-page/Map -  Google Map.jpg";
import mapReactLeaflet from "@/public/images/landing-page/Map - React Leaflet.jpg";
import mapUnovisLeaflet from "@/public/images/landing-page/Map - Unovis Leaflet Maps.jpg";
import mapvector from "@/public/images/landing-page/Map - Vector Map.jpg";
import diagramOrgaTree from "@/public/images/landing-page/Diagram - Organaization Tree.jpg";
import diagramOverview from "@/public/images/landing-page/Diagram - Overview.jpg";
import chartUnovis from "@/public/images/landing-page/chart-unovis.jpg";
import chartApex from "@/public/images/landing-page/Charts - Apex Chart - Area.jpg";
import chartOthers from "@/public/images/landing-page/Charts - Charts JS - Others.jpg";
import chartRe from "@/public/images/landing-page/Charts - Re Charts - Bar.jpg";
import dashboardBlur from "@/public/images/landing-page/dashboard-blur.jpg";

export const demoMenus = [
  {
    title: "Dashboard",
    icon: DashBoard,
    child: [
      {
        title: "Analytics",
        href: "/dashboard",
        icon: Graph,
        image: analyticsPage,
      },
      {
        title: "Ecommerce",
        href: "/ecommerce",
        icon: Cart,
        image: ecommercePage,
      },
      {
        title: "Project ",
        href: "/project",
        icon: ClipBoard,
        image: projectPage,
      },
    ],
  },
  {
    title: "Application",
    icon: Application,
    child: [
      {
        title: "chat",
        icon: Messages,
        href: "/chat",
        image: appChat,
      },
      {
        title: "email",
        icon: Envelope,
        href: "/email",
        image: appEmail,
      },
      {
        title: "kanban",
        icon: Monitor,
        href: "/kanban",
        image: appKanban,
      },
      {
        title: "task",
        icon: ListFill,
        href: "/task",
        image: appTask,
      },
      {
        title: "calendar",
        icon: Calendar,
        href: "/calendar",
        image: appCalender,
      },
      {
        title: "project",
        icon: ClipBoard,
        href: "/projects",
        image: appProject,
      },
    ],
  },
  {
    title: "Components",
    icon: Components,
    child: [
      {
        title: "Base Ui",
        icon: Flag,
        nested: [
          {
            title: "accordion",
            icon: "heroicons:information-circle",
            href: "/accordion",
            image: comAccordion,
          },
          {
            title: "alert",
            icon: "heroicons:information-circle",
            href: "/alert",
            image: comAlert,
          },
          {
            title: "avatar",
            icon: "heroicons:information-circle",
            href: "/avatar",
            image: comAvatar,
          },
          {
            title: "Button",
            icon: "heroicons:cube",
            href: "/button",
            image: comButton,
          },
          {
            title: "kbd",
            icon: "heroicons:information-circle",
            href: "/kbd",
            image: comKBD,
          },
          {
            showAll: true,
            href: "/",
            image: dashboardBlur,
          },
        ],
      },
      {
        title: "Advanced Ui",
        icon: Book,
        nested: [
          {
            title: "affix",
            icon: "heroicons:cube",
            href: "/affix",
            image: comADUIaffix,
          },
          {
            title: "steps",
            icon: "heroicons:information-circle",
            href: "/steps",
            image: comADUIsteps,
          },
          {
            title: "timeline",
            icon: "heroicons:cube",
            href: "/timeline",
            image: comADUItimeline,
          },
          {
            title: "tour",
            icon: "heroicons:cube",
            href: "/tour",
            image: comADUItour,
          },
          {
            title: "tree",
            icon: "heroicons:information-circle",
            href: "/tree",
            image: comADUItree,
          },
          {
            showAll: true,
            href: "/",
            image: dashboardBlur,
          },
        ],
      },
    ],
  },
  {
    title: "Forms",
    icon: Stacks2,
    child: [
      {
        title: "input",
        href: "/input",
        image: formElementInput,
      },
      {
        title: "input-group",
        href: "/input2",
        image: formElementInputgroup,
      },
      {
        title: "radio",
        href: "/radio",
        image: formElementRadio,
      },
      {
        title: "Select",
        href: "/form-select",
        image: formElementselect,
      },
      {
        title: "switch",
        href: "/switch",
        image: formElementswitch,
      },
      {
        showAll: true,
        href: "/",
        image: dashboardBlur
      }
    ],
  },

  {
    title: "Pages",
    icon: Files,
    child: [

      {
        title: "Sign In 01",
        href: "/auth/login",
        image: pageSignIn1,
      },
      {
        title: "Sign Up 02",
        href: "/auth/register2",
        image: pageSignUp2,
      },
      {
        title: "Error 403",
        href: "/error-page/403",
        image: pageError403,
      },
      {
        title: "Comming Soon",
        href: "/utility/comming-soon",
        image: pageCommingSoon,
      },
      {
        title: "Invoice Details",
        href: "/invoice-details",
        image: pageInvoice,
      },
      {
        showAll: true,
        href: "/",
        image: dashboardBlur
      }
    ],
  },
  {
    title: "Tables",
    icon: Grid,
    child: [
      {
        title: "Simple Table",
        href: "/simple-table",
        icon: BarLeft,
        image: tableSimple,
      },
      {
        title: "tailwindui table",
        href: "/tailwindui-table",
        icon: BarLeft,
        image: tableTailwind,
      },
      {
        title: "Data Table",
        href: "/data-table",
        icon: BarTop,
        image: tableData,
      },
      {
        showAll: true,
        href: "/",
        image: dashboardBlur
      }
    ],
  },
  {
    title: "Diagram",
    icon: Chart,
    child: [
      {
        title: "Overview",
        href: "/diagram/reactflow/overview",
        image: diagramOverview,
      },
      {
        title: "Organization Tree",
        href: "/diagram/reactflow/organization-tree",
        image: diagramOrgaTree,
      },
    ],
  },
  {
    title: "Chart",
    icon: ChartArea,
    child: [
      {
        title: "Area",
        href: "/charts-appex-area",
        icon: "heroicons:information-circle",
        image: chartApex,
      },
      {
        title: "Bar",
        href: "/charts-rechart-bar",
        icon: "heroicons:information-circle",
        image: chartRe,
      },
      {
        title: "Other",
        href: "/charts-chartjs-other",
        icon: "heroicons:information-circle",
        image: chartOthers,
      },
      {
        title: "Area",
        href: "/charts-unovis-area",
        icon: "heroicons:information-circle",
        image: chartUnovis,
      }

    ],
  },
  {
    title: "Maps",
    icon: Map,
    child: [
      {
        title: "Google",
        icon: Google,
        href: "/maps-google",
        image: mapGoogle,
      },
      {
        title: "Vector",
        icon: Pointer,
        href: "/maps-vector",
        image: mapvector,
      },
      {
        title: "React Leaflet",
        icon: Map2,
        href: "/map-react-leaflet",
        image: mapReactLeaflet,
      },
      {
        title: "Leaflet Map",
        href: "/map-unovis-leaflet",
        image: mapUnovisLeaflet,
      },
    ],
  },
  {
    title: "Icons",
    icon: Icons,
    child: [
      {
        title: "Hero Icons",
        icon: Heroicon,
        href: "/icons-iconify",
        image: iconsIconify,
      },
      {
        title: "Lucide Icons",
        icon: LucideIcon,
        href: "/icons-lucide",
        image: iconsLucid,
      },
      {
        title: "Custom Icons",
        icon: CustomIcon,
        href: "/icons-custom",
        image: iconsCustom,
      },
    ],
  },
];

export const menus = [
  {
    title: "Elements",
    href: "#elements",
  },
  {
    title: "Why Dash Tail",
    href: "#whyDashTail",
  },
  {
    title: "Pricing",
    href: "#pricing",
  },
  {
    title: "More",
    child: [
      {
        title: "Documentation",
        href: "/docs/introduction",
      },
      {
        title: "Changelog",
        href: "/docs/update-log",
      },
      {
        title: "Github Access",
        href: "https://codeshaperbd.freshdesk.com/support/login",
      },
      {
        title: "Report a bug",
        href: "https://codeshaperbd.freshdesk.com/support/login",
      },
      {
        title: "Support",
        href: "https://codeshaperbd.freshdesk.com/support/login",
      },
      {
        title: "Hire Us",
        href: "https://codeshaper.net/",
      },
    ],
  },
];
