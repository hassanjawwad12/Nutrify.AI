const previousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
const dayBeforePreviousDay = new Date(
  new Date().getTime() - 24 * 60 * 60 * 1000 * 2
);

import avatar1 from "@/public/images/avatar/avatar-7.jpg";
import avatar2 from "@/public/images/avatar/avatar-2.jpg";
import avatar3 from "@/public/images/avatar/avatar-3.jpg";
import avatar4 from "@/public/images/avatar/avatar-4.jpg";
import avatar5 from "@/public/images/avatar/avatar-5.jpg";
import avatar6 from "@/public/images/avatar/avatar-6.jpg";
import avatar7 from "@/public/images/avatar/avatar-7.jpg";
import avatar8 from "@/public/images/avatar/avatar-8.jpg";
export const profileUser = {
  id: 11,
  avatar: "/images/avatar/avatar-2.jpg",
  fullName: "Mr. Bean",
  bio: "UX/UI Designer",
  role: "admin",
  about:
    "Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.",
  status: "online",
  settings: {
    isTwoStepAuthVerificationEnabled: true,
    isNotificationsOn: false,
  },
  date: "10 am",
};

export const contacts = [
  {
    id: 1,
    fullName: "Felecia Rower",
    role: "Frontend Developer",
    about:
      "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
    avatar: "/images/avatar/avatar-2.jpg",
    status: "online",
    unreadmessage: 0,
    date: "10 am",
  },
  {
    id: 2,
    fullName: "Adalberto Granzin",
    role: "UI/UX Designer",
    about:
      "Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.",
    avatar: "/images/avatar/avatar-3.jpg",
    status: "online",
    unreadmessage: 1,
    date: "10 am",
  },
  {
    id: 3,
    fullName: "Joaquina Weisenborn",
    role: "Town planner",
    about:
      "Soufflé soufflé caramels sweet roll. Jelly lollipop sesame snaps bear claw jelly beans sugar plum sugar plum.",
    avatar: "/images/avatar/avatar-4.jpg",
    status: "busy",
    unreadmessage: 1,
    date: "10 am",
  },
  {
    id: 4,
    fullName: "Verla Morgano",
    role: "Data scientist",
    about:
      "Chupa chups candy canes chocolate bar marshmallow liquorice muffin. Lemon drops oat cake tart liquorice tart cookie. Jelly-o cookie tootsie roll halvah.",
    avatar: "/images/avatar/avatar-5.jpg",
    status: "online",
    unreadmessage: 2,
    date: "10 am",
  },
  {
    id: 5,
    fullName: "Margot Henschke",
    role: "Dietitian",
    about:
      "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
    avatar: "/images/avatar/avatar-6.jpg",
    status: "busy",
    unreadmessage: 0,
    date: "10 am",
  },
  {
    id: 6,
    fullName: "Sal Piggee",
    role: "Marketing executive",
    about:
      "Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.",
    avatar: "/images/avatar/avatar-7.jpg",
    status: "online",
    unreadmessage: 2,
    date: "10 am",
  },
  {
    id: 7,
    fullName: "Miguel Guelff",
    role: "Special educational needs teacher",
    about:
      "Biscuit powder oat cake donut brownie ice cream I love soufflé. I love tootsie roll I love powder tootsie roll.",
    avatar: "/images/avatar/avatar-8.jpg",
    status: "online",
    unreadmessage: 0,
    date: "10 am",
  },
  {
    id: 8,
    fullName: "Mauro Elenbaas",
    role: "Advertising copywriter",
    about:
      "Bear claw ice cream lollipop gingerbread carrot cake. Brownie gummi bears chocolate muffin croissant jelly I love marzipan wafer.",
    avatar: "/images/avatar/avatar-4.jpg",
    status: "away",
    unreadmessage: 0,
    date: "10 am",
  },
  {
    id: 9,
    fullName: "Bridgett Omohundro",
    role: "Designer, television/film set",
    about:
      "Gummies gummi bears I love candy icing apple pie I love marzipan bear claw. I love tart biscuit I love candy canes pudding chupa chups liquorice croissant.",
    avatar: "/images/avatar/avatar-7.jpg",
    status: "offline",
    unreadmessage: 0,
    date: "10 am",
  },
  {
    id: 10,
    fullName: "Zenia Jacobs",
    role: "Building surveyor",
    about:
      "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
    avatar: "/images/avatar/avatar-7.jpg",
    status: "away",
    unreadmessage: 1,
    date: "10 am",
  },
];

export const chats = [
  {
    id: 1,
    userId: 1,
    unseenMsgs: 0,
    chat: [
      {
        message: "Hi",
        time: "Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)",
        senderId: 11,
        replayMetadata: false,
      },
      {
        message: "Hello. How can I help You?",
        time: "Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)",
        senderId: 2,
        replayMetadata: false,
      },
      {
        message: "Can I get details of my last transaction I made last month?",
        time: "Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)",
        senderId: 11,
        replayMetadata: false,
      },
      {
        message: "We need to check if we can provide you such information.",
        time: "Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)",
        senderId: 2,
        replayMetadata: false,
      },
      {
        message: "I will inform you as I get update on this.",
        time: "Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)",
        senderId: 2,
        replayMetadata: false,
      },
      {
        message: "If it takes long you can mail me at my mail address.",
        time: dayBeforePreviousDay,
        senderId: 11,
        replayMetadata: false,
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    unseenMsgs: 1,
    chat: [
      {
        message: "How can we help? We're here for you!",
        time: "Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)",
        senderId: 11,
        replayMetadata: false,
      },
      {
        message:
          "Hey John, I am looking for the best admin template. Could you please help me to find it out?",
        time: "Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)",
        senderId: 1,
        replayMetadata: false,
      },
      {
        message: "It should be Bootstrap 5 compatible.",
        time: "Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)",
        senderId: 1,
        replayMetadata: false,
      },
      {
        message: "Absolutely!",
        time: "Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)",
        senderId: 11,
        replayMetadata: false,
      },
      {
        message: "Modern admin is the responsive bootstrap 5 admin template.!",
        time: "Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)",
        senderId: 11,
        replayMetadata: false,
      },
      {
        message: "Looks clean and fresh UI.",
        time: "Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)",
        senderId: 1,
        replayMetadata: false,
      },
      {
        message: "It's perfect for my next project.",
        time: "Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)",
        senderId: 1,
        replayMetadata: false,
      },
      {
        message: "How can I purchase it?",
        time: "Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)",
        senderId: 1,
        replayMetadata: false,
      },
      {
        message: "Thanks, from ThemeForest.",
        time: "Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)",
        senderId: 11,
        replayMetadata: false,
      },
      {
        message: "I will purchase it for sure. 👍",
        time: previousDay,
        senderId: 1,
        replayMetadata: false,
      },
    ],
  },
];
