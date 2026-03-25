import {MessageCircle, MessageCircleCheck, MessageCircleHeart, Settings, Users} from "lucide-react";
import {SideBarContext} from "@/shared/store/slices/sideBarContextSlice";
import {ElementType} from "react";

export interface SideBarMenuItem {
    id: number;
    label: string;
    context: SideBarContext;
    icon: ElementType;
}

export const sideBarMenuItems: SideBarMenuItem[] = [
    {
        id: 1,
        label: "Сообщения",
        context: "messages",
        icon: MessageCircle,
    },
    {
        id: 2,
        label: "Сохраненные сообщения",
        context: "savedMessages",
        icon: MessageCircleHeart,
    },
    {
        id: 3,
        label: "Архивные чаты",
        context: "archiveChats",
        icon: MessageCircleCheck,
    },
    {
        id: 4,
        label: "Контакты",
        context: "contacts",
        icon: Users,
    },
    {
        id: 5,
        label: "Настройки",
        context: "settings",
        icon: Settings,
    },
];
